import type { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { getSql } from '../../db/index.js'
import * as verificationService from '../verifications/service.js'

// ---------------------------------------------------------------------------
// Zod schemas
// ---------------------------------------------------------------------------

const ListQuery = z.object({
  status: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
})

const VerificationIdParams = z.object({
  verificationId: z.string().uuid(),
})

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseParams<T>(schema: z.ZodType<T>, params: unknown): T {
  const result = schema.safeParse(params)
  if (!result.success) {
    const detail = result.error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join('; ')
    throw Object.assign(new Error(`Validation error: ${detail}`), {
      validation: true,
    })
  }
  return result.data
}

// ---------------------------------------------------------------------------
// Plugin
// ---------------------------------------------------------------------------

async function dashboardRoutesPlugin(app: FastifyInstance): Promise<void> {
  // -------------------------------------------------------------------------
  // GET /stats  — dashboard KPI aggregation
  // -------------------------------------------------------------------------
  app.get(
    '/stats',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const sql = getSql()
      const orgId = request.user.sub

      // Total verifications for this org
      const totalRows = await sql<{ count: string }[]>`
        SELECT COUNT(*) as count FROM verifications WHERE organization_id = ${orgId}
      `
      const total = parseInt(totalRows[0]?.count ?? '0', 10)

      // By status
      const statusRows = await sql<{ status: string; count: string }[]>`
        SELECT status, COUNT(*) as count FROM verifications
        WHERE organization_id = ${orgId}
        GROUP BY status
      `
      const byStatus: Record<string, number> = {}
      for (const row of statusRows) {
        byStatus[row.status] = parseInt(row.count, 10)
      }

      const completed = byStatus['completed'] ?? 0
      const failed = byStatus['failed'] ?? 0
      const pending = byStatus['pending'] ?? 0
      const successRate = total > 0 ? Math.round((completed / total) * 1000) / 10 : 0

      // Today's count
      const todayRows = await sql<{ count: string }[]>`
        SELECT COUNT(*) as count FROM verifications
        WHERE organization_id = ${orgId} AND created_at >= CURRENT_DATE
      `
      const today = parseInt(todayRows[0]?.count ?? '0', 10)

      // API keys count
      const keyRows = await sql<{ count: string }[]>`
        SELECT COUNT(*) as count FROM api_keys
        WHERE organization_id = ${orgId} AND revoked_at IS NULL
      `
      const activeKeys = parseInt(keyRows[0]?.count ?? '0', 10)

      return reply.send({
        total,
        today,
        pending,
        completed,
        failed,
        successRate,
        activeKeys,
      })
    },
  )

  // -------------------------------------------------------------------------
  // GET /audit-log  — audit log entries
  // -------------------------------------------------------------------------
  app.get(
    '/audit-log',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const sql = getSql()
      const query = parseParams(ListQuery, request.query)
      const orgId = request.user.sub
      const limit = Math.min(query.limit ?? 50, 100)
      const offset = query.offset ?? 0

      type AuditRow = {
        id: string
        actor: string
        action: string
        resource_type: string | null
        resource_id: string | null
        ip: string | null
        metadata: Record<string, unknown>
        created_at: Date
        total_count: string
      }

      const rows = await sql<AuditRow[]>`
        SELECT
          id, actor, action, resource_type, resource_id, ip, metadata, created_at,
          COUNT(*) OVER () AS total_count
        FROM audit_log
        WHERE organization_id = ${orgId}
          ${query.status ? sql`AND action = ${query.status}` : sql``}
        ORDER BY created_at DESC
        LIMIT ${limit}
        OFFSET ${offset}
      `

      const total = rows.length > 0 ? parseInt(rows[0]!.total_count, 10) : 0

      return reply.send({
        data: rows.map((row) => ({
          id: row.id,
          actor: row.actor,
          action: row.action,
          resourceType: row.resource_type,
          resourceId: row.resource_id,
          ip: row.ip,
          metadata: row.metadata,
          createdAt: row.created_at.toISOString(),
        })),
        total,
      })
    },
  )

  // -------------------------------------------------------------------------
  // GET /verifications  — list verifications (JWT auth, for dashboard)
  // -------------------------------------------------------------------------
  app.get(
    '/verifications',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const query = parseParams(ListQuery, request.query)

      const result = await verificationService.listSessions(
        request.user.sub,
        {
          ...(query.status !== undefined ? { status: query.status } : {}),
          ...(query.limit !== undefined ? { limit: query.limit } : {}),
          ...(query.offset !== undefined ? { offset: query.offset } : {}),
        },
      )

      return reply.send(result)
    },
  )

  // -------------------------------------------------------------------------
  // GET /verifications/:verificationId  — single verification (JWT auth)
  // -------------------------------------------------------------------------
  app.get(
    '/verifications/:verificationId',
    { preHandler: [app.authenticate] },
    async (request, reply) => {
      const { verificationId } = parseParams(
        VerificationIdParams,
        request.params,
      )

      const session = await verificationService.getSession(
        request.user.sub,
        verificationId,
      )

      return reply.send(session)
    },
  )
}

export const dashboardRoutes = dashboardRoutesPlugin
