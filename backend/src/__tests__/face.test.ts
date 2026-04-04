import { describe, it, expect } from 'vitest'
import {
  computeEAR,
  computeYaw,
  computeMAR,
  compareDescriptors,
} from '../lib/face.js'

describe('computeEAR (Eye Aspect Ratio)', () => {
  it('returns high EAR for open eyes', () => {
    // [p1x, p1y, p2x, p2y, p3x, p3y]
    // Wide horizontal, tall vertical = open eye
    const ear = computeEAR([0.0, 0.0, 1.0, 0.3, 2.0, -0.3])
    expect(ear).toBeGreaterThan(0.1)
  })

  it('returns low EAR for closed eyes', () => {
    // Narrow vertical distances = closed eye
    const ear = computeEAR([0.0, 0.0, 1.0, 0.02, 2.0, -0.02])
    expect(ear).toBeLessThan(0.05)
  })
})

describe('computeYaw', () => {
  it('returns near-zero for frontal face', () => {
    const yaw = computeYaw({
      noseTip: [100, 100],
      leftJaw: [50, 100],
      rightJaw: [150, 100],
    })
    expect(Math.abs(yaw)).toBeLessThan(5)
  })

  it('returns negative for left turn', () => {
    const yaw = computeYaw({
      noseTip: [60, 100],
      leftJaw: [50, 100],
      rightJaw: [150, 100],
    })
    expect(yaw).toBeLessThan(-10)
  })

  it('returns positive for right turn', () => {
    const yaw = computeYaw({
      noseTip: [140, 100],
      leftJaw: [50, 100],
      rightJaw: [150, 100],
    })
    expect(yaw).toBeGreaterThan(10)
  })
})

describe('computeMAR (Mouth Aspect Ratio)', () => {
  it('returns higher MAR for open mouth', () => {
    const closed = computeMAR({
      topLip: [100, 90],
      bottomLip: [100, 95],
      leftCorner: [80, 92],
      rightCorner: [120, 92],
    })
    const open = computeMAR({
      topLip: [100, 85],
      bottomLip: [100, 100],
      leftCorner: [80, 92],
      rightCorner: [120, 92],
    })
    expect(open).toBeGreaterThan(closed)
  })
})

describe('compareDescriptors', () => {
  it('returns 0 for identical descriptors', () => {
    const d = new Float32Array(128).fill(0.5)
    expect(compareDescriptors(d, d)).toBe(0)
  })

  it('returns distance > 0 for different descriptors', () => {
    const d1 = new Float32Array(128).fill(0.5)
    const d2 = new Float32Array(128).fill(0.8)
    expect(compareDescriptors(d1, d2)).toBeGreaterThan(0)
  })

  it('returns distance < 0.6 for very similar descriptors', () => {
    const d1 = new Float32Array(128).fill(0.5)
    const d2 = Float32Array.from(d1, (v) => v + 0.01 * Math.random())
    expect(compareDescriptors(d1, d2)).toBeLessThan(0.6)
  })
})
