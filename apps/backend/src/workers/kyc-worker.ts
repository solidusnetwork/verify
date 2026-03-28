import { Worker } from 'bullmq'
import { processSandbox } from '../modules/verifications/service.js'

const REDIS_URL = process.env['REDIS_URL'] ?? 'redis://localhost:6379'
const redisUrl = new URL(REDIS_URL)
const connection = {
  host: redisUrl.hostname,
  port: Number(redisUrl.port) || 6379,
}

// ---------------------------------------------------------------------------
// failVerification helper (dynamic imports to avoid config.ts at load time)
// ---------------------------------------------------------------------------

async function failVerification(verificationId: string, reason: string): Promise<void> {
  const { getSql } = await import('../db/index.js')
  const sql = getSql()
  await sql`
    UPDATE verifications
    SET
      status = 'failed',
      updated_at = now(),
      metadata = jsonb_set(metadata, '{reason}', ${sql.json(reason)}::jsonb)
    WHERE id = ${verificationId}
  `
}

// ---------------------------------------------------------------------------
// process-document job
// ---------------------------------------------------------------------------

async function processDocument(verificationId: string): Promise<void> {
  const { getSql } = await import('../db/index.js')
  const { getStorage } = await import('../lib/storage.js')
  const { extractMrz } = await import('../lib/ocr.js')
  const { extractDescriptor } = await import('../lib/face.js')

  const sql = getSql()

  // Advance status
  await sql`UPDATE verifications SET status = 'document_processing', updated_at = now() WHERE id = ${verificationId}`

  // Fetch document rows
  type DocRow = { r2_key: string; side: string; type: string }
  const docs = await sql<DocRow[]>`
    SELECT r2_key, side, type FROM documents
    WHERE verification_id = ${verificationId} AND type != 'selfie'
    ORDER BY created_at ASC
  `

  if (docs.length === 0) {
    await failVerification(verificationId, 'no_documents_uploaded')
    return
  }

  const storage = getStorage()

  // Try MRZ extraction on all images
  let mrzResult = null
  for (const doc of docs) {
    const imageBuffer = await storage.downloadFile(doc.r2_key)
    const mrz = await extractMrz(imageBuffer)
    if (mrz) {
      mrzResult = mrz
      break
    }
  }

  if (!mrzResult) {
    await failVerification(verificationId, 'mrz_invalid')
    return
  }

  // Extract face descriptor from document images
  let faceDescriptor: Float32Array | null = null
  for (const doc of docs) {
    const imageBuffer = await storage.downloadFile(doc.r2_key)
    faceDescriptor = await extractDescriptor(imageBuffer)
    if (faceDescriptor) break
  }

  if (!faceDescriptor) {
    await failVerification(verificationId, 'no_face_in_document')
    return
  }

  // Store MRZ + face descriptor in metadata
  const descriptorArray = Array.from(faceDescriptor)
  await sql`
    UPDATE verifications
    SET
      status = 'awaiting_liveness',
      updated_at = now(),
      metadata = jsonb_set(
        jsonb_set(metadata, '{mrz}', ${sql.json(mrzResult)}::jsonb),
        '{documentFaceDescriptor}',
        ${sql.json(descriptorArray)}::jsonb
      )
    WHERE id = ${verificationId}
  `
}

// ---------------------------------------------------------------------------
// process-liveness job
// ---------------------------------------------------------------------------

async function processLiveness(verificationId: string): Promise<void> {
  const { getSql } = await import('../db/index.js')
  const { getStorage } = await import('../lib/storage.js')
  const { verifyChallenge, compareDescriptors } = await import('../lib/face.js')
  const { processCompletion } = await import('../modules/verifications/service.js')

  const sql = getSql()

  // Load challenge and face descriptor from DB
  type VerRow = {
    liveness_challenge: string | null
    metadata: Record<string, unknown>
  }
  const vRows = await sql<VerRow[]>`
    SELECT liveness_challenge, metadata
    FROM verifications WHERE id = ${verificationId} LIMIT 1
  `
  const ver = vRows[0]

  if (!ver?.liveness_challenge) {
    await failVerification(verificationId, 'challenge_not_issued')
    return
  }

  // Advance status
  await sql`UPDATE verifications SET status = 'liveness_processing', updated_at = now() WHERE id = ${verificationId}`

  const docDescriptor = ver.metadata['documentFaceDescriptor'] as number[] | undefined
  if (!docDescriptor) {
    await failVerification(verificationId, 'missing_face_descriptor')
    return
  }
  const storedDescriptor = new Float32Array(docDescriptor)

  // Fetch liveness frames from storage
  type DocRow = { r2_key: string }
  const frameDocs = await sql<DocRow[]>`
    SELECT r2_key FROM documents
    WHERE verification_id = ${verificationId} AND type = 'selfie'
    ORDER BY created_at ASC
  `

  const storage = getStorage()
  const frameBuffers: Buffer[] = []
  for (const doc of frameDocs) {
    frameBuffers.push(await storage.downloadFile(doc.r2_key))
  }

  // Verify challenge
  const result = await verifyChallenge(ver.liveness_challenge, frameBuffers)

  if (!result.passed) {
    await failVerification(verificationId, 'liveness_challenge_failed')
    return
  }

  if (!result.bestDescriptor) {
    await failVerification(verificationId, 'no_face_in_liveness')
    return
  }

  // Compare face descriptors
  const distance = compareDescriptors(storedDescriptor, result.bestDescriptor)
  if (distance > 0.6) {
    await failVerification(verificationId, 'face_mismatch')
    return
  }

  // All checks passed!
  await processCompletion(verificationId)
}

// ---------------------------------------------------------------------------
// Worker
// ---------------------------------------------------------------------------

const worker = new Worker(
  'verify-kyc',
  async (job) => {
    if (job.name === 'sandbox-complete') {
      const { verificationId } = job.data as { verificationId: string }
      await processSandbox(verificationId)
      return
    }

    if (job.name === 'process-document') {
      const { verificationId } = job.data as { verificationId: string }
      await processDocument(verificationId)
      return
    }

    if (job.name === 'process-liveness') {
      const { verificationId } = job.data as { verificationId: string }
      await processLiveness(verificationId)
      return
    }
  },
  {
    connection,
    concurrency: 5,
  },
)

// Write failed status to DB only on final attempt (all retries exhausted)
worker.on('failed', async (job, err) => {
  console.error({ jobId: job?.id, name: job?.name }, 'KYC worker job failed:', err.message)

  if (job && job.attemptsMade >= (job.opts.attempts ?? 1)) {
    const { verificationId } = job.data as { verificationId: string }
    if (verificationId && (job.name === 'process-document' || job.name === 'process-liveness')) {
      try {
        await failVerification(verificationId, 'processing_error')
      } catch (dbErr) {
        console.error('Failed to write failure status to DB:', dbErr)
      }
    }
  }
})

worker.on('completed', (job) => {
  console.info({ jobId: job.id, name: job.name }, 'KYC worker job completed')
})

process.on('SIGTERM', async () => {
  await worker.close()
  process.exit(0)
})
