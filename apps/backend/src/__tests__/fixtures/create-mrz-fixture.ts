import sharp from 'sharp'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

// Valid MRZ TD3 (passport) — two lines of 44 chars each
const MRZ_LINE_1 = 'P<GBRSMITH<<JOHN<<<<<<<<<<<<<<<<<<<<<<<<<<<'
const MRZ_LINE_2 = 'L8988901<4GBR9001153M3001151<<<<<<<<<<<<<<00'

export const EXPECTED_MRZ = {
  surname: 'SMITH',
  givenNames: 'JOHN',
  nationality: 'GBR',
  documentNumber: 'L8988901',
  birthDate: '900115',
  sex: 'M',
  expiryDate: '300115',
}

export async function createMrzFixture(outputPath: string): Promise<void> {
  mkdirSync(dirname(outputPath), { recursive: true })

  // Escape < for SVG/XML (MRZ uses < as filler character)
  const escaped1 = MRZ_LINE_1.replaceAll('<', '&lt;')
  const escaped2 = MRZ_LINE_2.replaceAll('<', '&lt;')

  const svg = `<svg width="640" height="480" xmlns="http://www.w3.org/2000/svg">
    <rect width="640" height="480" fill="white"/>
    <text x="20" y="400" font-family="Courier New, monospace" font-size="14" fill="black">${escaped1}</text>
    <text x="20" y="420" font-family="Courier New, monospace" font-size="14" fill="black">${escaped2}</text>
  </svg>`

  const buffer = await sharp(Buffer.from(svg))
    .grayscale()
    .jpeg({ quality: 95 })
    .toBuffer()

  writeFileSync(outputPath, buffer)
}
