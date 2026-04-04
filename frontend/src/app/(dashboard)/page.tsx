'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import {
  Calendar, ArrowUpRight, ArrowDownRight, XCircle, ShieldCheck,
  ChevronRight, Inbox, AlertTriangle, ArrowRight, Eye, RefreshCw, Clock
} from 'lucide-react'
import { api } from '../../lib/api'
import type { Verification } from '../../types/api'

// ---------------------------------------------------------------------------
// CountUp
// ---------------------------------------------------------------------------

function CountUp({ end, duration = 800 }: { end: number; duration?: number }) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let start: number | null = null
    let rafId: number
    const step = (timestamp: number) => {
      if (!start) start = timestamp
      const progress = Math.min((timestamp - start) / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      setValue(Math.floor(easeOut * end))
      if (progress < 1) {
        rafId = requestAnimationFrame(step)
      } else {
        setValue(end)
      }
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
  }, [end, duration])

  return <>{value.toLocaleString()}</>
}

// ---------------------------------------------------------------------------
// KPI Card
// ---------------------------------------------------------------------------

function KPICard({
  label,
  value,
  prefix = '',
  suffix = '',
  delta,
  isPositive,
  trendData,
  color = '#0066FF',
}: {
  label: string
  value: number
  prefix?: string
  suffix?: string
  delta: string
  isPositive: boolean
  trendData: { name: string; value: number }[]
  color?: string
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-2">
      <div className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">{label}</div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-[36px] font-bold text-white leading-none mb-1">
            {prefix}<CountUp end={value} />{suffix}
          </div>
          <div className="flex items-center gap-1">
            {isPositive ? (
              <ArrowUpRight className="w-[14px] h-[14px] text-success" />
            ) : (
              <ArrowDownRight className="w-[14px] h-[14px] text-error" />
            )}
            <span className={`text-[14px] font-normal ${isPositive ? 'text-success' : 'text-error'}`}>
              {delta}%
            </span>
          </div>
        </div>
        <div className="w-[80px] h-[24px] shrink-0">
          {mounted && (
            <AreaChart data={trendData} width={80} height={24}>
              <Area type="monotone" dataKey="value" stroke={color} strokeWidth={1.5} fill="none" isAnimationActive={false} />
            </AreaChart>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Volume Chart
// ---------------------------------------------------------------------------

const chartData = [
  { name: 'Mon', value: 890, fullDate: 'Mar 11, 2026' },
  { name: 'Tue', value: 1023, fullDate: 'Mar 12, 2026' },
  { name: 'Wed', value: 1148, fullDate: 'Mar 13, 2026' },
  { name: 'Thu', value: 1089, fullDate: 'Mar 14, 2026' },
  { name: 'Fri', value: 1201, fullDate: 'Mar 15, 2026' },
  { name: 'Sat', value: 892, fullDate: 'Mar 16, 2026' },
  { name: 'Sun', value: 1247, fullDate: 'Mar 17, 2026' },
]

function CustomTooltip({ active, payload }: { active?: boolean; payload?: { value: number; payload: { fullDate: string } }[] }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-elevated rounded-md p-2.5 px-3.5 shadow-elevated border border-border">
        <div className="text-[11px] font-medium text-text-secondary mb-1">{payload[0]?.payload.fullDate}</div>
        <div className="flex items-baseline gap-1">
          <span className="text-[18px] font-semibold text-white leading-none">{payload[0]?.value.toLocaleString()}</span>
          <span className="text-[11px] font-normal text-text-secondary">verifications</span>
        </div>
        <div className="text-[11px] font-medium text-success mt-1">+12.3% vs yesterday</div>
      </div>
    )
  }
  return null
}

function VolumeChartCard() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="flex-1 bg-surface rounded-lg p-5 px-6 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[16px] font-semibold text-white">Verification Volume</h3>
        <div className="flex items-center gap-1 bg-elevated/50 p-1 rounded-full border border-border/50">
          <button className="px-3 py-1 bg-cta rounded-full text-[11px] font-semibold text-white">Verifications</button>
          <button className="px-3 py-1 bg-transparent rounded-full text-[11px] font-normal text-text-secondary hover:text-white transition-colors">Success Rate</button>
          <button className="px-3 py-1 bg-transparent rounded-full text-[11px] font-normal text-text-secondary hover:text-white transition-colors">Revenue</button>
        </div>
      </div>
      <div className="w-full h-[240px]">
        {mounted && (
          <ResponsiveContainer width="99%" height={240}>
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0,102,255,0.22)" />
                  <stop offset="100%" stopColor="rgba(0,102,255,0.0)" />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#242438" strokeDasharray="3 3" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8E8E93', fontWeight: 400 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#8E8E93', fontWeight: 400 }} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(0,102,255,0.4)', strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Area type="monotone" dataKey="value" stroke="#0066FF" strokeWidth={2} fill="url(#colorValue)" activeDot={{ r: 4, fill: '#0066FF', stroke: '#FFFFFF', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Live Activity
// ---------------------------------------------------------------------------

const mockActivity = [
  { status: 'verified', did: 'did:solidus:mainnet:4f2e1a8b3c7d9e0f', type: 'KYC L2' },
  { status: 'pending', did: 'did:solidus:mainnet:2c9d4f1e8a7b3c6d', type: 'Email' },
  { status: 'verified', did: 'did:solidus:mainnet:b8a3f6c2e9d1047e', type: 'Phone' },
  { status: 'failed', did: 'did:solidus:mainnet:7a3b8c9d2e1f4a6b', type: 'KYC L3' },
  { status: 'verified', did: 'did:solidus:mainnet:4f2e1a8b3c7d9e0f', type: 'KYC L1' },
  { status: 'verified', did: 'did:solidus:mainnet:2c9d4f1e8a7b3c6d', type: 'Email' },
  { status: 'pending', did: 'did:solidus:mainnet:b8a3f6c2e9d1047e', type: 'KYC L2' },
  { status: 'verified', did: 'did:solidus:mainnet:7a3b8c9d2e1f4a6b', type: 'Phone' },
]

function LiveStreamPanel() {
  const [items, setItems] = useState(() => mockActivity.map((a, i) => ({ ...a, id: `init-${i}` })))

  useEffect(() => {
    let counter = 0
    const interval = setInterval(() => {
      setItems((prev) => {
        const pick = mockActivity[Math.floor(Math.random() * mockActivity.length)]!
        return [{ ...pick, id: `stream-${counter++}` }, ...prev].slice(0, 8)
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full lg:w-[260px] bg-surface rounded-lg flex flex-col shrink-0">
      <div className="py-4 px-5 flex items-center justify-between border-b border-border">
        <h3 className="text-[14px] font-semibold text-white">Live Activity</h3>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          <span className="text-[11px] font-normal text-text-secondary">Real-time</span>
        </div>
      </div>
      <div className="flex-1 overflow-hidden flex flex-col min-h-[280px]">
        <div className="flex-1 overflow-hidden">
          {items.map((item) => (
            <div key={item.id} className="px-4 py-2.5 flex items-center gap-2 border-b border-elevated last:border-0 hover:bg-elevated/30 transition-colors">
              <div className={`w-2 h-2 rounded-full shrink-0 ${item.status === 'verified' ? 'bg-success' : item.status === 'pending' ? 'bg-warning' : 'bg-error'}`} />
              <div className="flex-1 min-w-0 flex flex-col">
                <span className="font-mono text-[11px] font-normal text-text-secondary truncate">{item.did.slice(0, 22)}...</span>
                <span className="text-[11px] font-medium text-white">{item.type}</span>
              </div>
              <span className="text-[11px] font-normal text-text-disabled shrink-0">just now</span>
            </div>
          ))}
        </div>
        <div className="py-3 px-4 border-t border-border text-center mt-auto bg-surface shrink-0">
          <span className="text-[11px] font-normal text-text-disabled">1,247 verifications today</span>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Webhook Delivery Panel
// ---------------------------------------------------------------------------

const webhookLogs = [
  { event: 'kyc.completed', endpoint: 'api.acmecorp.com/hook', status: 'Delivered', code: '200', latency: '89ms', time: 'just now', color: '#34C759' },
  { event: 'credential.issued', endpoint: 'api.acmecorp.com/hook', status: 'Delivered', code: '200', latency: '142ms', time: '1m ago', color: '#00D4FF' },
  { event: 'kyc.failed', endpoint: 'webhook-prod.acmecorp.com/events', status: 'Failed', code: '500', latency: '—', time: '3m ago', color: '#FF3B30' },
  { event: 'kyc.completed', endpoint: 'api.acmecorp.com/hook', status: 'Delivered', code: '200', latency: '97ms', time: '5m ago', color: '#34C759' },
  { event: 'kyc.pending', endpoint: 'api.acmecorp.com/hook', status: 'Delivered', code: '200', latency: '61ms', time: '8m ago', color: '#FF9500' },
]

function WebhookDeliveryPanel() {
  const [failing, setFailing] = useState(false)

  return (
    <div className="bg-surface rounded-lg mt-4 flex flex-col">
      <div className="p-5 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[16px] font-semibold text-white">Webhook Delivery</span>
          <button
            onClick={() => setFailing(!failing)}
            className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-medium transition-colors ${failing ? 'bg-warning/12 border-warning/25 text-warning' : 'bg-success/12 border-success/25 text-success'}`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${failing ? 'bg-warning' : 'bg-success'}`} />
            {failing ? '1 Endpoint Failing' : 'All Healthy'}
          </button>
        </div>
        <button className="text-[12px] font-normal text-cta hover:underline">View All →</button>
      </div>
      <div className="px-6 pb-2">
        <div className="flex items-center py-2.5">
          <div className="text-[12px] font-medium text-white pr-5">2,494 delivered today</div>
          <div className="w-px h-4 bg-border" />
          <div className="text-[12px] font-medium text-success px-5">99.7% success rate</div>
          <div className="w-px h-4 bg-border" />
          <div className="text-[12px] font-medium text-white pl-5">avg 142ms</div>
        </div>
      </div>
      {failing && (
        <div className="bg-warning/10 border-b border-warning/20 py-2 px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-warning" />
            <span className="text-[12px] font-normal text-warning">webhook-prod.example.com returning 500 · last success 14 min ago</span>
          </div>
          <button className="text-[12px] font-medium text-warning hover:underline">Retry All Failed</button>
        </div>
      )}
      <table className="w-full text-left border-collapse">
        <tbody>
          {webhookLogs.map((log, i) => (
            <tr key={i} className="h-9 hover:bg-cta/5 transition-colors border-t border-border/50">
              <td className="pl-6 w-[180px]">
                <span
                  className="inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-medium"
                  style={{ backgroundColor: `${log.color}1e`, borderColor: `${log.color}40`, color: log.color }}
                >
                  {log.event}
                </span>
              </td>
              <td className="font-mono text-[12px] font-normal text-text-secondary">{log.endpoint}</td>
              <td className="w-[100px]">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${log.status === 'Delivered' ? 'bg-success' : 'bg-error'}`} />
                  <span className="text-[12px] font-normal text-white">{log.status}</span>
                </div>
              </td>
              <td className="font-mono text-[12px] w-[60px]">
                <span className={log.code === '200' ? 'text-success' : 'text-error'}>{log.code}</span>
              </td>
              <td className="text-[12px] font-normal text-text-secondary w-[70px]">{log.latency}</td>
              <td className="text-[12px] font-normal text-text-disabled w-[80px]">{log.time}</td>
              <td className="pr-6 w-[60px] text-right">
                {log.status === 'Failed' && (
                  <button className="text-[11px] font-medium text-cta hover:text-cta/80 transition-colors">Retry</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="p-3 px-6 border-t border-border flex items-center justify-between">
        <span className="text-[12px] font-normal text-text-disabled">3 endpoints configured</span>
        <button className="text-[12px] font-normal text-cta hover:underline">Configure Webhooks →</button>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Status Badge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: string }) {
  const s = status.toLowerCase()
  if (s === 'verified') return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-success/15 border border-success/30 text-[11px] font-medium text-success"><ShieldCheck className="w-3 h-3" /> Verified</span>
  if (s === 'pending') return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-warning/15 border border-warning/30 text-[11px] font-medium text-warning"><Clock className="w-3 h-3" /> Pending</span>
  if (s === 'failed') return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-error/15 border border-error/30 text-[11px] font-medium text-error"><XCircle className="w-3 h-3" /> Failed</span>
  if (s === 'processing') return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-cta/15 border border-cta/30 text-[11px] font-medium text-cta"><RefreshCw className="w-3 h-3 animate-spin" /> Processing</span>
  return <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-border/30 border border-border text-[11px] font-medium text-text-secondary">{status}</span>
}

// ---------------------------------------------------------------------------
// Recent Verifications
// ---------------------------------------------------------------------------

function RecentVerificationsTable() {
  const router = useRouter()
  const [rows, setRows] = useState<Array<{
    id: string; did: string; type: string; status: string;
    country: string; duration: string; time: string
  }>>([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    api.get<{ data: Verification[], total: number }>('/v1/dashboard/verifications?limit=8')
      .then((res) => {
        setTotal(res.total)
        setRows(res.data.map((v) => ({
          id: v.id,
          did: v.subjectDid ?? '—',
          type: v.level === 1 ? 'KYC L1' : v.level === 2 ? 'KYC L2' : 'KYC L3',
          status: v.status.charAt(0).toUpperCase() + v.status.slice(1),
          country: '—',
          duration: '—',
          time: new Date(v.createdAt).toISOString().replace('T', ' ').slice(0, 16),
        })))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-surface rounded-lg mt-4 flex flex-col overflow-hidden">
      <div className="p-5 px-6 flex items-center justify-between">
        <h3 className="text-[22px] font-semibold text-white">Recent Verifications</h3>
        <button onClick={() => router.push('/verifications')} className="text-[14px] font-normal text-cta hover:underline">
          View All →
        </button>
      </div>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-elevated border-y border-border">
              <th className="py-3 px-6 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">DID</th>
              <th className="py-3 px-6 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Type</th>
              <th className="py-3 px-6 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Status</th>
              <th className="py-3 px-6 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Country</th>
              <th className="py-3 px-6 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Duration</th>
              <th className="py-3 px-6 text-[12px] font-medium text-text-secondary tracking-[0.04em] uppercase">Timestamp</th>
              <th className="py-3 px-6 w-12"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-10 text-center">
                  <RefreshCw className="w-5 h-5 text-text-secondary animate-spin mx-auto" />
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-[13px] font-normal text-text-secondary">No verifications yet</td>
              </tr>
            ) : (
              rows.map((r) => (
                <tr key={r.id} className="border-b border-border hover:bg-elevated transition-colors duration-150 group cursor-pointer" onClick={() => router.push('/verifications/' + r.id)}>
                  <td className="py-3 px-6 font-mono text-[13px] font-normal text-white">{r.did.substring(0, 18)}...</td>
                  <td className="py-3 px-6 text-[12px] font-medium text-text-secondary">{r.type}</td>
                  <td className="py-3 px-6"><StatusBadge status={r.status} /></td>
                  <td className="py-3 px-6 text-[12px] font-normal text-text-secondary">{r.country}</td>
                  <td className="py-3 px-6 text-[12px] font-normal text-text-secondary">{r.duration}</td>
                  <td className="py-3 px-6 font-mono text-[12px] font-normal text-text-secondary">{r.time}</td>
                  <td className="py-3 px-6 text-right">
                    <button className="text-text-secondary hover:text-white transition-colors p-1 rounded-md hover:bg-border/50 opacity-0 group-hover:opacity-100">
                      <Eye className="w-[18px] h-[18px]" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 px-6 flex items-center justify-between border-t border-border">
        <span className="text-[12px] font-normal text-text-secondary">Showing 1–{rows.length} of {total.toLocaleString()}</span>
        <div className="flex items-center gap-2">
          <button disabled className="h-8 px-3 border border-border rounded-md text-[12px] font-normal text-text-disabled cursor-not-allowed">Previous</button>
          <button className="h-8 px-3 border border-border rounded-md text-[12px] font-normal text-white hover:bg-elevated transition-colors">Next</button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Dashboard Page
// ---------------------------------------------------------------------------

const upTrend = [{ name: '1', value: 10 }, { name: '2', value: 15 }, { name: '3', value: 18 }, { name: '4', value: 25 }, { name: '5', value: 30 }, { name: '6', value: 45 }, { name: '7', value: 50 }, { name: '8', value: 65 }, { name: '9', value: 85 }]
const steepUpTrend = [{ name: '1', value: 5 }, { name: '2', value: 8 }, { name: '3', value: 12 }, { name: '4', value: 20 }, { name: '5', value: 35 }, { name: '6', value: 60 }, { name: '7', value: 95 }, { name: '8', value: 140 }, { name: '9', value: 200 }]
const flatTrend = [{ name: '1', value: 40 }, { name: '2', value: 42 }, { name: '3', value: 38 }, { name: '4', value: 40 }, { name: '5', value: 41 }, { name: '6', value: 39 }, { name: '7', value: 40 }, { name: '8', value: 42 }, { name: '9', value: 40 }]
const flatHighTrend = [{ name: '1', value: 96 }, { name: '2', value: 97 }, { name: '3', value: 96.5 }, { name: '4', value: 97.2 }, { name: '5', value: 97 }, { name: '6', value: 97.5 }, { name: '7', value: 97.1 }, { name: '8', value: 97.3 }, { name: '9', value: 97.2 }]

interface DashboardStats {
  total: number
  today: number
  pending: number
  completed: number
  failed: number
  successRate: number
  activeKeys: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)

  useEffect(() => {
    api.get<DashboardStats>('/v1/dashboard/stats')
      .then(setStats)
      .catch(() => {})
  }, [])

  return (
    <div className="w-full flex flex-col">
      {/* Sandbox Banner */}
      <div className="w-full bg-warning/10 border-b border-warning/20 py-2.5 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 2v7.31" /><path d="M14 9.3V1.99" /><path d="M8.5 2h7" /><path d="M14 9.3a6.5 6.5 0 1 1-4 0" /><path d="M5.52 16h12.96" />
          </svg>
          <span className="text-[14px] font-normal text-warning">You are in Sandbox mode — all data is simulated.</span>
        </div>
        <button className="text-[12px] font-medium text-warning hover:underline">Switch to Production →</button>
      </div>

      <div className="p-8 pb-12 max-w-[1200px] mx-auto w-full flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-[28px] font-semibold text-white leading-none">Dashboard</h2>
          <div className="flex items-center gap-3">
            <div className="h-9 px-3 flex items-center gap-2 bg-elevated border border-border rounded-md">
              <Calendar className="w-4 h-4 text-text-secondary" />
              <span className="text-[14px] font-normal text-white">Last 7 days</span>
            </div>
            <button className="h-9 px-4 bg-cta hover:bg-cta/90 text-white text-[14px] font-medium rounded-md transition-colors shadow-brand">
              New Verification
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard label="Verifications Today" value={stats?.today ?? 0} delta="—" isPositive={true} trendData={upTrend} />
          <KPICard label="Pending Review" value={stats?.pending ?? 0} delta="—" isPositive={true} trendData={flatTrend} />
          <KPICard label="Success Rate" value={stats?.successRate ?? 0} suffix="%" delta="—" isPositive={true} trendData={flatHighTrend} />
          <KPICard label="Total Verifications" value={stats?.total ?? 0} delta="—" isPositive={true} trendData={steepUpTrend} />
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mt-4 h-auto lg:h-[340px]">
          <VolumeChartCard />
          <LiveStreamPanel />
        </div>

        <WebhookDeliveryPanel />

        {/* Cases Awaiting Review */}
        <div className="bg-surface rounded-lg mt-4 border border-warning/25 border-l-[4px] border-l-warning p-5 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
              <Inbox className="w-5 h-5 text-warning" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <h3 className="text-[16px] font-semibold text-white leading-none">Cases Awaiting Review</h3>
                <div className="h-5 px-2 rounded-full bg-warning/15 border border-warning/30 flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-warning">38</span>
                </div>
              </div>
              <p className="text-[12px] font-normal text-text-secondary leading-none">Oldest waiting: 2h 14m · SLA: 4h per case</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-error" />
              <span className="text-[12px] font-medium text-error">6 cases at SLA risk</span>
            </div>
            <button className="h-9 px-4 rounded-md bg-warning/10 border border-warning/30 flex items-center gap-1.5 hover:bg-warning/20 transition-colors">
              <span className="text-[14px] font-semibold text-warning">Go to Cases</span>
              <ArrowRight className="w-3.5 h-3.5 text-warning" />
            </button>
          </div>
        </div>

        <RecentVerificationsTable />
      </div>
    </div>
  )
}
