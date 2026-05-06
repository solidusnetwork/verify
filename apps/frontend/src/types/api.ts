// GET /v1/auth/me response
export interface Organization {
  id: string
  email: string
  name: string
  subscriptionTier: string
  trialEndsAt: string
}

// POST /v1/auth/login response
export interface LoginResponse {
  token?: string
  requiresTotp?: boolean
}

// POST /v1/auth/register response
export interface RegisterResponse {
  token: string
}

// GET /v1/api-keys/ list item
export interface ApiKey {
  id: string
  name: string
  mode: string
  prefix: string
  createdAt: string
  lastUsedAt: string | null
  revoked: boolean
}

// POST /v1/api-keys/ response
export interface ApiKeyCreateResponse {
  id: string
  rawKey: string
  prefix: string
  mode: string
  createdAt: string
}

// GET /v1/webhooks/ list item
export interface WebhookEndpoint {
  id: string
  url: string
  events: string[]
  enabled: boolean
  description: string
  createdAt: string
  updatedAt: string
}

// GET /v1/webhooks/:id/deliveries list item
export interface WebhookDelivery {
  id: string
  endpointId: string
  eventType: string
  payload: Record<string, unknown>
  status: 'pending' | 'delivered' | 'failed'
  attempts: number
  lastAttemptAt: string | null
  deliveredAt: string | null
  createdAt: string
}

// POST /v1/webhooks/ response
export interface WebhookCreateResponse {
  id: string
  url: string
  secret: string
  warning: string
}

// GET /v1/verifications/:id response (API key auth, not JWT — for type completeness)
export interface Verification {
  id: string
  organizationId: string
  status: string
  level: number
  sandbox: boolean
  credentialId: string | null
  sessionToken: string
  subjectDid: string | null
  createdAt: string
  updatedAt: string
  completedAt: string | null
  expiresAt: string
}
