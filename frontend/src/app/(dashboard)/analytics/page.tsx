'use client'

import React, { useState, useEffect } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, ReferenceLine, PieChart, Pie, Cell,
} from 'recharts'
import {
  TrendingUp, TrendingDown, ArrowDown, CalendarDays, Shield,
  Plus, Trash2, X, MapPin, AlertTriangle, ShieldAlert,
} from 'lucide-react'

// ---------------------------------------------------------------------------
// Static Data
// ---------------------------------------------------------------------------

// 30-day volume data
const volumeData = (() => {
  const base = [
    312, 287, 334, 298, 319, 241, 228, 345, 367, 298,
    312, 356, 378, 301, 289, 354, 367, 342, 298, 319,
    334, 287, 356, 378, 301, 289, 367, 342, 319, 334,
  ]
  return base.map((v, i) => {
    const date = new Date(2026, 1, 22 + i) // Feb 22 + i
    const label = `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`
    const successful = Math.round(v * (0.91 + Math.random() * 0.07))
    return { date: label, verifications: v, successful }
  })
})()

// 30-day fraud trend
const fraudTrendData = (() => {
  const vals = [
    4.1, 3.9, 4.3, 3.8, 4.2, 3.7, 4.5, 4.0, 3.8, 4.1,
    3.9, 4.4, 4.6, 3.8, 3.7, 4.0, 4.2, 3.9, 4.1, 3.8,
    4.3, 4.0, 3.9, 4.2, 3.8, 4.1, 4.4, 4.0, 3.9, 4.1,
  ]
  return vals.map((v, i) => {
    const date = new Date(2026, 1, 22 + i)
    const label = `${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`
    return { date: label, rate: v }
  })
})()

// KPI sparkline trends
const kpiSparklines = {
  verifications: [
    { v: 28000 }, { v: 31200 }, { v: 29800 }, { v: 33400 }, { v: 36100 },
    { v: 35000 }, { v: 38700 }, { v: 41200 }, { v: 43800 }, { v: 48241 },
  ],
  approvalRate: [
    { v: 92.1 }, { v: 92.8 }, { v: 93.0 }, { v: 93.4 }, { v: 93.8 },
    { v: 93.5 }, { v: 94.0 }, { v: 93.9 }, { v: 94.2 }, { v: 94.3 },
  ],
  processing: [
    { v: 3.1 }, { v: 2.9 }, { v: 2.8 }, { v: 2.7 }, { v: 2.6 },
    { v: 2.7 }, { v: 2.5 }, { v: 2.6 }, { v: 2.5 }, { v: 2.4 },
  ],
  revenue: [
    { v: 8200 }, { v: 9800 }, { v: 11200 }, { v: 13400 }, { v: 14900 },
    { v: 16200 }, { v: 17800 }, { v: 19400 }, { v: 21100 }, { v: 22380 },
  ],
}

const funnelStages = [
  { label: 'Session Started', count: 48241, pct: 100, drop: null },
  { label: 'Document Uploaded', count: 45628, pct: 94.6, drop: '-2.6%' },
  { label: 'Document Verified', count: 43847, pct: 90.9, drop: '-4.1%' },
  { label: 'Liveness Passed', count: 42980, pct: 89.1, drop: '-3.5%' },
  { label: 'Credential Issued', count: 45502, pct: 94.3, drop: null },
]

const pieData = [
  { name: 'KYC L1', value: 35, count: 16884 },
  { name: 'KYC L2', value: 45, count: 21708 },
  { name: 'KYC L3', value: 12, count: 5789 },
  { name: 'Address', value: 8, count: 3859 },
]
const PIE_COLORS = ['#0066FF', '#00D4FF', '#A8E600', '#FF9500']

const countryData = [
  { flag: '🇺🇸', name: 'United States', count: 14821, pct: 30.7 },
  { flag: '🇩🇪', name: 'Germany', count: 6241, pct: 12.9 },
  { flag: '🇬🇧', name: 'United Kingdom', count: 5180, pct: 10.7 },
  { flag: '🇸🇬', name: 'Singapore', count: 3892, pct: 8.1 },
  { flag: '🇫🇷', name: 'France', count: 3241, pct: 6.7 },
  { flag: '🇯🇵', name: 'Japan', count: 2891, pct: 6.0 },
  { flag: '🇧🇷', name: 'Brazil', count: 2412, pct: 5.0 },
  { flag: '🇦🇺', name: 'Australia', count: 2104, pct: 4.4 },
  { flag: '🇨🇦', name: 'Canada', count: 1892, pct: 3.9 },
  { flag: '🌐', name: 'Others', count: 5567, pct: 11.5 },
]

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Schedule {
  id: string
  title: string
  desc: string
  active: boolean
}

// ---------------------------------------------------------------------------
// KPI Sparkline Card
// ---------------------------------------------------------------------------

function KPISparklineCard({
  label,
  value,
  delta,
  deltaPositive,
  subLabel,
  chartData,
  chartColor,
  chartType,
}: {
  label: string
  value: string
  delta: string
  deltaPositive: boolean
  subLabel: string
  chartData: { v: number }[]
  chartColor: string
  chartType: 'area' | 'line' | 'bar'
}) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="bg-elevated rounded-lg p-4 flex flex-col gap-2 relative overflow-hidden">
      <div className="flex items-start justify-between">
        <span className="text-[11px] font-medium text-text-secondary uppercase tracking-[0.05em]">{label}</span>
        {deltaPositive ? (
          <TrendingUp className="w-4 h-4 text-success shrink-0" />
        ) : (
          <TrendingDown className="w-4 h-4 text-success shrink-0" />
        )}
      </div>
      <div className="text-[28px] font-bold text-text-primary leading-none">{value}</div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {deltaPositive ? (
            <TrendingUp className="w-3.5 h-3.5 text-success" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5 text-success" />
          )}
          <span className="text-[12px] font-medium text-success">{delta}</span>
          <span className="text-[11px] font-normal text-text-disabled">{subLabel}</span>
        </div>
      </div>
      <div className="h-[36px] w-full mt-1">
        {mounted && chartType !== 'bar' && (
          <ResponsiveContainer width="100%" height={36}>
            <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id={`spark-${label.replace(/\s/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.25} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="v"
                stroke={chartColor}
                strokeWidth={1.5}
                fill={chartType === 'area' ? `url(#spark-${label.replace(/\s/g, '')})` : 'none'}
                isAnimationActive={false}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
        {mounted && chartType === 'bar' && (
          <ResponsiveContainer width="100%" height={36}>
            <AreaChart data={chartData} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="spark-bar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={chartColor} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={chartColor} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                type="stepAfter"
                dataKey="v"
                stroke={chartColor}
                strokeWidth={1.5}
                fill="url(#spark-bar)"
                isAnimationActive={false}
                dot={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Verification Volume Chart
// ---------------------------------------------------------------------------

function VolumeTooltip({ active, payload }: { active?: boolean; payload?: { value: number; name: string; payload: { date: string } }[] }) {
  if (!active || !payload || !payload.length) return null
  const verifs = payload.find(p => p.name === 'verifications')
  const succ = payload.find(p => p.name === 'successful')
  return (
    <div className="bg-elevated rounded-md p-2.5 px-3.5 shadow-elevated border border-border">
      <div className="text-[11px] font-medium text-text-secondary mb-1.5">{payload[0]?.payload.date}</div>
      {verifs && (
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-2 h-2 rounded-full bg-cta" />
          <span className="text-[12px] font-normal text-text-secondary">Total</span>
          <span className="text-[13px] font-semibold text-text-primary ml-auto pl-4">{verifs.value.toLocaleString()}</span>
        </div>
      )}
      {succ && (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-[12px] font-normal text-text-secondary">Successful</span>
          <span className="text-[13px] font-semibold text-success ml-auto pl-4">{succ.value.toLocaleString()}</span>
        </div>
      )}
    </div>
  )
}

function VolumeChartSection() {
  const [mounted, setMounted] = useState(false)
  const [activeMetric, setActiveMetric] = useState<'Verifications' | 'Success Rate' | 'Revenue'>('Verifications')
  useEffect(() => setMounted(true), [])

  return (
    <div className="bg-surface rounded-lg p-5 px-6 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-[16px] font-semibold text-text-primary">Verification Volume</h3>
        <div className="flex items-center gap-1 bg-elevated p-1 rounded-full border border-border">
          {(['Verifications', 'Success Rate', 'Revenue'] as const).map(m => (
            <button
              key={m}
              onClick={() => setActiveMetric(m)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium transition-colors ${
                activeMetric === m
                  ? 'bg-cta text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-[260px]">
        {mounted && (
          <ResponsiveContainer width="99%" height={260}>
            <AreaChart data={volumeData} margin={{ top: 10, right: 0, left: -16, bottom: 0 }}>
              <defs>
                <linearGradient id="volBlue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0066FF" stopOpacity={0.22} />
                  <stop offset="100%" stopColor="#0066FF" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#8E8E93' }}
                dy={8}
                interval={4}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#8E8E93' }}
              />
              <Tooltip content={<VolumeTooltip />} cursor={{ stroke: 'rgba(0,102,255,0.3)', strokeWidth: 1, strokeDasharray: '3 3' }} />
              <Area
                type="monotone"
                dataKey="verifications"
                stroke="#0066FF"
                strokeWidth={2}
                fill="url(#volBlue)"
                isAnimationActive={false}
                dot={false}
                activeDot={{ r: 4, fill: '#0066FF', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
              <Area
                type="monotone"
                dataKey="successful"
                stroke="#34C759"
                strokeWidth={1.5}
                fill="none"
                isAnimationActive={false}
                dot={false}
                activeDot={{ r: 3, fill: '#34C759', stroke: '#FFFFFF', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-cta rounded-full" />
          <span className="text-[11px] font-normal text-text-secondary">Total Verifications</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-0.5 bg-success rounded-full" />
          <span className="text-[11px] font-normal text-text-secondary">Successful</span>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Verification Funnel
// ---------------------------------------------------------------------------

function FunnelSection() {
  return (
    <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-4">
      <h3 className="text-[16px] font-semibold text-text-primary">Verification Funnel</h3>
      <div className="flex flex-col gap-3">
        {funnelStages.map((stage, i) => (
          <div key={i} className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-text-primary">{stage.label}</span>
                {stage.drop && (
                  <span className="text-[11px] font-normal text-error">{stage.drop}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-normal text-text-secondary">{stage.count.toLocaleString()}</span>
                <span className="text-[12px] font-semibold text-text-primary w-[44px] text-right">{stage.pct}%</span>
              </div>
            </div>
            <div className="h-2 w-full bg-elevated rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${stage.pct}%`,
                  backgroundColor: stage.pct >= 95 ? '#34C759' : stage.pct >= 90 ? '#0066FF' : '#FF9500',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Pie Chart — By Verification Type
// ---------------------------------------------------------------------------

function PieTooltipContent({ active, payload }: { active?: boolean; payload?: { name: string; value: number; payload: { count: number } }[] }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="bg-elevated rounded-md p-2.5 px-3.5 shadow-elevated border border-border">
      <div className="text-[12px] font-semibold text-text-primary">{payload[0]?.name}</div>
      <div className="text-[11px] text-text-secondary">{payload[0]?.payload.count.toLocaleString()} verifications</div>
      <div className="text-[11px] font-medium text-cta">{payload[0]?.value}%</div>
    </div>
  )
}

function ByTypeSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  return (
    <div className="flex-[6] bg-surface rounded-lg p-5 px-6 flex flex-col gap-4 min-w-0">
      <h3 className="text-[16px] font-semibold text-text-primary">By Verification Type</h3>
      <div className="flex items-center gap-6">
        <div className="relative w-[160px] h-[160px] shrink-0">
          {mounted && (
            <PieChart width={160} height={160}>
              <Pie
                data={pieData}
                cx={75}
                cy={75}
                innerRadius={48}
                outerRadius={72}
                dataKey="value"
                paddingAngle={2}
                isAnimationActive={false}
              >
                {pieData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<PieTooltipContent />} />
            </PieChart>
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[18px] font-bold text-text-primary leading-none">48,241</span>
            <span className="text-[10px] font-normal text-text-secondary mt-0.5">Total</span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 flex-1 min-w-0">
          {pieData.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: PIE_COLORS[i] }} />
              <span className="text-[12px] font-normal text-text-primary flex-1 min-w-0 truncate">{item.name}</span>
              <span className="text-[12px] font-normal text-text-secondary shrink-0">{item.count.toLocaleString()}</span>
              <span className="text-[12px] font-semibold text-text-primary w-[36px] text-right shrink-0">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Cost Savings
// ---------------------------------------------------------------------------

function CostSavingsSection() {
  return (
    <div className="flex-[4] rounded-lg p-5 flex flex-col gap-4 min-w-0 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, rgba(168,230,0,0.08) 0%, rgba(26,26,46,1) 60%)',
      border: '1px solid rgba(168,230,0,0.25)',
    }}>
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-text-primary">Cost Savings vs Auth0</h3>
        <Shield className="w-4 h-4 text-lime" />
      </div>
      <div>
        <div className="text-[36px] font-bold text-lime leading-none">$22,380</div>
        <div className="text-[12px] font-normal text-text-secondary mt-1">saved this month</div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-normal text-text-secondary">Auth0 estimated</span>
          <span className="text-[13px] font-medium text-error line-through">$23,100</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[12px] font-normal text-text-secondary">Your Solidus cost</span>
          <span className="text-[13px] font-medium text-success">$720</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="h-3 w-full bg-elevated rounded-full overflow-hidden flex">
          <div className="h-full bg-success rounded-l-full" style={{ width: '3.1%' }} />
          <div className="h-full flex-1 bg-error/30 rounded-r-full" />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-normal text-success">Solidus 3.1%</span>
          <span className="text-[10px] font-normal text-error">Auth0 96.9%</span>
        </div>
      </div>
      <p className="text-[10px] font-normal text-text-disabled leading-relaxed">
        Based on 48,241 verifications × Auth0 $0.479 vs Solidus $0.015 effective rate.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Country Map Section
// ---------------------------------------------------------------------------

function CountrySection() {
  const [hoveredUS, setHoveredUS] = useState(false)

  return (
    <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-text-primary">Verifications by Country</h3>
        <span className="text-[11px] font-medium text-text-disabled bg-elevated px-2.5 py-1 rounded-full border border-border">Top 10</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Map placeholder */}
        <div
          className="flex-1 min-h-[220px] rounded-lg bg-elevated border border-border flex flex-col items-center justify-center relative overflow-hidden cursor-pointer"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(0,102,255,0.08) 0%, rgba(26,26,46,1) 70%)',
          }}
          onMouseEnter={() => setHoveredUS(true)}
          onMouseLeave={() => setHoveredUS(false)}
        >
          <MapPin className="w-10 h-10 text-text-disabled mb-2" />
          <span className="text-[13px] font-normal text-text-disabled">Geographic Distribution</span>
          <span className="text-[11px] font-normal text-text-disabled mt-1">Hover for country stats</span>
          {/* US tooltip */}
          {hoveredUS && (
            <div className="absolute top-4 right-4 bg-bg border border-border rounded-lg p-3 shadow-elevated">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[16px]">🇺🇸</span>
                <span className="text-[12px] font-semibold text-text-primary">United States</span>
              </div>
              <div className="text-[11px] text-text-secondary">14,821 verifications</div>
              <div className="text-[11px] font-medium text-cta">30.7% of total</div>
            </div>
          )}
        </div>

        {/* Country list */}
        <div className="flex-1 flex flex-col gap-0 min-w-0">
          {countryData.map((c, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-border/50 last:border-0 hover:bg-elevated/30 rounded px-1 transition-colors">
              <span className="text-[11px] font-medium text-text-disabled w-4 shrink-0">{i + 1}</span>
              <span className="text-[16px] leading-none shrink-0">{c.flag}</span>
              <span className="text-[12px] font-normal text-text-primary flex-1 min-w-0 truncate">{c.name}</span>
              <span className="text-[12px] font-normal text-text-secondary shrink-0">{c.count.toLocaleString()}</span>
              <div className="w-[60px] flex items-center justify-end shrink-0">
                <span className="text-[12px] font-semibold text-text-primary">{c.pct}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Fraud & Risk Detection
// ---------------------------------------------------------------------------

function FraudTooltip({ active, payload }: { active?: boolean; payload?: { value: number; payload: { date: string } }[] }) {
  if (!active || !payload || !payload.length) return null
  return (
    <div className="bg-elevated rounded-md p-2.5 px-3.5 shadow-elevated border border-border">
      <div className="text-[11px] font-medium text-text-secondary mb-0.5">{payload[0]?.payload.date}</div>
      <div className="text-[13px] font-semibold text-warning">{payload[0]?.value}% flag rate</div>
    </div>
  )
}

function FraudSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const metricCards = [
    {
      icon: <AlertTriangle className="w-5 h-5 text-warning" />,
      value: '47',
      label: 'Flagged Sessions',
      meta1: '3.8% flag rate',
      meta2: 'vs. 4.2% industry avg',
      meta2icon: <ArrowDown className="w-3 h-3 text-success" />,
      meta2color: 'text-success',
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-error" />,
      value: '12',
      label: 'Deepfake / Fraud Attempts',
      meta1: '0.1% of verifications',
      meta2: 'Liveness + document',
      meta2color: 'text-text-secondary',
    },
    {
      icon: <Shield className="w-5 h-5 text-cta" />,
      value: '3',
      label: 'Watchlist Matches',
      meta1: 'AML + PEP screening',
      meta2: '0 sanctions matches',
      meta2color: 'text-success',
    },
  ]

  return (
    <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-5">
      <h3 className="text-[16px] font-semibold text-text-primary">Fraud &amp; Risk Detection</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metricCards.map((card, i) => (
          <div key={i} className="bg-elevated rounded-lg p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              {card.icon}
              <span className="text-[11px] font-medium text-text-secondary uppercase tracking-[0.05em]">{card.label}</span>
            </div>
            <div className="text-[36px] font-bold text-text-primary leading-none">{card.value}</div>
            <div className="text-[12px] font-normal text-text-secondary">{card.meta1}</div>
            <div className={`flex items-center gap-1 text-[11px] font-medium ${card.meta2color}`}>
              {card.meta2icon}
              {card.meta2}
            </div>
          </div>
        ))}
      </div>

      {/* Flagged Sessions Trend */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[13px] font-medium text-text-primary">Flagged Sessions %</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 bg-warning rounded-full" />
              <span className="text-[10px] font-normal text-text-secondary">Flag rate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-0.5 border-t-2 border-dashed border-text-secondary" />
              <span className="text-[10px] font-normal text-text-secondary">Industry avg 4.2%</span>
            </div>
          </div>
        </div>
        <div className="h-[100px]">
          {mounted && (
            <ResponsiveContainer width="99%" height={100}>
              <LineChart data={fraudTrendData} margin={{ top: 8, right: 0, left: -20, bottom: 0 }}>
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fill: '#8E8E93' }}
                  interval={6}
                  dy={6}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 9, fill: '#8E8E93' }}
                  domain={[3.0, 5.0]}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip content={<FraudTooltip />} cursor={{ stroke: 'rgba(255,149,0,0.3)', strokeWidth: 1 }} />
                <ReferenceLine y={4.2} stroke="#8E8E93" strokeDasharray="4 4" strokeWidth={1.5} />
                <Line
                  type="monotone"
                  dataKey="rate"
                  stroke="#FF9500"
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                  activeDot={{ r: 4, fill: '#FF9500', stroke: '#FFFFFF', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Scheduled Reports
// ---------------------------------------------------------------------------

const INITIAL_SCHEDULES: Schedule[] = [
  { id: '1', title: 'Weekly KYC Summary', desc: 'Every Monday at 09:00 UTC → PDF', active: true },
  { id: '2', title: 'Monthly Compliance Audit', desc: 'Every 1st at 06:00 UTC → CSV + PDF', active: false },
]

const REPORT_TYPES = ['KYC Summary', 'Compliance Audit Log', 'Fraud & Risk Report', 'Full Export']
const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const TIMES = ['06:00 UTC', '07:00 UTC', '08:00 UTC', '09:00 UTC', '10:00 UTC', '12:00 UTC', '18:00 UTC']

function ScheduledReportsSection() {
  const [schedules, setSchedules] = useState<Schedule[]>(INITIAL_SCHEDULES)
  const [showModal, setShowModal] = useState(false)

  // Form state
  const [reportType, setReportType] = useState<string>(REPORT_TYPES[0] ?? 'KYC Summary')
  const [frequency, setFrequency] = useState<'Daily' | 'Weekly' | 'Monthly'>('Weekly')
  const [dayOfWeek, setDayOfWeek] = useState('Monday')
  const [time, setTime] = useState('09:00 UTC')
  const [formatPDF, setFormatPDF] = useState(true)
  const [formatCSV, setFormatCSV] = useState(false)
  const [email, setEmail] = useState('')

  const handleToggle = (id: string) => {
    setSchedules(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s))
  }

  const handleDelete = (id: string) => {
    setSchedules(prev => prev.filter(s => s.id !== id))
  }

  const handleCreate = () => {
    if (!email) return
    const formats = [formatPDF && 'PDF', formatCSV && 'CSV'].filter(Boolean).join(' + ')
    let desc = ''
    if (frequency === 'Daily') desc = `Every day at ${time} → ${formats}`
    else if (frequency === 'Weekly') desc = `Every ${dayOfWeek} at ${time} → ${formats}`
    else desc = `Every 1st at ${time} → ${formats}`
    const newSchedule: Schedule = {
      id: Date.now().toString(),
      title: reportType,
      desc,
      active: true,
    }
    setSchedules(prev => [...prev, newSchedule])
    setShowModal(false)
    setEmail('')
    setFormatPDF(true)
    setFormatCSV(false)
  }

  const canCreate = !!email && (formatPDF || formatCSV)

  return (
    <div className="bg-surface rounded-lg p-5 px-6 flex flex-col gap-4 relative">
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-semibold text-text-primary">Scheduled Reports</h3>
        <button
          onClick={() => setShowModal(true)}
          className="h-8 px-3 bg-cta hover:bg-cta/90 text-white text-[12px] font-medium rounded-md transition-colors flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Schedule
        </button>
      </div>

      {schedules.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div className="w-12 h-12 rounded-full bg-elevated flex items-center justify-center">
            <CalendarDays className="w-6 h-6 text-text-disabled" />
          </div>
          <h4 className="text-[15px] font-semibold text-text-primary">No scheduled reports</h4>
          <p className="text-[13px] font-normal text-text-secondary">Set up automated reports delivered to your inbox.</p>
          <button
            onClick={() => setShowModal(true)}
            className="text-[13px] font-medium text-cta hover:underline mt-1"
          >
            Add Schedule →
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {schedules.map(schedule => (
            <div key={schedule.id} className="bg-elevated rounded-lg p-4 px-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0">
                <CalendarDays className="w-4 h-4 text-text-secondary shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[13px] font-semibold text-text-primary">{schedule.title}</span>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                      schedule.active
                        ? 'bg-success/12 border-success/25 text-success'
                        : 'bg-border/30 border-border text-text-disabled'
                    }`}>
                      {schedule.active ? 'Active' : 'Paused'}
                    </span>
                  </div>
                  <p className="text-[11px] font-normal text-text-secondary mt-0.5 truncate">{schedule.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleToggle(schedule.id)}
                  className="h-7 px-3 rounded-md border border-border text-[11px] font-medium text-text-secondary hover:text-text-primary hover:bg-border/50 transition-colors"
                >
                  {schedule.active ? 'Pause' : 'Resume'}
                </button>
                <button
                  onClick={() => handleDelete(schedule.id)}
                  className="h-7 w-7 rounded-md border border-border flex items-center justify-center text-text-secondary hover:text-error hover:border-error/30 hover:bg-error/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Schedule Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(10,22,40,0.8)' }}>
          <div className="bg-surface border border-border rounded-xl shadow-elevated w-full max-w-[480px] flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <h4 className="text-[16px] font-semibold text-text-primary">Add Scheduled Report</h4>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-md flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-6 py-5 flex flex-col gap-5">
              {/* Report Type */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Report Type</label>
                <select
                  value={reportType}
                  onChange={e => setReportType(e.target.value)}
                  className="h-9 px-3 bg-elevated border border-border rounded-md text-[13px] font-normal text-text-primary outline-none focus:border-cta transition-colors appearance-none"
                >
                  {REPORT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Frequency */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Frequency</label>
                <div className="flex items-center gap-1 bg-elevated p-1 rounded-lg border border-border">
                  {(['Daily', 'Weekly', 'Monthly'] as const).map(f => (
                    <button
                      key={f}
                      onClick={() => setFrequency(f)}
                      className={`flex-1 py-1.5 rounded-md text-[12px] font-medium transition-colors ${
                        frequency === f
                          ? 'bg-cta text-white'
                          : 'text-text-secondary hover:text-text-primary'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Weekly options */}
              {frequency === 'Weekly' && (
                <div className="flex items-center gap-3">
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Day</label>
                    <select
                      value={dayOfWeek}
                      onChange={e => setDayOfWeek(e.target.value)}
                      className="h-9 px-3 bg-elevated border border-border rounded-md text-[13px] font-normal text-text-primary outline-none focus:border-cta transition-colors appearance-none"
                    >
                      {DAYS_OF_WEEK.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Time</label>
                    <select
                      value={time}
                      onChange={e => setTime(e.target.value)}
                      className="h-9 px-3 bg-elevated border border-border rounded-md text-[13px] font-normal text-text-primary outline-none focus:border-cta transition-colors appearance-none"
                    >
                      {TIMES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Format */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Format</label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formatPDF}
                      onChange={e => setFormatPDF(e.target.checked)}
                      className="w-4 h-4 accent-cta rounded"
                    />
                    <span className="text-[13px] font-normal text-text-primary">PDF</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formatCSV}
                      onChange={e => setFormatCSV(e.target.checked)}
                      className="w-4 h-4 accent-cta rounded"
                    />
                    <span className="text-[13px] font-normal text-text-primary">CSV</span>
                  </label>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Email Recipient</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="reports@yourcompany.com"
                  className="h-9 px-3 bg-elevated border border-border rounded-md text-[13px] font-normal text-text-primary placeholder:text-text-disabled outline-none focus:border-cta transition-colors"
                />
              </div>
            </div>
            <div className="px-6 pb-5 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="h-9 px-4 rounded-md border border-border text-[13px] font-medium text-text-secondary hover:text-text-primary hover:bg-elevated transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreate}
                disabled={!canCreate}
                className={`h-9 px-4 rounded-md text-[13px] font-medium transition-colors ${
                  canCreate
                    ? 'bg-cta hover:bg-cta/90 text-white'
                    : 'bg-elevated text-text-disabled cursor-not-allowed border border-border'
                }`}
              >
                Create Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Analytics Page
// ---------------------------------------------------------------------------

export default function AnalyticsPage() {
  return (
    <div className="p-6 flex flex-col gap-4 max-w-[1200px] mx-auto w-full">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-[28px] font-semibold text-text-primary leading-none">Analytics</h2>
        <div className="flex items-center gap-2 h-9 px-3 bg-elevated border border-border rounded-md">
          <CalendarDays className="w-4 h-4 text-text-secondary" />
          <span className="text-[13px] font-normal text-text-primary">Last 30 days</span>
        </div>
      </div>

      {/* Section 1: KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPISparklineCard
          label="Total Verifications"
          value="48,241"
          delta="+12.4%"
          deltaPositive={true}
          subLabel="vs last month"
          chartData={kpiSparklines.verifications}
          chartColor="#0066FF"
          chartType="area"
        />
        <KPISparklineCard
          label="Approval Rate"
          value="94.3%"
          delta="+0.8%"
          deltaPositive={true}
          subLabel="vs last month"
          chartData={kpiSparklines.approvalRate}
          chartColor="#34C759"
          chartType="line"
        />
        <KPISparklineCard
          label="Avg Processing"
          value="2.4s"
          delta="-0.3s"
          deltaPositive={true}
          subLabel="vs last month"
          chartData={kpiSparklines.processing}
          chartColor="#00D4FF"
          chartType="line"
        />
        <KPISparklineCard
          label="Revenue Saved"
          value="$22,380"
          delta="96.9%"
          deltaPositive={true}
          subLabel="vs Auth0"
          chartData={kpiSparklines.revenue}
          chartColor="#A8E600"
          chartType="bar"
        />
      </div>

      {/* Section 2 + 3: Funnel and Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4">
        <FunnelSection />
        <VolumeChartSection />
      </div>

      {/* Section 4: Pie + Cost Savings */}
      <div className="flex flex-col lg:flex-row gap-4">
        <ByTypeSection />
        <CostSavingsSection />
      </div>

      {/* Section 5: Countries */}
      <CountrySection />

      {/* Section 6: Fraud & Risk */}
      <FraudSection />

      {/* Section 7: Scheduled Reports */}
      <ScheduledReportsSection />
    </div>
  )
}
