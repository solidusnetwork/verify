import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { createStorage, type StorageBackend } from '../lib/storage.js'

describe('local storage backend', () => {
  let storage: StorageBackend
  let tempDir: string

  beforeAll(async () => {
    tempDir = await mkdtemp(join(tmpdir(), 'solidus-storage-test-'))
    storage = createStorage({ backend: 'local', localPath: tempDir })
  })

  afterAll(async () => {
    await rm(tempDir, { recursive: true, force: true })
  })

  it('uploads and downloads a file', async () => {
    const key = 'verifications/test-id/doc-front-123.jpg'
    const data = Buffer.from('fake image data')

    await storage.uploadFile(key, data)
    const downloaded = await storage.downloadFile(key)

    expect(downloaded).toEqual(data)
  })

  it('creates nested directories automatically', async () => {
    const key = 'verifications/deep/nested/path/file.jpg'
    const data = Buffer.from('nested data')

    await storage.uploadFile(key, data)
    const downloaded = await storage.downloadFile(key)

    expect(downloaded).toEqual(data)
  })

  it('deletes a file', async () => {
    const key = 'verifications/test-id/to-delete.jpg'
    await storage.uploadFile(key, Buffer.from('to delete'))

    await storage.deleteFile(key)

    await expect(storage.downloadFile(key)).rejects.toThrow()
  })

  it('throws on download of nonexistent file', async () => {
    await expect(storage.downloadFile('nonexistent/file.jpg')).rejects.toThrow()
  })
})
