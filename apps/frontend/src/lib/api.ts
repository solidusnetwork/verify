const API_URL = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:3000'

// ---------------------------------------------------------------------------
// ApiError
// ---------------------------------------------------------------------------

export class ApiError extends Error {
  status: number
  detail?: string

  constructor(status: number, title: string, detail?: string) {
    super(title)
    this.name = 'ApiError'
    this.status = status
    if (detail !== undefined) this.detail = detail
  }
}

// ---------------------------------------------------------------------------
// Core fetch wrapper
// ---------------------------------------------------------------------------

export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { token?: string },
): Promise<T> {
  const { token, ...fetchOptions } = options ?? {}

  const headers = new Headers(fetchOptions.headers)

  // Attach auth token
  const authToken =
    token ??
    (typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null)
  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`)
  }

  // Set Content-Type for JSON bodies (skip for FormData)
  if (fetchOptions.body && !(fetchOptions.body instanceof FormData)) {
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }
  }

  let response: Response
  try {
    response = await fetch(`${API_URL}${path}`, {
      ...fetchOptions,
      headers,
    })
  } catch (err) {
    throw new ApiError(0, 'Network error', 'Could not connect to the server')
  }

  if (!response.ok) {
    let body: Record<string, unknown> = {}
    try {
      body = await response.json()
    } catch {
      // Non-JSON error response
    }

    // Backend returns RFC 7807 ProblemDetails { title, detail, status }
    // BUT authenticate decorator returns { error: string } instead
    const title =
      (body['title'] as string) ??
      (body['error'] as string) ??
      `Request failed (${response.status})`
    const detail = (body['detail'] as string) ?? undefined

    throw new ApiError(response.status, title, detail)
  }

  // 204 No Content
  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

// ---------------------------------------------------------------------------
// Convenience methods
// ---------------------------------------------------------------------------

export const api = {
  get: <T>(path: string) => apiFetch<T>(path, { method: 'GET' }),

  post: <T>(path: string, body?: unknown) =>
    apiFetch<T>(path, {
      method: 'POST',
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    }),

  delete: (path: string) => apiFetch<void>(path, { method: 'DELETE' }),
}
