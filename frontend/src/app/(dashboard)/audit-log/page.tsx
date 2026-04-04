'use client'

import React, { useState, useEffect, useCallback } from 'react'
import {
  ShieldCheck, ShieldX, Award, ShieldOff, Key, UserPlus, Settings,
  Search, Download, CalendarDays, ChevronDown, X, ExternalLink,
  Activity, Shield,
} from 'lucide-react'
import { api } from '../../../lib/api'

// ---------------------------------------------------------------------------
// Types & data
// ---------------------------------------------------------------------------

type EventType =
  | 'kyc.completed'
  | 'kyc.failed'
  | 'credential.issued'
  | 'credential.revoked'
  | 'api_key.created'
  | 'webhook.delivered'
  | 'webhook.failed'
  | 'user.invited'
  | 'settings.updated'

interface AuditEvent {
  id: string
  event: EventType
  actor: string
  target: string
  timestamp: string
  ip: string | null
  blockHash: string | null
  payload: Record<string, unknown>
}


// ---------------------------------------------------------------------------
// Event meta
// ---------------------------------------------------------------------------

interface EventMeta {
  Icon: React.ElementType
  colorClass: string
  label: string
}

const EVENT_META: Record<EventType, EventMeta> = {
  'kyc.completed':       { Icon: ShieldCheck,  colorClass: 'text-success',        label: 'kyc.completed' },
  'kyc.failed':          { Icon: ShieldX,       colorClass: 'text-error',          label: 'kyc.failed' },
  'credential.issued':   { Icon: Award,         colorClass: 'text-cta',            label: 'credential.issued' },
  'credential.revoked':  { Icon: ShieldOff,     colorClass: 'text-error',          label: 'credential.revoked' },
  'api_key.created':     { Icon: Key,           colorClass: 'text-warning',        label: 'api_key.created' },
  'webhook.delivered':   { Icon: Activity,      colorClass: 'text-success',        label: 'webhook.delivered' },
  'webhook.failed':      { Icon: Activity,      colorClass: 'text-error',          label: 'webhook.failed' },
  'user.invited':        { Icon: UserPlus,      colorClass: 'text-cta',            label: 'user.invited' },
  'settings.updated':    { Icon: Settings,      colorClass: 'text-text-secondary', label: 'settings.updated' },
}

// ---------------------------------------------------------------------------
// JSON syntax highlighter
// ---------------------------------------------------------------------------

function HighlightedJSON({ data }: { data: Record<string, unknown> }) {
  const json = JSON.stringify(data, null, 2)
  // Tokenize the JSON string into spans
  const tokens = json.split(/("(?:[^"\\]|\\.)*"(?:\s*:)?|\b\d+(?:\.\d+)?\b|true|false|null)/g)

  return (
    <pre className="bg-bg rounded-lg p-4 font-mono text-[12px] overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">
      {tokens.map((token, i) => {
        // Key: "key":
        if (/^"[^"]*"\s*:/.test(token)) {
          const keyPart = token.replace(/\s*:$/, '')
          return (
            <span key={i}>
              <span className="text-cyan">{keyPart}</span>
              <span className="text-white/60">:</span>
            </span>
          )
        }
        // String value
        if (/^"[^"]*"$/.test(token)) return <span key={i} className="text-success">{token}</span>
        // Number
        if (/^\d+(?:\.\d+)?$/.test(token)) return <span key={i} className="text-warning">{token}</span>
        // true / false / null
        if (token === 'true' || token === 'false' || token === 'null') return <span key={i} className="text-cta">{token}</span>
        // Structural chars / whitespace
        return <span key={i} className="text-white/40">{token}</span>
      })}
    </pre>
  )
}

// ---------------------------------------------------------------------------
// Detail panel
// ---------------------------------------------------------------------------

function EventDetailPanel({
  event,
  onClose,
}: {
  event: AuditEvent
  onClose: () => void
}) {
  const meta = EVENT_META[event.event]
  const Icon = meta.Icon

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Panel */}
      <div className="fixed right-0 top-0 bottom-0 z-50 w-[480px] bg-surface border-l border-border flex flex-col shadow-elevated overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg bg-elevated flex items-center justify-center ${meta.colorClass}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className={`font-mono text-[14px] font-semibold ${meta.colorClass}`}>{event.event}</span>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Core details */}
        <div className="px-6 py-4 border-b border-border">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium text-text-secondary uppercase tracking-[0.04em]">Timestamp</span>
              <span className="font-mono text-[13px] text-white">{event.timestamp}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium text-text-secondary uppercase tracking-[0.04em]">Actor</span>
              <span className="text-[13px] text-white">{event.actor}</span>
            </div>
            {event.ip && (
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-medium text-text-secondary uppercase tracking-[0.04em]">IP Address</span>
                <span className="font-mono text-[13px] text-white">{event.ip}</span>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-medium text-text-secondary uppercase tracking-[0.04em]">Target</span>
              <span className="font-mono text-[12px] text-text-secondary break-all">{event.target}</span>
            </div>
          </div>
        </div>

        {/* On-chain attestation */}
        {event.blockHash && (
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-[11px] font-medium text-text-secondary uppercase tracking-[0.04em] mb-3 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-success" />
              On-chain Attestation
            </h3>
            <div className="bg-elevated rounded-md p-3 flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-[12px] text-success">{event.blockHash}</span>
            </div>
            <a
              href="#"
              className="text-[12px] text-cta hover:underline flex items-center gap-1"
            >
              View on Explorer <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        {/* Payload */}
        <div className="px-6 py-4 flex-1">
          <h3 className="text-[11px] font-medium text-text-secondary uppercase tracking-[0.04em] mb-3">
            Payload
          </h3>
          <HighlightedJSON data={event.payload} />
        </div>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

const ALL_EVENT_TYPES: EventType[] = [
  'kyc.completed', 'kyc.failed', 'credential.issued', 'credential.revoked',
  'api_key.created', 'webhook.delivered', 'webhook.failed', 'user.invited', 'settings.updated',
]

interface AuditLogResponse {
  data: Array<{
    id: string
    actor: string
    action: string
    resourceType: string | null
    resourceId: string | null
    ip: string | null
    metadata: Record<string, unknown>
    createdAt: string
  }>
  total: number
}

export default function AuditLogPage() {
  const [search, setSearch] = useState('')
  const [eventTypeFilter, setEventTypeFilter] = useState<EventType | 'all'>('all')
  const [selectedEvent, setSelectedEvent] = useState<AuditEvent | null>(null)
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false)
  const [events, setEvents] = useState<AuditEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  const fetchEvents = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get<AuditLogResponse>('/v1/dashboard/audit-log?limit=50')
      setTotal(res.total)
      setEvents(res.data.map(item => ({
        id: item.id,
        event: item.action as EventType,
        actor: item.actor,
        target: item.resourceId ?? item.resourceType ?? '—',
        timestamp: new Date(item.createdAt).toISOString().replace('T', ' ').slice(0, 19),
        ip: item.ip,
        blockHash: null,
        payload: item.metadata,
      })))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchEvents()
  }, [fetchEvents])

  const filtered = events.filter(e => {
    const matchSearch =
      !search ||
      e.event.toLowerCase().includes(search.toLowerCase()) ||
      e.actor.toLowerCase().includes(search.toLowerCase()) ||
      e.target.toLowerCase().includes(search.toLowerCase())
    const matchType = eventTypeFilter === 'all' || e.event === eventTypeFilter
    return matchSearch && matchType
  })

  return (
    <div className="p-6 flex flex-col gap-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-semibold text-white leading-none">Audit Log</h2>
      </div>

      {/* Blockchain attestation banner */}
      <div className="bg-success/5 border border-success/20 rounded-lg px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield className="w-4 h-4 text-success shrink-0" />
          <span className="text-[13px] text-text-secondary">
            All events are cryptographically attested on the Solidus Protocol chain.
          </span>
        </div>
        <a href="#" className="text-[13px] text-cta hover:underline flex items-center gap-1 shrink-0">
          View on Explorer <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Filter bar */}
      <div className="bg-surface rounded-lg p-4 flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative w-[260px] flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search events, actors, targets…"
            className="w-full h-9 pl-9 pr-3 bg-transparent border-none outline-none text-[14px] text-white placeholder:text-text-disabled"
          />
        </div>
        <div className="w-px h-5 bg-border" />

        {/* Event type dropdown */}
        <div className="relative">
          <button
            onClick={() => setTypeDropdownOpen(o => !o)}
            className="h-9 px-3 rounded-md bg-elevated border border-border flex items-center gap-2 hover:bg-border/50 transition-colors"
          >
            <span className="text-[13px] text-white">
              {eventTypeFilter === 'all' ? 'All Events' : eventTypeFilter}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
          </button>
          {typeDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setTypeDropdownOpen(false)}
              />
              <div className="absolute left-0 top-full mt-1 z-20 w-[220px] bg-elevated border border-border rounded-lg py-1 shadow-elevated">
                <button
                  onClick={() => { setEventTypeFilter('all'); setTypeDropdownOpen(false) }}
                  className={`w-full text-left px-4 py-2 text-[13px] hover:bg-border/50 transition-colors ${eventTypeFilter === 'all' ? 'text-cta' : 'text-white'}`}
                >
                  All Events
                </button>
                {ALL_EVENT_TYPES.map(t => {
                  const meta = EVENT_META[t]
                  const Icon = meta.Icon
                  return (
                    <button
                      key={t}
                      onClick={() => { setEventTypeFilter(t); setTypeDropdownOpen(false) }}
                      className={`w-full text-left px-4 py-2 text-[13px] hover:bg-border/50 transition-colors flex items-center gap-2 ${eventTypeFilter === t ? 'text-cta' : 'text-text-secondary'}`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${meta.colorClass}`} />
                      {t}
                    </button>
                  )
                })}
              </div>
            </>
          )}
        </div>

        {/* Date range */}
        <button className="h-9 px-3 rounded-md bg-elevated border border-border flex items-center gap-2 hover:bg-border/50 transition-colors">
          <CalendarDays className="w-4 h-4 text-text-secondary" />
          <span className="text-[13px] text-white">Last 7 days</span>
          <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
        </button>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Export */}
        <button className="h-9 px-3 rounded-md border border-border flex items-center gap-2 hover:bg-elevated transition-colors">
          <Download className="w-4 h-4 text-text-secondary" />
          <span className="text-[13px] text-text-secondary">Export</span>
        </button>
      </div>

      {/* Events table */}
      <div className="bg-surface rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-elevated h-11 border-b border-border">
                <th className="py-0 px-5 text-[11px] font-medium text-text-secondary tracking-[0.04em] uppercase">Event</th>
                <th className="py-0 px-4 text-[11px] font-medium text-text-secondary tracking-[0.04em] uppercase">Actor</th>
                <th className="py-0 px-4 text-[11px] font-medium text-text-secondary tracking-[0.04em] uppercase">Target</th>
                <th className="py-0 px-4 text-[11px] font-medium text-text-secondary tracking-[0.04em] uppercase">Timestamp</th>
                <th className="py-0 px-4 text-[11px] font-medium text-text-secondary tracking-[0.04em] uppercase">Block</th>
                <th className="py-0 px-5 w-[100px] text-[11px] font-medium text-text-secondary tracking-[0.04em] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="h-[260px]">
                    <div className="flex flex-col items-center justify-center w-full h-full text-center">
                      <div className="w-8 h-8 rounded-full border-2 border-cta border-t-transparent animate-spin mb-3" />
                      <p className="text-[13px] text-text-secondary">Loading audit events…</p>
                    </div>
                  </td>
                </tr>
              ) : filtered.length > 0 ? (
                filtered.map(e => {
                  const meta = EVENT_META[e.event]
                  const Icon = meta.Icon
                  return (
                    <tr
                      key={e.id}
                      onClick={() => setSelectedEvent(e)}
                      className="h-12 border-b border-elevated hover:bg-elevated transition-colors duration-150 cursor-pointer group"
                    >
                      {/* Event */}
                      <td className="py-0 px-5">
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 shrink-0 ${meta.colorClass}`} />
                          <span className={`font-mono text-[13px] ${meta.colorClass}`}>{e.event}</span>
                        </div>
                      </td>
                      {/* Actor */}
                      <td className="py-0 px-4">
                        <span className="text-[13px] text-white">{e.actor}</span>
                      </td>
                      {/* Target */}
                      <td className="py-0 px-4">
                        <span className="font-mono text-[12px] text-text-secondary truncate max-w-[180px] block">{e.target}</span>
                      </td>
                      {/* Timestamp */}
                      <td className="py-0 px-4">
                        <span className="font-mono text-[12px] text-text-secondary">{e.timestamp}</span>
                      </td>
                      {/* Block */}
                      <td className="py-0 px-4">
                        {e.blockHash ? (
                          <a
                            href="#"
                            onClick={ev => ev.stopPropagation()}
                            className="font-mono text-[12px] text-cta hover:underline flex items-center gap-1"
                          >
                            {e.blockHash}
                          </a>
                        ) : (
                          <span className="text-[13px] text-text-disabled">—</span>
                        )}
                      </td>
                      {/* Actions */}
                      <td
                        className="py-0 px-5"
                        onClick={ev => ev.stopPropagation()}
                      >
                        <button
                          onClick={() => setSelectedEvent(e)}
                          className="h-7 px-3 rounded text-[12px] font-medium text-text-secondary border border-border hover:text-white hover:bg-elevated transition-colors opacity-0 group-hover:opacity-100"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  )
                })
              ) : events.length === 0 ? (
                <tr>
                  <td colSpan={6} className="h-[260px]">
                    <div className="flex flex-col items-center justify-center w-full h-full text-center">
                      <Activity className="w-10 h-10 text-text-secondary mb-3" />
                      <h3 className="text-[18px] font-semibold text-white mb-1">No audit events</h3>
                      <p className="text-[13px] text-text-secondary">Events will appear here as activity occurs.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={6} className="h-[260px]">
                    <div className="flex flex-col items-center justify-center w-full h-full text-center">
                      <Search className="w-10 h-10 text-text-secondary mb-3" />
                      <h3 className="text-[18px] font-semibold text-white mb-1">No events found</h3>
                      <p className="text-[13px] text-text-secondary mb-4">Try adjusting your filters or search query.</p>
                      <button
                        onClick={() => { setSearch(''); setEventTypeFilter('all') }}
                        className="text-[13px] font-medium text-cta hover:underline"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && filtered.length > 0 && (
          <div className="h-[52px] px-5 flex items-center justify-between border-t border-elevated bg-surface">
            <span className="text-[12px] text-text-secondary">
              Showing 1–{filtered.length} of {total}
            </span>
            <div className="flex items-center gap-1">
              <button disabled className="h-7 px-2 text-[12px] font-medium text-text-disabled cursor-not-allowed">Previous</button>
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  className={`w-7 h-7 rounded-full text-[12px] font-medium flex items-center justify-center ${
                    n === 1 ? 'bg-cta text-white' : 'text-text-secondary hover:bg-elevated hover:text-white transition-colors'
                  }`}
                >
                  {n}
                </button>
              ))}
              <span className="w-7 h-7 flex items-center justify-center text-text-secondary text-[12px]">…</span>
              <button className="w-7 h-7 rounded-full text-text-secondary hover:bg-elevated hover:text-white transition-colors text-[12px] font-medium flex items-center justify-center">
                28
              </button>
              <button className="h-7 px-2 text-[12px] font-medium text-white hover:text-cta transition-colors">Next</button>
            </div>
          </div>
        )}
      </div>

      {/* Detail panel */}
      {selectedEvent && (
        <EventDetailPanel
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
}
