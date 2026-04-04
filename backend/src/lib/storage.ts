import { mkdir, readFile, writeFile, unlink } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3'
import { config } from '../config.js'

// ---------------------------------------------------------------------------
// Interface
// ---------------------------------------------------------------------------

export interface StorageBackend {
  uploadFile(key: string, data: Buffer): Promise<void>
  downloadFile(key: string): Promise<Buffer>
  deleteFile(key: string): Promise<void>
}

// ---------------------------------------------------------------------------
// Local filesystem backend
// ---------------------------------------------------------------------------

function createLocalStorage(basePath: string): StorageBackend {
  return {
    async uploadFile(key: string, data: Buffer): Promise<void> {
      const fullPath = join(basePath, key)
      await mkdir(dirname(fullPath), { recursive: true })
      await writeFile(fullPath, data)
    },

    async downloadFile(key: string): Promise<Buffer> {
      const fullPath = join(basePath, key)
      return readFile(fullPath)
    },

    async deleteFile(key: string): Promise<void> {
      const fullPath = join(basePath, key)
      await unlink(fullPath)
    },
  }
}

// ---------------------------------------------------------------------------
// S3-compatible backend (Cloudflare R2 / MinIO / AWS S3)
// ---------------------------------------------------------------------------

function createS3Storage(): StorageBackend {
  const accountId = config.R2_ACCOUNT_ID
  if (!accountId || !config.R2_ACCESS_KEY_ID || !config.R2_SECRET_ACCESS_KEY) {
    throw new Error('S3 storage requires R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, and R2_SECRET_ACCESS_KEY')
  }

  const client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: config.R2_ACCESS_KEY_ID,
      secretAccessKey: config.R2_SECRET_ACCESS_KEY,
    },
  })

  const bucket = config.R2_BUCKET

  return {
    async uploadFile(key: string, data: Buffer): Promise<void> {
      await client.send(new PutObjectCommand({ Bucket: bucket, Key: key, Body: data }))
    },

    async downloadFile(key: string): Promise<Buffer> {
      const result = await client.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
      const stream = result.Body
      if (!stream) throw new Error(`Empty response for key: ${key}`)
      return Buffer.from(await stream.transformToByteArray())
    },

    async deleteFile(key: string): Promise<void> {
      await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))
    },
  }
}

// ---------------------------------------------------------------------------
// Factory
// ---------------------------------------------------------------------------

export function createStorage(
  opts?: { backend: 'local' | 's3'; localPath?: string },
): StorageBackend {
  const backend = opts?.backend ?? config.STORAGE_BACKEND
  if (backend === 's3') {
    return createS3Storage()
  }
  const localPath = opts?.localPath ?? config.STORAGE_LOCAL_PATH
  return createLocalStorage(localPath)
}

// Lazy singleton for production use
let _storage: StorageBackend | null = null

export function getStorage(): StorageBackend {
  if (!_storage) {
    _storage = createStorage()
  }
  return _storage
}
