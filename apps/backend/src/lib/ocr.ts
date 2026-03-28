import sharp from 'sharp'
import Tesseract from 'tesseract.js'
import { parse as parseMrz } from 'mrz'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface MrzResult {
  surname: string
  givenNames: string
  nationality: string
  documentNumber: string
  birthDate: string
  expiryDate: string
  sex: string
}

// ---------------------------------------------------------------------------
// Image preprocessing
// ---------------------------------------------------------------------------

export async function preprocessImage(imageBuffer: Buffer): Promise<Buffer> {
  return sharp(imageBuffer)
    .grayscale()
    .normalize()
    .sharpen()
    .jpeg({ quality: 95 })
    .toBuffer()
}

// ---------------------------------------------------------------------------
// MRZ extraction
// ---------------------------------------------------------------------------

export async function extractMrz(imageBuffer: Buffer): Promise<MrzResult | null> {
  const preprocessed = await preprocessImage(imageBuffer)

  const { data: { text } } = await Tesseract.recognize(preprocessed, 'eng')

  // Find MRZ lines: lines of 30-44 uppercase alphanumeric + < characters
  const lines = text.split('\n').map((l) => l.trim())
  const mrzPattern = /^[A-Z0-9<]{30,44}$/
  const mrzLines = lines.filter((l) => mrzPattern.test(l))

  if (mrzLines.length < 2) return null

  try {
    const parsed = parseMrz(mrzLines.slice(0, mrzLines.length >= 3 ? 3 : 2))

    if (!parsed.valid) return null

    const fields = parsed.fields
    return {
      surname: fields.lastName ?? '',
      givenNames: fields.firstName ?? '',
      nationality: fields.nationality ?? '',
      documentNumber: fields.documentNumber ?? '',
      birthDate: fields.birthDate ?? '',
      expiryDate: fields.expirationDate ?? '',
      sex: fields.sex ?? '',
    }
  } catch {
    return null
  }
}
