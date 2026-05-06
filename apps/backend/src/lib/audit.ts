import { getSql } from '../db/index.js'

export async function writeAuditLog(params: {
  organizationId: string
  actor: string
  action: string
  resourceType?: string
  resourceId?: string
  ip?: string
  metadata?: Record<string, unknown>
}): Promise<void> {
  const sql = getSql()
  await sql`
    INSERT INTO audit_log (organization_id, actor, action, resource_type, resource_id, ip, metadata)
    VALUES (
      ${params.organizationId},
      ${params.actor},
      ${params.action},
      ${params.resourceType ?? null},
      ${params.resourceId ?? null},
      ${params.ip ?? null},
      ${JSON.stringify(params.metadata ?? {})}
    )
  `.catch(() => {
    // Fire-and-forget — never block the main flow on audit failures
  })
}
