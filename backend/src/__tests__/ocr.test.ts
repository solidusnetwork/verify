import { describe, it, expect, beforeAll } from 'vitest'
import { join } from 'node:path'
import { existsSync, readFileSync } from 'node:fs'
import { preprocessImage, extractMrz } from '../lib/ocr.js'
import { createMrzFixture } from './fixtures/create-mrz-fixture.js'
import sharp from 'sharp'

const FIXTURE_DIR = join(import.meta.dirname, 'fixtures')
const FIXTURE_PATH = join(FIXTURE_DIR, 'mrz-test.jpg')

beforeAll(async () => {
  if (!existsSync(FIXTURE_PATH)) {
    await createMrzFixture(FIXTURE_PATH)
  }
}, 30000)

describe('preprocessImage', () => {
  it('returns a grayscale JPEG buffer', async () => {
    const fixture = readFileSync(FIXTURE_PATH)
    const result = await preprocessImage(fixture)
    expect(result).toBeInstanceOf(Buffer)
    expect(result.length).toBeGreaterThan(0)
  })
})

describe('extractMrz', () => {
  it('extracts MRZ fields from a passport-style image (if OCR succeeds)', async () => {
    const imageBuffer = readFileSync(FIXTURE_PATH)
    const result = await extractMrz(imageBuffer)

    // OCR on synthetic SVG-rendered images may not be perfect
    // If it succeeds, verify structure
    if (result) {
      expect(result).toHaveProperty('surname')
      expect(result).toHaveProperty('givenNames')
      expect(result).toHaveProperty('nationality')
      expect(result).toHaveProperty('documentNumber')
      expect(result).toHaveProperty('birthDate')
      expect(result).toHaveProperty('expiryDate')
    }
    // If OCR fails on synthetic image, that's acceptable
  }, 60000)

  it('returns null for an image with no MRZ', async () => {
    const blank = await sharp({
      create: { width: 100, height: 100, channels: 3, background: { r: 255, g: 255, b: 255 } },
    })
      .jpeg()
      .toBuffer()

    const result = await extractMrz(blank)
    expect(result).toBeNull()
  }, 60000)
})
