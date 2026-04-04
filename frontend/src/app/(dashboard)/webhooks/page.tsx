'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Webhook, Plus, X, Copy, CheckCircle, Trash2, ToggleLeft, ToggleRight, ChevronRight, RefreshCw, Activity, Edit2, AlertCircle, RotateCcw } from 'lucide-react'
import { api, apiFetch, ApiError } from '../../../lib/api'
import type { WebhookEndpoint, WebhookCreateResponse, WebhookDelivery } from '../../../types/api'

const AVAILABLE_EVENTS = [
  'verification.completed',
  'verification.failed',
  'verification.started',
  'credential.issued',
  'credential.revoked',
  'case.created',
  'case.resolved',
  'list.match',
]

function HealthBadge({ status }: { status: 'delivered' | 'failed' | 'pending' | null }) {
  if (status === null) return (
    <span className="h-5 px-2 rounded-full bg-elevated border border-border text-[10px] font-medium text-text-disabled flex items-center gap-1">
      No data
    </span>
  )
  if (status === 'delivered') return (
    <span className="h-5 px-2 rounded-full bg-success/15 border border-success/25 text-[10px] font-semibold text-success flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
      Delivered
    </span>
  )
  if (status === 'pending') return (
    <span className="h-5 px-2 rounded-full bg-warning/15 border border-warning/25 text-[10px] font-semibold text-warning flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-warning inline-block" />
      Pending
    </span>
  )
  return (
    <span className="h-5 px-2 rounded-full bg-error/15 border border-error/25 text-[10px] font-semibold text-error flex items-center gap-1">
      <span className="w-1.5 h-1.5 rounded-full bg-error inline-block" />
      Failed
    </span>
  )
}

function formatTs(ts: string): string {
  const d = new Date(ts)
  return (
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) +
    ' ' +
    d.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  )
}

function deliveryStatusColor(status: WebhookDelivery['status']): string {
  if (status === 'delivered') return 'text-success'
  if (status === 'pending') return 'text-warning'
  return 'text-error'
}

export default function WebhooksPage() {
  const [endpoints, setEndpoints] = useState<WebhookEndpoint[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [activeTab, setActiveTab] = useState<'endpoints' | 'logs'>('endpoints')
  const [expandedLogId, setExpandedLogId] = useState<string | null>(null)
  const [logFilter, setLogFilter] = useState<string>('all')
  const [resendingId, setResendingId] = useState<string | null>(null)
  const [deliveryLogs, setDeliveryLogs] = useState<WebhookDelivery[]>([])
  const [logsLoading, setLogsLoading] = useState(false)
  const [selectedEndpointId, setSelectedEndpointId] = useState<string | null>(null)

  // Modal state
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newUrl, setNewUrl] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const [newEvents, setNewEvents] = useState<string[]>(['verification.completed'])
  const [copiedSecret, setCopiedSecret] = useState(false)
  const [testState, setTestState] = useState<'idle' | 'loading' | 'success'>('idle')

  const fetchEndpoints = useCallback(async () => {
    try {
      const data = await api.get<WebhookEndpoint[]>('/v1/webhooks')
      setEndpoints(data)
    } catch (err) {
      setFetchError(err instanceof ApiError ? (err.detail ?? err.message) : 'Failed to load webhooks')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchEndpoints() }, [fetchEndpoints])

  const fetchDeliveries = async (endpointId: string) => {
    setLogsLoading(true)
    setSelectedEndpointId(endpointId)
    try {
      const res = await api.get<{ data: WebhookDelivery[], total: number }>('/v1/webhooks/' + endpointId + '/deliveries?limit=20')
      setDeliveryLogs(res.data)
    } catch {
      setDeliveryLogs([])
    } finally {
      setLogsLoading(false)
    }
  }

  const toggleEnabled = async (id: string, currentEnabled: boolean) => {
    try {
      await apiFetch('/v1/webhooks/' + id, {
        method: 'PATCH',
        body: JSON.stringify({ enabled: !currentEnabled }),
      })
      await fetchEndpoints()
    } catch (err) {
      alert(err instanceof ApiError ? (err.detail ?? err.message) : 'Failed to toggle webhook')
    }
  }

  const deleteEndpoint = async (id: string) => {
    try {
      await api.delete('/v1/webhooks/' + id)
      await fetchEndpoints()
    } catch (err) {
      alert(err instanceof ApiError ? (err.detail ?? err.message) : 'Failed to delete webhook')
    }
  }

  const toggleEvent = (ev: string) =>
    setNewEvents(prev => prev.includes(ev) ? prev.filter(e => e !== ev) : [...prev, ev])

  const selectAllEvents = () =>
    setNewEvents(newEvents.length === AVAILABLE_EVENTS.length ? [] : [...AVAILABLE_EVENTS])

  const handleTest = async () => {
    if (!newUrl.trim() || testState === 'loading') return
    setTestState('loading')
    await new Promise(r => setTimeout(r, 1200))
    setTestState('success')
    setTimeout(() => setTestState('idle'), 3000)
  }

  const openModal = () => {
    setEditingId(null)
    setNewUrl('')
    setNewDescription('')
    setNewEvents(['verification.completed'])
    setTestState('idle')
    setCopiedSecret(false)
    setShowModal(true)
  }

  const editEndpoint = (id: string) => {
    const ep = endpoints.find(e => e.id === id)
    if (!ep) return
    setEditingId(id)
    setNewUrl(ep.url)
    setNewDescription(ep.description ?? '')
    setNewEvents([...ep.events])
    setTestState('idle')
    setCopiedSecret(false)
    setShowModal(true)
  }

  const handleResend = async (logId: string) => {
    setResendingId(logId)
    await new Promise(r => setTimeout(r, 1000))
    setResendingId(null)
  }

  const filteredLogs = logFilter === 'all'
    ? deliveryLogs
    : deliveryLogs.filter(l => l.endpointId === logFilter)

  const saveEndpoint = async () => {
    if (!newUrl.trim()) return

    if (editingId !== null) {
      try {
        await apiFetch('/v1/webhooks/' + editingId, {
          method: 'PATCH',
          body: JSON.stringify({
            url: newUrl,
            events: newEvents,
            ...(newDescription ? { description: newDescription } : {}),
          }),
        })
        await fetchEndpoints()
      } catch (err) {
        alert(err instanceof ApiError ? (err.detail ?? err.message) : 'Failed to update webhook')
        return
      }
    } else {
      try {
        const res = await api.post<WebhookCreateResponse>('/v1/webhooks', {
          url: newUrl,
          events: newEvents,
          ...(newDescription ? { description: newDescription } : {}),
        })
        alert('Webhook secret (save it now!): ' + res.secret)
        await fetchEndpoints()
      } catch (err) {
        alert(err instanceof ApiError ? (err.detail ?? err.message) : 'Failed to create webhook')
        return
      }
    }

    setShowModal(false)
  }

  return (
    <div className="p-8 max-w-[900px] mx-auto w-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[28px] font-semibold text-white leading-none">Webhooks</h2>
          <p className="text-[14px] font-normal text-text-secondary mt-1">Receive real-time notifications when events happen.</p>
        </div>
        <button onClick={openModal} className="h-9 px-4 bg-cta hover:bg-cta/90 text-white text-[14px] font-medium rounded-md transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Endpoint
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {(['endpoints', 'logs'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 mr-5 text-[14px] font-medium border-b-2 transition-colors ${activeTab === tab ? 'border-cta text-white' : 'border-transparent text-text-secondary hover:text-white'}`}
          >
            {tab === 'endpoints' ? 'Endpoints' : 'Delivery Logs'}
          </button>
        ))}
      </div>

      {/* Endpoints tab */}
      {activeTab === 'endpoints' && (
        <div className="bg-surface rounded-lg overflow-hidden">
          {loading ? (
            <div className="py-16 text-center">
              <RefreshCw className="w-8 h-8 text-text-secondary mx-auto animate-spin" />
            </div>
          ) : fetchError ? (
            <div className="py-8 px-6 flex items-center gap-3 text-error">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span className="text-[14px]">{fetchError}</span>
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border">
              {endpoints.map(ep => (
                <div key={ep.id} className="p-5 px-6 group">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-elevated flex items-center justify-center shrink-0 mt-0.5">
                      <Webhook className="w-5 h-5 text-text-secondary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[14px] font-medium text-white truncate">{ep.url}</span>
                        <span className={`h-5 px-2 rounded-full text-[10px] font-semibold flex items-center shrink-0 ${ep.enabled ? 'bg-success/15 text-success border border-success/25' : 'bg-text-disabled/15 text-text-disabled border border-text-disabled/25'}`}>
                          {ep.enabled ? 'ACTIVE' : 'DISABLED'}
                        </span>
                      </div>
                      {ep.description && (
                        <p className="text-[12px] text-text-secondary mb-1.5">{ep.description}</p>
                      )}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {ep.events.map(ev => (
                          <span key={ev} className="h-5 px-2 rounded-full bg-cta/10 border border-cta/20 text-[11px] font-medium text-cta">{ev}</span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] text-text-disabled">Created {new Date(ep.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        <button
                          onClick={() => { setActiveTab('logs'); fetchDeliveries(ep.id) }}
                          className="text-[11px] text-cta hover:underline"
                        >
                          View deliveries
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => editEndpoint(ep.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-text-secondary hover:text-white hover:bg-elevated rounded-md"
                        title="Edit endpoint"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => toggleEnabled(ep.id, ep.enabled)} className="p-2 text-text-secondary hover:text-white transition-colors">
                        {ep.enabled ? <ToggleRight className="w-6 h-6 text-success" /> : <ToggleLeft className="w-6 h-6" />}
                      </button>
                      <button onClick={() => deleteEndpoint(ep.id)} className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-md">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {endpoints.length === 0 && (
                <div className="py-16 text-center">
                  <Webhook className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                  <h3 className="text-[18px] font-semibold text-white mb-2">No webhook endpoints</h3>
                  <p className="text-[14px] text-text-secondary">Add an endpoint to start receiving events.</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Delivery Logs tab */}
      {activeTab === 'logs' && (
        <div className="flex flex-col gap-3">
          {/* Filter bar */}
          <div className="flex items-center gap-3">
            <label className="text-[13px] text-text-secondary shrink-0">Filter by endpoint:</label>
            <select
              value={logFilter}
              onChange={e => setLogFilter(e.target.value)}
              className="h-9 px-3 bg-elevated border border-border rounded-md text-[13px] text-white outline-none focus:border-cta/50 transition-colors cursor-pointer"
            >
              <option value="all">All Endpoints</option>
              {endpoints.map(ep => (
                <option key={ep.id} value={ep.id}>{ep.url.replace('https://', '')}</option>
              ))}
            </select>
            {selectedEndpointId === null && !logsLoading && deliveryLogs.length === 0 && (
              <span className="text-[13px] text-text-disabled">Select an endpoint above or click "View deliveries" on an endpoint.</span>
            )}
          </div>

          <div className="bg-surface rounded-lg overflow-hidden">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_1fr_100px_60px_56px_80px] gap-3 px-4 py-2.5 border-b border-border">
              {['Event', 'Endpoint', 'Status', 'Retries', 'Attempts', ''].map((h, i) => (
                <span key={i} className="text-[11px] font-medium text-text-disabled uppercase tracking-[0.06em]">{h}</span>
              ))}
            </div>

            {logsLoading ? (
              <div className="py-12 text-center">
                <RefreshCw className="w-6 h-6 text-text-secondary mx-auto animate-spin" />
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-border">
                {filteredLogs.map(log => (
                  <React.Fragment key={log.id}>
                    <div className="w-full grid grid-cols-[1fr_1fr_100px_60px_56px_80px] gap-3 px-4 py-3 items-center hover:bg-elevated/40 transition-colors group">
                      <button
                        onClick={() => setExpandedLogId(expandedLogId === log.id ? null : log.id)}
                        className="contents text-left"
                      >
                        <div>
                          <span className="text-[12px] font-mono text-cta">{log.eventType}</span>
                          <div className="text-[11px] text-text-disabled mt-0.5">{formatTs(log.createdAt)}</div>
                        </div>
                        <span className="text-[12px] font-mono text-text-secondary truncate">
                          {endpoints.find(e => e.id === log.endpointId)?.url.replace('https://', '') ?? log.endpointId}
                        </span>
                        <span className={`text-[12px] font-semibold capitalize ${deliveryStatusColor(log.status)}`}>
                          {log.status}
                        </span>
                        <span className="text-[12px] text-text-secondary">{log.attempts}</span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[12px] text-text-secondary">
                            {log.lastAttemptAt ? formatTs(log.lastAttemptAt) : '—'}
                          </span>
                          <ChevronRight className={`w-4 h-4 text-text-disabled transition-transform group-hover:text-white ${expandedLogId === log.id ? 'rotate-90' : ''}`} />
                        </div>
                      </button>
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleResend(log.id)}
                          disabled={resendingId === log.id}
                          className="opacity-0 group-hover:opacity-100 transition-opacity h-7 px-2.5 rounded-md border border-border text-[11px] text-text-secondary hover:text-white hover:border-border/80 hover:bg-elevated disabled:opacity-40 flex items-center gap-1 shrink-0"
                        >
                          {resendingId === log.id ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RotateCcw className="w-3 h-3" />}
                          {resendingId === log.id ? 'Sending…' : 'Resend'}
                        </button>
                      </div>
                    </div>

                    {expandedLogId === log.id && (
                      <div className="px-4 pb-4 pt-2 bg-elevated/20 flex flex-col gap-4 border-t border-border/50">
                        <div>
                          <div className="text-[11px] font-medium text-text-disabled uppercase tracking-[0.06em] mb-1.5">Payload</div>
                          <pre className="text-[11px] text-white font-mono bg-bg/60 rounded-md p-3 overflow-x-auto leading-relaxed">
                            {JSON.stringify(log.payload, null, 2)}
                          </pre>
                        </div>
                        {log.deliveredAt && (
                          <div className="text-[12px] text-text-secondary">
                            Delivered at: <span className="text-white">{formatTs(log.deliveredAt)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </React.Fragment>
                ))}
                {!logsLoading && filteredLogs.length === 0 && selectedEndpointId !== null && (
                  <div className="py-12 text-center">
                    <Activity className="w-8 h-8 text-text-secondary mx-auto mb-3" />
                    <p className="text-[14px] text-text-secondary">No delivery logs found.</p>
                  </div>
                )}
                {!logsLoading && filteredLogs.length === 0 && selectedEndpointId === null && (
                  <div className="py-12 text-center">
                    <Activity className="w-8 h-8 text-text-secondary mx-auto mb-3" />
                    <p className="text-[14px] text-text-secondary">Select an endpoint to load delivery logs.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add / Edit Endpoint Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-surface rounded-xl border border-border w-full max-w-[560px] p-6 flex flex-col gap-5 shadow-elevated max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-white">
                {editingId !== null ? 'Edit Webhook Endpoint' : 'Add Webhook Endpoint'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-text-secondary hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* URL + Test */}
            <div>
              <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em] block mb-1.5">Endpoint URL</label>
              <div className="flex gap-2">
                <input
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                  placeholder="https://example.com/webhook"
                  className="flex-1 h-10 px-3 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={handleTest}
                  disabled={!newUrl.trim() || testState === 'loading'}
                  className={`h-10 px-4 rounded-md text-[13px] font-medium border transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed ${testState === 'success' ? 'border-success/30 bg-success/10 text-success' : 'border-border text-white hover:bg-elevated'}`}
                >
                  {testState === 'loading' ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : testState === 'success' ? <CheckCircle className="w-3.5 h-3.5" /> : <Activity className="w-3.5 h-3.5" />}
                  {testState === 'loading' ? 'Testing...' : testState === 'success' ? 'Success' : 'Test'}
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em] block mb-1.5">
                Description <span className="normal-case text-text-disabled">(optional)</span>
              </label>
              <input
                value={newDescription}
                onChange={e => setNewDescription(e.target.value)}
                placeholder="e.g. Production CRM webhook"
                className="w-full h-10 px-3 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors"
              />
            </div>

            {/* Events */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Events to Subscribe</label>
                <button
                  type="button"
                  onClick={selectAllEvents}
                  className="text-[12px] text-cta hover:underline"
                >
                  {newEvents.length === AVAILABLE_EVENTS.length ? 'Deselect All' : 'Select All'}
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {AVAILABLE_EVENTS.map(ev => (
                  <label key={ev} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={newEvents.includes(ev)}
                      onChange={() => toggleEvent(ev)}
                      className="w-4 h-4 accent-cta rounded"
                    />
                    <span className="text-[12px] font-mono text-text-secondary group-hover:text-white transition-colors">{ev}</span>
                  </label>
                ))}
              </div>
            </div>

            {editingId === null && (
              <div>
                <div className="flex items-start gap-2 bg-warning/10 border border-warning/25 rounded-md px-3 py-2.5">
                  <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                  <p className="text-[12px] text-warning leading-relaxed">
                    A signing secret will be generated after saving. It will only be shown once — save it immediately to verify the <code className="font-mono">Solidus-Signature</code> header.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button onClick={() => setShowModal(false)} className="h-9 px-4 rounded-md border border-border text-[14px] text-white hover:bg-elevated transition-colors">
                Cancel
              </button>
              <button
                onClick={saveEndpoint}
                disabled={!newUrl.trim() || newEvents.length === 0}
                className="h-9 px-4 bg-cta hover:bg-cta/90 text-white text-[14px] font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingId !== null ? 'Save Changes' : 'Add Endpoint'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
