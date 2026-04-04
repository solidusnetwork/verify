import * as faceapi from '@vladmandic/face-api'
import * as tf from '@tensorflow/tfjs-node'
import { Canvas, Image, ImageData, loadImage } from 'canvas'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Patch face-api to use node-canvas
// @ts-expect-error — face-api expects browser environment types
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

// ---------------------------------------------------------------------------
// Model loading
// ---------------------------------------------------------------------------

let _modelsLoaded = false

export async function loadModels(): Promise<void> {
  if (_modelsLoaded) return
  const modelPath = join(__dirname, 'models')
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelPath)
  await faceapi.nets.faceLandmark68Net.loadFromDisk(modelPath)
  await faceapi.nets.faceRecognitionNet.loadFromDisk(modelPath)
  _modelsLoaded = true
}

// ---------------------------------------------------------------------------
// Face descriptor extraction from image buffer
// ---------------------------------------------------------------------------

export async function extractDescriptor(imageBuffer: Buffer): Promise<Float32Array | null> {
  await loadModels()

  const img = await loadImage(imageBuffer)
  const canvas = new Canvas(img.width, img.height)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0)

  const detection = await faceapi
    .detectSingleFace(canvas as unknown as HTMLCanvasElement)
    .withFaceLandmarks()
    .withFaceDescriptor()

  if (!detection) return null
  return detection.descriptor
}

// ---------------------------------------------------------------------------
// Challenge verification helpers (pure computation — no model loading)
// ---------------------------------------------------------------------------

/**
 * Eye Aspect Ratio (EAR)
 * Points: [p1x, p1y, p2x, p2y, p3x, p3y] where:
 * p1-p4 is horizontal axis, p2-p6 and p3-p5 are vertical pairs
 * Simplified: [leftX, leftY, topX, topY, rightX, rightY_bottom]
 */
export function computeEAR(
  eyePoints: [number, number, number, number, number, number],
): number {
  const [p1x, , p2x, p2y, p3x, p3y] = eyePoints
  const v1 = Math.abs(p2y - p3y) // vertical distance
  const v2 = Math.abs(eyePoints[3]! - eyePoints[5]!)
  const h = Math.abs(p3x - p1x) // horizontal distance
  if (h === 0) return 0
  return (v1 + v2) / (2 * h)
}

/**
 * Yaw angle estimation from nose tip position relative to jaw boundaries
 */
export function computeYaw(points: {
  noseTip: [number, number]
  leftJaw: [number, number]
  rightJaw: [number, number]
}): number {
  const faceWidth = points.rightJaw[0] - points.leftJaw[0]
  if (faceWidth === 0) return 0
  const noseOffset = points.noseTip[0] - points.leftJaw[0]
  const ratio = noseOffset / faceWidth
  // ratio 0.5 = frontal, <0.5 = left turn, >0.5 = right turn
  return (ratio - 0.5) * 90
}

/**
 * Mouth Aspect Ratio (MAR)
 */
export function computeMAR(points: {
  topLip: [number, number]
  bottomLip: [number, number]
  leftCorner: [number, number]
  rightCorner: [number, number]
}): number {
  const vertical = Math.abs(points.bottomLip[1] - points.topLip[1])
  const horizontal = Math.abs(points.rightCorner[0] - points.leftCorner[0])
  if (horizontal === 0) return 0
  return vertical / horizontal
}

/**
 * Euclidean distance between two 128-dim face descriptors
 */
export function compareDescriptors(d1: Float32Array, d2: Float32Array): number {
  let sum = 0
  for (let i = 0; i < d1.length; i++) {
    const diff = (d1[i] ?? 0) - (d2[i] ?? 0)
    sum += diff * diff
  }
  return Math.sqrt(sum)
}

// ---------------------------------------------------------------------------
// Challenge verification (full pipeline with model inference)
// ---------------------------------------------------------------------------

export interface ChallengeResult {
  passed: boolean
  bestDescriptor: Float32Array | null
}

export async function verifyChallenge(
  challenge: string,
  frameBuffers: Buffer[],
): Promise<ChallengeResult> {
  await loadModels()

  const detections = []
  for (const frame of frameBuffers) {
    const img = await loadImage(frame)
    const canvas = new Canvas(img.width, img.height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    const det = await faceapi
      .detectSingleFace(canvas as unknown as HTMLCanvasElement)
      .withFaceLandmarks()
      .withFaceDescriptor()
    detections.push(det ?? null)
  }

  const validDetections = detections.filter(
    (d): d is NonNullable<typeof d> => d !== null,
  )
  if (validDetections.length < 2) {
    return { passed: false, bestDescriptor: null }
  }

  // Best detection = highest confidence, for descriptor extraction
  const bestDetection = validDetections.reduce((best, curr) =>
    curr.detection.score > best.detection.score ? curr : best,
  )

  let passed = false

  switch (challenge) {
    case 'blink': {
      const ears = validDetections.map((d) => {
        const leftEye = d.landmarks.getLeftEye()
        const p = leftEye.map((pt) => [pt.x, pt.y]).flat() as [number, number, number, number, number, number]
        return computeEAR(p)
      })
      const firstEar = ears[0] ?? 0
      const lastEar = ears[ears.length - 1] ?? 0
      const minEar = Math.min(...ears)
      passed = firstEar > 0.25 && lastEar > 0.25 && minEar < 0.25
      break
    }
    case 'turn-left': {
      const yaws = validDetections.map((d) => {
        const nose = d.landmarks.getNose()
        const jaw = d.landmarks.getJawOutline()
        return computeYaw({
          noseTip: [nose[3]!.x, nose[3]!.y],
          leftJaw: [jaw[0]!.x, jaw[0]!.y],
          rightJaw: [jaw[jaw.length - 1]!.x, jaw[jaw.length - 1]!.y],
        })
      })
      passed = yaws.some((y) => y <= -15)
      break
    }
    case 'turn-right': {
      const yaws = validDetections.map((d) => {
        const nose = d.landmarks.getNose()
        const jaw = d.landmarks.getJawOutline()
        return computeYaw({
          noseTip: [nose[3]!.x, nose[3]!.y],
          leftJaw: [jaw[0]!.x, jaw[0]!.y],
          rightJaw: [jaw[jaw.length - 1]!.x, jaw[jaw.length - 1]!.y],
        })
      })
      passed = yaws.some((y) => y >= 15)
      break
    }
    case 'smile': {
      const mars = validDetections.map((d) => {
        const mouth = d.landmarks.getMouth()
        return computeMAR({
          topLip: [mouth[14]!.x, mouth[14]!.y],
          bottomLip: [mouth[18]!.x, mouth[18]!.y],
          leftCorner: [mouth[0]!.x, mouth[0]!.y],
          rightCorner: [mouth[6]!.x, mouth[6]!.y],
        })
      })
      const firstMar = mars[0] ?? 0
      passed = mars.some((m) => firstMar > 0 && (m - firstMar) / firstMar >= 0.3)
      break
    }
  }

  return { passed, bestDescriptor: bestDetection.descriptor }
}
