'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Key, Eye, EyeOff, Copy, Trash2, CheckCircle, Plus, X, Search, RotateCcw } from 'lucide-react'
import { api, ApiError } from '../../../lib/api'
import type { ApiKey, ApiKeyCreateResponse } from '../../../types/api'

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState('')
  const [visible, setVisible] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [newKeyName, setNewKeyName] = useState('')
  const [newKeyEnv, setNewKeyEnv] = useState('Test')
  const [generatedKey, setGeneratedKey] = useState('')
  const [step, setStep] = useState(1)

  const fetchKeys = useCallback(async () => {
    try {
      const data = await api.get<ApiKey[]>('/v1/api-keys')
      setKeys(data)
    } catch (err) {
      setFetchError(err instanceof ApiError ? (err.detail ?? err.message) : 'Failed to load API keys')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchKeys() }, [fetchKeys])

  const copyKey = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const revokeKey = async (keyId: string) => {
    try {
      await api.delete('/v1/api-keys/' + keyId)
      await fetchKeys()
    } catch (err) {
      alert(err instanceof ApiError ? (err.detail ?? err.message) : 'Failed to revoke key')
    }
  }

  const createKey = async () => {
    try {
      const res = await api.post<ApiKeyCreateResponse>('/v1/api-keys', {
        name: newKeyName,
        mode: newKeyEnv === 'Live' ? 'live' : 'sandbox',
      })
      setGeneratedKey(res.rawKey)
      setStep(2)
      await fetchKeys()
    } catch (err) {
      alert(err instanceof ApiError ? (err.detail ?? err.message) : 'Failed to create key')
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setStep(1)
    setNewKeyName('')
    setNewKeyEnv('Test')
    setGeneratedKey('')
  }

  return (
    <div className="p-8 max-w-[900px] mx-auto w-full flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[28px] font-semibold text-white leading-none">API Keys</h2>
          <p className="text-[14px] font-normal text-text-secondary mt-1">Manage your API keys for programmatic access.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="h-9 px-4 bg-cta hover:bg-cta/90 text-white text-[14px] font-medium rounded-md transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" /> Create API Key
        </button>
      </div>

      <div className="bg-surface rounded-lg overflow-hidden">
        <div className="p-5 px-6 border-b border-border flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input placeholder="Search keys..." className="h-9 pl-9 pr-3 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors" />
          </div>
        </div>

        <div className="flex flex-col divide-y divide-border">
          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-2 border-cta border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-[14px] text-text-secondary">Loading API keys…</p>
            </div>
          ) : fetchError ? (
            <div className="py-10 px-6">
              <div className="bg-error/10 border border-error/25 rounded-md p-4 text-[13px] text-error">
                {fetchError}
              </div>
            </div>
          ) : (
            <>
              {keys.map(k => {
                const envLabel = k.mode === 'live' ? 'Live' : 'Test'
                const maskedDisplay = k.prefix + '••••••••••••••'
                const createdDisplay = k.createdAt.split('T')[0]
                const lastUsedDisplay = k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleString() : 'Never'
                return (
                  <div key={k.id} className={`p-5 px-6 flex items-center gap-4 hover:bg-elevated/30 transition-colors group ${k.revoked ? 'opacity-50' : ''}`}>
                    <div className="w-10 h-10 rounded-full bg-cta/10 flex items-center justify-center shrink-0">
                      <Key className="w-5 h-5 text-cta" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[15px] font-semibold ${k.revoked ? 'line-through text-text-secondary' : 'text-white'}`}>{k.name}</span>
                        <span className={`h-5 px-2 rounded-full text-[10px] font-semibold flex items-center ${envLabel === 'Live' ? 'bg-success/15 text-success border border-success/25' : 'bg-warning/15 text-warning border border-warning/25'}`}>
                          {envLabel.toUpperCase()}
                        </span>
                        {k.revoked && (
                          <span className="h-5 px-2 rounded-full text-[10px] font-semibold flex items-center bg-error/15 text-error border border-error/25">
                            REVOKED
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[13px] text-text-secondary">
                          {visible[k.id] ? k.prefix + '••••••••••••••' : maskedDisplay}
                        </span>
                        <button onClick={() => setVisible(v => ({ ...v, [k.id]: !v[k.id] }))} className="text-text-disabled hover:text-white transition-colors">
                          {visible[k.id] ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => copyKey(maskedDisplay, k.id)} className="text-text-disabled hover:text-white transition-colors">
                          {copied === k.id ? <CheckCircle className="w-3.5 h-3.5 text-success" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-[11px] text-text-disabled">Created {createdDisplay}</span>
                        <span className="text-[11px] text-text-disabled">Last used {lastUsedDisplay}</span>
                      </div>
                    </div>
                    {!k.revoked && (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                        <button className="p-2 text-text-secondary hover:text-white hover:bg-elevated rounded-md transition-colors" title="Rotate key">
                          <RotateCcw className="w-4 h-4" />
                        </button>
                        <button onClick={() => revokeKey(k.id)} className="p-2 text-text-secondary hover:text-error hover:bg-error/10 rounded-md transition-colors" title="Revoke key">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
              {keys.length === 0 && (
                <div className="py-16 text-center">
                  <Key className="w-12 h-12 text-text-secondary mx-auto mb-4" />
                  <h3 className="text-[18px] font-semibold text-white mb-2">No API keys</h3>
                  <p className="text-[14px] text-text-secondary">Create your first API key to get started.</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* API Usage Stats */}
      <div className="bg-surface rounded-lg p-6 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[18px] font-semibold text-white leading-none">API Usage</h3>
            <span className="text-[12px] text-text-secondary mt-1 block">Current billing period: Mar 1 – Mar 31, 2026</span>
          </div>
          <div className="text-[12px] text-text-secondary">
            Plan: <span className="text-white font-medium">Growth</span> · Resets Mar 31 ·{' '}
            <button className="text-cta hover:underline font-medium">Upgrade</button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Verifications */}
          <div className="flex flex-col gap-2">
            <div className="flex items-end justify-between">
              <span className="text-[14px] font-medium text-white">Verifications</span>
              <div className="flex items-baseline gap-2">
                <span className="text-[13px] font-medium text-white">1,247 / 5,000</span>
                <span className="text-[12px] text-text-secondary w-10 text-right">25%</span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-elevated overflow-hidden">
              <div className="h-full bg-cta rounded-full" style={{ width: '25%' }} />
            </div>
          </div>

          {/* API Calls */}
          <div className="flex flex-col gap-2">
            <div className="flex items-end justify-between">
              <span className="text-[14px] font-medium text-white">API Calls</span>
              <div className="flex items-baseline gap-2">
                <span className="text-[13px] font-medium text-white">45,320 / 100,000</span>
                <span className="text-[12px] text-text-secondary w-10 text-right">45%</span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-elevated overflow-hidden">
              <div className="h-full bg-cta rounded-full" style={{ width: '45.3%' }} />
            </div>
          </div>

          {/* Webhooks Delivered — unlimited */}
          <div className="flex flex-col gap-2">
            <div className="flex items-end justify-between">
              <span className="text-[14px] font-medium text-white">Webhooks Delivered</span>
              <div className="flex items-baseline gap-2">
                <span className="text-[13px] font-medium text-white">2,494</span>
                <span className="text-[12px] text-success font-medium">Unlimited</span>
              </div>
            </div>
            <div className="w-full h-2 rounded-full bg-elevated overflow-hidden flex items-center">
              <div className="h-[2px] w-[30%] bg-success" />
              <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(52,199,89,0.6)] shrink-0" />
              <div className="h-px flex-1 border-t border-dashed border-success/40" />
            </div>
          </div>
        </div>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-surface rounded-xl border border-border w-full max-w-[480px] p-6 flex flex-col gap-5 shadow-elevated">
            <div className="flex items-center justify-between">
              <h3 className="text-[18px] font-semibold text-white">{step === 1 ? 'Create API Key' : 'Key Created'}</h3>
              <button onClick={closeModal} className="text-text-secondary hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {step === 1 ? (
              <>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em] block mb-1.5">Key Name</label>
                    <input value={newKeyName} onChange={e => setNewKeyName(e.target.value)} placeholder="e.g. Production Backend" className="w-full h-10 px-3 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors" />
                  </div>
                  <div>
                    <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em] block mb-1.5">Environment</label>
                    <div className="flex gap-2">
                      {['Test', 'Live'].map(env => (
                        <button key={env} onClick={() => setNewKeyEnv(env)} className={`h-9 px-4 rounded-md border text-[14px] font-medium transition-colors ${newKeyEnv === env ? 'border-cta bg-cta/10 text-cta' : 'border-border text-text-secondary hover:border-border/80 hover:text-white'}`}>
                          {env}
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Permissions and expiry deferred — backend only supports name + mode */}
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={closeModal} className="h-9 px-4 rounded-md border border-border text-[14px] text-white hover:bg-elevated transition-colors">Cancel</button>
                  <button onClick={createKey} disabled={!newKeyName.trim()} className="h-9 px-4 bg-cta hover:bg-cta/90 text-white text-[14px] font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed">Create</button>
                </div>
              </>
            ) : (
              <>
                <div className="bg-warning/10 border border-warning/20 rounded-md p-4 flex items-start gap-3">
                  <span className="text-warning text-[20px]">⚠</span>
                  <p className="text-[13px] text-warning leading-relaxed">This is the only time your API key will be shown. Copy it now and store it securely.</p>
                </div>
                <div className="bg-elevated rounded-md p-3 flex items-center gap-2">
                  <span className="font-mono text-[13px] text-white flex-1 truncate">{generatedKey}</span>
                  <button onClick={() => copyKey(generatedKey, '__generated__')} className="text-text-secondary hover:text-white transition-colors shrink-0">
                    {copied === '__generated__' ? <CheckCircle className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {/* Permissions/expiry summary removed — not supported by backend */}
                <button onClick={closeModal} className="h-9 px-4 bg-surface border border-border hover:bg-elevated text-white text-[14px] font-medium rounded-md transition-colors">
                  Done
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
