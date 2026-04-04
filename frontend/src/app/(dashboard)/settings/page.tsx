'use client'

import React, { useState } from 'react'
import {
  Building2, Shield, Bell, FileCheck, Globe, Plug, Settings2, AlertTriangle,
  Smartphone, Monitor, MonitorSmartphone, ChevronDown, ChevronRight,
  Check, CheckCircle, XCircle, AlertCircle, Plus, Search, Download,
  X, Eye, EyeOff
} from 'lucide-react'
import { useAuth } from '../../../lib/auth'
import { api, ApiError } from '../../../lib/api'

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = 'organization' | 'security' | 'notifications' | 'compliance' | 'documents' | 'integrations' | 'preferences' | 'danger'

type DocStatus = 'accepted' | 'blocked' | 'partial' | 'na'

interface CountryRow {
  id: string
  flag: string
  country: string
  code: string
  types: {
    passport: DocStatus
    nationalId: DocStatus
    driverLicense: DocStatus
    residence: DocStatus
    bank: DocStatus
  }
  status: 'Accepted' | 'Blocked' | 'Partial'
  variants: { name: string; status: DocStatus }[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: 'organization', label: 'Organization' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'compliance', label: 'Compliance' },
  { id: 'documents', label: 'Documents' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'danger', label: 'Danger Zone' },
]

const COUNTRY_ROWS: CountryRow[] = [
  {
    id: 'us', flag: '🇺🇸', country: 'United States', code: 'US',
    types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'accepted', residence: 'na', bank: 'na' },
    status: 'Accepted',
    variants: [
      { name: 'US Passport Book', status: 'accepted' },
      { name: 'US Passport Card', status: 'accepted' },
      { name: "US Driver's License (all 50 states)", status: 'accepted' },
      { name: 'US Green Card', status: 'accepted' },
      { name: 'US Military ID', status: 'partial' },
    ],
  },
  {
    id: 'de', flag: '🇩🇪', country: 'Germany', code: 'DE',
    types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'accepted', residence: 'accepted', bank: 'na' },
    status: 'Accepted', variants: [],
  },
  {
    id: 'gb', flag: '🇬🇧', country: 'United Kingdom', code: 'GB',
    types: { passport: 'accepted', nationalId: 'na', driverLicense: 'accepted', residence: 'accepted', bank: 'na' },
    status: 'Accepted', variants: [],
  },
  {
    id: 'sg', flag: '🇸🇬', country: 'Singapore', code: 'SG',
    types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'na', residence: 'na', bank: 'na' },
    status: 'Accepted', variants: [],
  },
  {
    id: 'fr', flag: '🇫🇷', country: 'France', code: 'FR',
    types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'accepted', residence: 'na', bank: 'na' },
    status: 'Accepted', variants: [],
  },
  {
    id: 'jp', flag: '🇯🇵', country: 'Japan', code: 'JP',
    types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'accepted', residence: 'na', bank: 'na' },
    status: 'Accepted', variants: [],
  },
  {
    id: 'br', flag: '🇧🇷', country: 'Brazil', code: 'BR',
    types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'accepted', residence: 'na', bank: 'na' },
    status: 'Partial', variants: [],
  },
  {
    id: 'cn', flag: '🇨🇳', country: 'China', code: 'CN',
    types: { passport: 'accepted', nationalId: 'accepted', driverLicense: 'na', residence: 'na', bank: 'na' },
    status: 'Partial', variants: [],
  },
  {
    id: 'kp', flag: '🇰🇵', country: 'North Korea', code: 'KP',
    types: { passport: 'blocked', nationalId: 'blocked', driverLicense: 'blocked', residence: 'blocked', bank: 'blocked' },
    status: 'Blocked', variants: [],
  },
  {
    id: 'ir', flag: '🇮🇷', country: 'Iran', code: 'IR',
    types: { passport: 'blocked', nationalId: 'blocked', driverLicense: 'blocked', residence: 'blocked', bank: 'blocked' },
    status: 'Blocked', variants: [],
  },
]

// ─── Shared small components ──────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[15px] font-semibold text-white mb-4">{children}</h3>
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-[13px] font-medium text-text-secondary mb-1.5">{children}</label>
}

function TextInput({ className = '', ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full h-10 bg-elevated border border-border rounded-md px-3 text-[14px] text-white placeholder:text-text-disabled focus:outline-none focus:border-cta transition-colors ${className}`}
      {...props}
    />
  )
}

function Select({ className = '', children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full h-10 bg-elevated border border-border rounded-md px-3 text-[14px] text-white focus:outline-none focus:border-cta transition-colors appearance-none cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex w-10 h-6 rounded-full transition-colors shrink-0 ${checked ? 'bg-cta' : 'bg-border'}`}
    >
      <span
        className={`absolute top-[3px] left-[3px] w-[18px] h-[18px] rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`}
      />
    </button>
  )
}

function ToggleRow({ label, description, defaultChecked = true }: { label: string; description?: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div>
        <p className="text-[14px] text-white">{label}</p>
        {description && <p className="text-[12px] text-text-secondary mt-0.5">{description}</p>}
      </div>
      <Toggle checked={checked} onChange={setChecked} />
    </div>
  )
}

function Divider() {
  return <div className="h-px bg-border" />
}

// ─── StatusIcon + StatusBadge (documents) ─────────────────────────────────────

function StatusIcon({ status }: { status: DocStatus }) {
  if (status === 'accepted') return <CheckCircle className="w-4 h-4 text-success mx-auto" />
  if (status === 'blocked') return <XCircle className="w-4 h-4 text-error mx-auto" />
  if (status === 'partial') return (
    <svg className="w-4 h-4 text-warning mx-auto" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 4v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
  return <span className="block text-center text-text-disabled text-[12px]">—</span>
}

function DocStatusBadge({ status }: { status: 'Accepted' | 'Blocked' | 'Partial' }) {
  if (status === 'Accepted')
    return <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-success/15 border border-success/25 text-[11px] font-medium text-success">Accepted</span>
  if (status === 'Blocked')
    return <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-error/15 border border-error/25 text-[11px] font-medium text-error">Blocked</span>
  return <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-warning/15 border border-warning/25 text-[11px] font-medium text-warning">Partial</span>
}

// ─── TAB: Organization ────────────────────────────────────────────────────────

function OrganizationTab() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-[22px] font-semibold text-white mb-1">Organization Settings</h2>
        <p className="text-[14px] text-text-secondary">Manage your organization profile and details.</p>
      </div>
      <div className="bg-surface rounded-lg border border-border p-6 flex flex-col gap-5">
        {/* Name */}
        <div>
          <Label>Organization Name</Label>
          <TextInput defaultValue={user?.name ?? ''} />
        </div>

        {/* Logo */}
        <div>
          <Label>Organization Logo</Label>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-elevated border border-border flex items-center justify-center text-[20px] font-bold text-text-secondary shrink-0">
              {(user?.name ?? 'O').charAt(0).toUpperCase()}
            </div>
            <button className="h-8 px-3 rounded-md border border-border text-[13px] text-white hover:bg-white/[0.04] transition-colors">
              Change Logo
            </button>
          </div>
        </div>

        {/* Grid: Industry + Country */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Industry</Label>
            <div className="relative">
              <Select defaultValue="crypto">
                <option value="crypto">Crypto Exchange</option>
                <option value="fintech">Fintech</option>
                <option value="marketplace">Marketplace</option>
                <option value="other">Other</option>
              </Select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            </div>
          </div>
          <div>
            <Label>Country</Label>
            <div className="relative">
              <Select defaultValue="us">
                <option value="us">United States</option>
                <option value="gb">United Kingdom</option>
                <option value="eu">European Union</option>
                <option value="sg">Singapore</option>
              </Select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Website */}
        <div>
          <Label>Website</Label>
          <TextInput type="url" defaultValue="https://acmecorp.com" />
        </div>

        {/* Save */}
        <div className="pt-4 border-t border-border flex justify-end">
          <button className="h-9 px-4 bg-cta rounded-md text-[13px] font-medium text-white hover:bg-cta/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── TAB: Security ────────────────────────────────────────────────────────────

function SecurityTab() {
  const [ssoEnabled, setSsoEnabled] = useState(false)
  const [totpEnabled, setTotpEnabled] = useState(false)
  const [totpSetup, setTotpSetup] = useState<{ secret: string; otpAuthUrl: string } | null>(null)
  const [totpCode, setTotpCode] = useState('')
  const [totpLoading, setTotpLoading] = useState(false)
  const [totpError, setTotpError] = useState('')

  const handleTotpSetup = async () => {
    setTotpLoading(true)
    setTotpError('')
    try {
      const res = await api.post<{ secret: string; otpAuthUrl: string }>('/v1/auth/totp/setup')
      setTotpSetup(res)
    } catch (err) {
      setTotpError(err instanceof ApiError ? (err.detail ?? err.message) : 'Failed to set up 2FA')
    } finally {
      setTotpLoading(false)
    }
  }

  const handleTotpEnable = async () => {
    if (!totpSetup || !totpCode) return
    setTotpLoading(true)
    setTotpError('')
    try {
      await api.post('/v1/auth/totp/enable', { secret: totpSetup.secret, totpCode })
      setTotpEnabled(true)
      setTotpSetup(null)
      setTotpCode('')
    } catch (err) {
      setTotpError(err instanceof ApiError ? (err.detail ?? err.message) : 'Invalid code')
    } finally {
      setTotpLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-[22px] font-semibold text-white mb-1">Security</h2>
        <p className="text-[14px] text-text-secondary">Manage two-factor authentication, sessions, and SSO.</p>
      </div>

      {/* 2FA */}
      <div>
        <SectionTitle>Two-Factor Authentication</SectionTitle>
        <div className="bg-surface rounded-lg border border-border divide-y divide-border">
          {/* Status row */}
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-text-secondary" />
              <div>
                <p className="text-[14px] text-white font-medium">2FA Status</p>
                <p className="text-[12px] text-text-secondary mt-0.5">
                  {totpEnabled ? 'Two-factor authentication is active' : 'Add an extra layer of security'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              {totpEnabled ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-success/15 border border-success/25 text-[12px] font-medium text-success">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  Enabled
                </span>
              ) : (
                <button onClick={handleTotpSetup} disabled={totpLoading} className="h-8 px-3 bg-cta text-white text-[13px] font-medium rounded-md hover:bg-cta/90 transition-colors disabled:opacity-50">
                  {totpLoading ? 'Setting up...' : 'Enable 2FA'}
                </button>
              )}
            </div>
          </div>
          {/* TOTP setup flow */}
          {totpSetup && (
            <div className="p-4 flex flex-col gap-3">
              <p className="text-[13px] text-text-secondary">Copy this URL into your authenticator app:</p>
              <div className="bg-elevated rounded-md p-3 font-mono text-[12px] text-white break-all select-all">
                {totpSetup.otpAuthUrl}
              </div>
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="text-[12px] font-medium text-text-secondary block mb-1">Verification Code</label>
                  <input
                    type="text"
                    value={totpCode}
                    onChange={(e) => setTotpCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    maxLength={6}
                    className="w-full h-10 px-3 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors font-mono"
                  />
                </div>
                <button onClick={handleTotpEnable} disabled={totpCode.length < 6 || totpLoading} className="h-10 px-4 bg-cta text-white text-[13px] font-medium rounded-md hover:bg-cta/90 transition-colors disabled:opacity-50">
                  {totpLoading ? 'Verifying...' : 'Verify & Enable'}
                </button>
              </div>
              {totpError && <p className="text-[13px] text-error">{totpError}</p>}
            </div>
          )}
          {/* Authenticator row — only shown when TOTP is enabled */}
          {totpEnabled && (
            <div className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-text-secondary" />
                <div>
                  <p className="text-[14px] text-white">Authenticator app (Google Authenticator)</p>
                  <p className="text-[12px] text-text-secondary mt-0.5">Added on 2026-01-12</p>
                </div>
              </div>
              <button className="text-[13px] text-error hover:underline shrink-0">Remove</button>
            </div>
          )}
          {/* Add SMS */}
          <div className="p-4">
            <button className="text-[13px] text-cta hover:underline flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add SMS backup
            </button>
          </div>
        </div>
      </div>

      {/* Sessions */}
      <div>
        <SectionTitle>Session Management</SectionTitle>
        <div className="bg-surface rounded-lg border border-border">
          <div className="grid grid-cols-[1fr_120px_130px_80px] text-[12px] text-text-secondary px-4 py-2.5 border-b border-border">
            <span>Device</span>
            <span>Last Active</span>
            <span>IP Address</span>
            <span></span>
          </div>
          {/* Current session */}
          <div className="grid grid-cols-[1fr_120px_130px_80px] items-center px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2.5">
              <Monitor className="w-4 h-4 text-success shrink-0" />
              <div>
                <p className="text-[13px] text-white">MacBook Pro · Chrome</p>
                <span className="text-[11px] text-success">Current session</span>
              </div>
            </div>
            <span className="text-[13px] text-text-secondary">Just now</span>
            <span className="text-[13px] text-text-secondary font-mono">192.168.1.42</span>
            <span></span>
          </div>
          {/* Other session */}
          <div className="grid grid-cols-[1fr_120px_130px_80px] items-center px-4 py-3">
            <div className="flex items-center gap-2.5">
              <MonitorSmartphone className="w-4 h-4 text-text-secondary shrink-0" />
              <div>
                <p className="text-[13px] text-white">iPhone 14 · Safari</p>
                <p className="text-[11px] text-text-disabled">iOS 17.4</p>
              </div>
            </div>
            <span className="text-[13px] text-text-secondary">2h ago</span>
            <span className="text-[13px] text-text-secondary font-mono">10.0.0.5</span>
            <button className="text-[13px] text-error hover:underline">Revoke</button>
          </div>
          {/* Footer */}
          <div className="px-4 py-3 border-t border-border">
            <button className="h-8 px-3 rounded-md border border-error/25 text-[13px] text-error hover:bg-error/10 transition-colors">
              Revoke All Other Sessions
            </button>
          </div>
        </div>
      </div>

      {/* SSO */}
      <div>
        <SectionTitle>SSO Configuration</SectionTitle>
        <div className="bg-surface rounded-lg border border-border p-5 flex flex-col gap-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[14px] font-medium text-white">Enable SSO</p>
              <p className="text-[13px] text-text-secondary mt-0.5">Require SAML SSO for all team members</p>
            </div>
            <Toggle checked={ssoEnabled} onChange={setSsoEnabled} />
          </div>
          <div className={`flex flex-col gap-3 transition-opacity ${ssoEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
            <div>
              <Label>SSO Metadata URL</Label>
              <TextInput
                placeholder="https://your-idp.com/saml/metadata"
                disabled={!ssoEnabled}
              />
            </div>
            <div className="flex justify-end">
              <button className="h-9 px-4 bg-cta rounded-md text-[13px] font-medium text-white hover:bg-cta/90 transition-colors disabled:opacity-50" disabled={!ssoEnabled}>
                Configure SSO
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── TAB: Notifications ───────────────────────────────────────────────────────

function NotificationsTab() {
  const [slackVisible, setSlackVisible] = useState(false)
  const [pdVisible, setPdVisible] = useState(false)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-[22px] font-semibold text-white mb-1">Notifications</h2>
        <p className="text-[14px] text-text-secondary">Control what events trigger alerts and where they are sent.</p>
      </div>

      {/* Email notifications */}
      <div>
        <SectionTitle>Email Notifications</SectionTitle>
        <div className="bg-surface rounded-lg border border-border px-5 divide-y divide-border">
          <ToggleRow label="Verification completed" />
          <ToggleRow label="Verification failed" />
          <ToggleRow label="Daily summary report" />
          <ToggleRow label="Webhook delivery failures" />
          <ToggleRow label="Team member invited" />
        </div>
      </div>

      {/* Alert thresholds */}
      <div>
        <SectionTitle>Alert Thresholds</SectionTitle>
        <div className="bg-surface rounded-lg border border-border p-5 flex flex-col gap-4">
          <div>
            <Label>Alert when failure rate exceeds</Label>
            <div className="flex items-center gap-2">
              <TextInput defaultValue="5%" className="max-w-[100px]" />
              <span className="text-[14px] text-text-secondary">per hour</span>
            </div>
          </div>
          <div>
            <Label>Alert when queue depth exceeds</Label>
            <div className="flex items-center gap-2">
              <TextInput defaultValue="100" className="max-w-[100px]" />
              <span className="text-[14px] text-text-secondary">pending verifications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Channels */}
      <div>
        <SectionTitle>Notification Channels</SectionTitle>
        <div className="bg-surface rounded-lg border border-border p-5 flex flex-col gap-4">
          {/* Email */}
          <div>
            <Label>Email</Label>
            <div className="flex items-center gap-2 h-10 bg-elevated border border-border rounded-md px-3">
              <Check className="w-4 h-4 text-success shrink-0" />
              <span className="text-[14px] text-white">admin@acmecorp.com</span>
            </div>
          </div>
          {/* Slack */}
          <div>
            <Label>Slack Webhook URL</Label>
            <div className="relative">
              <TextInput
                type={slackVisible ? 'text' : 'password'}
                placeholder="https://hooks.slack.com/services/..."
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white"
                onClick={() => setSlackVisible(v => !v)}
              >
                {slackVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {/* PagerDuty */}
          <div>
            <Label>PagerDuty Integration Key</Label>
            <div className="relative">
              <TextInput
                type={pdVisible ? 'text' : 'password'}
                placeholder="Enter integration key..."
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white"
                onClick={() => setPdVisible(v => !v)}
              >
                {pdVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button className="h-9 px-4 bg-cta rounded-md text-[13px] font-medium text-white hover:bg-cta/90 transition-colors">
              Save Channels
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── TAB: Compliance ──────────────────────────────────────────────────────────

function ComplianceTab() {
  const [blockedCountries, setBlockedCountries] = useState<{ label: string; emoji: string }[]>([
    { label: 'DPRK', emoji: '🇰🇵' },
    { label: 'Iran', emoji: '🇮🇷' },
  ])
  const [countryInput, setCountryInput] = useState('')
  const [expiryEnabled, setExpiryEnabled] = useState(true)

  const removeCountry = (label: string) => {
    setBlockedCountries(prev => prev.filter(c => c.label !== label))
  }

  const addCountry = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && countryInput.trim()) {
      setBlockedCountries(prev => [...prev, { label: countryInput.trim(), emoji: '🌍' }])
      setCountryInput('')
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-[22px] font-semibold text-white mb-1">Compliance Settings</h2>
        <p className="text-[14px] text-text-secondary">Configure KYC levels, AML rules, and data retention policies.</p>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6 flex flex-col gap-6">
        {/* KYC Level */}
        <div>
          <Label>KYC Level</Label>
          <div className="relative">
            <Select defaultValue="l2">
              <option value="l1">Level 1 (Email + Phone)</option>
              <option value="l2">Level 2 (Passport + liveness)</option>
              <option value="l3">Level 3 (Enhanced due diligence)</option>
            </Select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
          </div>
        </div>

        <Divider />

        {/* AML Screening */}
        <ToggleRow
          label="AML Screening"
          description="Screen against OFAC, EU sanctions, and UN consolidated lists. Automatic re-screening on list updates."
        />

        <Divider />

        {/* Data Retention */}
        <div>
          <Label>Data Retention Policy</Label>
          <div className="relative">
            <Select defaultValue="90d">
              <option value="30d">30 days (post-expiry)</option>
              <option value="90d">90 days (post-expiry)</option>
              <option value="1y">1 year (post-expiry)</option>
              <option value="7y">7 years (regulatory hold)</option>
            </Select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
          </div>
        </div>

        <Divider />

        {/* Credential Expiry */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="text-[14px] font-medium text-white mb-1.5">Automatic Credential Expiry</p>
            <div className="flex items-center gap-2">
              <TextInput defaultValue="365" className="max-w-[80px]" />
              <span className="text-[14px] text-text-secondary">days after issuance</span>
            </div>
          </div>
          <Toggle checked={expiryEnabled} onChange={setExpiryEnabled} />
        </div>

        <Divider />

        {/* Geographic Restrictions */}
        <div>
          <Label>Geographic Restrictions (Blocked Countries)</Label>
          <div className="min-h-[42px] flex flex-wrap gap-2 bg-elevated border border-border rounded-md p-2.5">
            {blockedCountries.map(c => (
              <span key={c.label} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-error/15 border border-error/25 text-[12px] text-error">
                {c.emoji} {c.label}
                <button type="button" onClick={() => removeCountry(c.label)} className="hover:text-white transition-colors">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <input
              className="flex-1 min-w-[120px] bg-transparent text-[13px] text-white placeholder:text-text-disabled outline-none"
              placeholder="Add country..."
              value={countryInput}
              onChange={e => setCountryInput(e.target.value)}
              onKeyDown={addCountry}
            />
          </div>
          <p className="text-[12px] text-text-disabled mt-1">Press Enter to add a country</p>
        </div>

        <Divider />

        {/* Consent */}
        <ToggleRow label="Require Consent" description="Require explicit user consent before collecting and processing verification data." />

        {/* Save */}
        <div className="pt-2 flex justify-end">
          <button className="h-9 px-4 bg-cta rounded-md text-[13px] font-medium text-white hover:bg-cta/90 transition-colors">
            Save Compliance Settings
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── TAB: Documents ───────────────────────────────────────────────────────────

function DocumentsTab({ unsavedChanges, setUnsavedChanges }: { unsavedChanges: boolean; setUnsavedChanges: (v: boolean) => void }) {
  const [search, setSearch] = useState('')
  const [expandedRows, setExpandedRows] = useState<string[]>([])
  const [selectedRows, setSelectedRows] = useState<string[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filtered = COUNTRY_ROWS.filter(r =>
    r.country.toLowerCase().includes(search.toLowerCase()) ||
    r.code.toLowerCase().includes(search.toLowerCase())
  )

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])
  }

  const toggleSelect = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id])
    setUnsavedChanges(true)
  }

  const toggleSelectAll = (checked: boolean) => {
    setSelectedRows(checked ? filtered.map(r => r.id) : [])
    if (checked) setUnsavedChanges(true)
  }

  const allSelected = filtered.length > 0 && filtered.every(r => selectedRows.includes(r.id))

  const DOC_TYPES: { key: keyof CountryRow['types']; label: string }[] = [
    { key: 'passport', label: 'Passport' },
    { key: 'nationalId', label: 'National ID' },
    { key: 'driverLicense', label: "Driver's Lic." },
    { key: 'residence', label: 'Residence Permit' },
    { key: 'bank', label: 'Bank Statement' },
  ]

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-semibold text-white mb-1">Accepted Documents</h2>
          <p className="text-[14px] text-text-secondary">Configure which document types are accepted per country.</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button className="h-9 px-3 rounded-md border border-border text-[13px] text-white hover:bg-white/[0.04] transition-colors flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export Config
          </button>
          <button
            onClick={() => setUnsavedChanges(false)}
            disabled={!unsavedChanges}
            className="h-9 px-4 bg-cta rounded-md text-[13px] font-medium text-white hover:bg-cta/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Intro card */}
      <div className="bg-surface rounded-lg p-5 px-6 flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-cta/15 flex items-center justify-center shrink-0">
          <FileCheck className="w-5 h-5 text-cta" />
        </div>
        <div className="flex-1">
          <p className="text-[15px] font-semibold text-white mb-1">Document Acceptance Policy</p>
          <p className="text-[13px] text-text-secondary mb-2">
            Control which document types are accepted for each country. Changes apply immediately to all new verification requests.
          </p>
          <div className="flex items-center gap-3 text-[12px]">
            <span className="text-success flex items-center gap-1"><Check className="w-3 h-3" /> Changes apply immediately</span>
            <span className="text-text-secondary">·</span>
            <span className="text-text-secondary">847 document types currently active</span>
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface rounded-lg border border-border p-4">
          <p className="text-[12px] text-text-secondary mb-1">Total Accepted Document Types</p>
          <p className="text-[24px] font-bold text-white leading-none">847</p>
          <p className="text-[12px] text-success mt-1">+12 this month</p>
        </div>
        <div className="bg-surface rounded-lg border border-border p-4">
          <p className="text-[12px] text-text-secondary mb-1">Countries Covered</p>
          <p className="text-[24px] font-bold text-white leading-none">183</p>
          <p className="text-[12px] text-success mt-1">+2 this month</p>
        </div>
        <div className="bg-surface rounded-lg border border-border p-4">
          <p className="text-[12px] text-text-secondary mb-1">Blocked Document Types</p>
          <p className="text-[24px] font-bold text-error leading-none">24</p>
          <p className="text-[12px] text-warning mt-1">+1 this week</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-surface rounded-lg p-3.5 px-5 flex items-center gap-3">
        <div className="relative flex-1 max-w-[280px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            className="w-full h-9 bg-elevated border border-border rounded-md pl-9 pr-3 text-[13px] text-white placeholder:text-text-disabled focus:outline-none focus:border-cta transition-colors"
            placeholder="Search country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <button className="h-9 px-3 rounded-md border border-border text-[13px] text-white hover:bg-white/[0.04] transition-colors flex items-center gap-1.5 whitespace-nowrap">
          All Regions <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
        </button>
        <button className="h-9 px-3 rounded-md border border-border text-[13px] text-white hover:bg-white/[0.04] transition-colors flex items-center gap-1.5 whitespace-nowrap">
          All Statuses <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
        </button>
        <div className="ml-auto">
          <button
            onClick={() => setIsModalOpen(true)}
            className="h-9 px-3 bg-cta rounded-md text-[13px] font-medium text-white hover:bg-cta/90 transition-colors flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" /> Add Override
          </button>
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedRows.length > 0 && (
        <div className="flex items-center gap-4 bg-cta/10 border border-cta/25 rounded-lg px-4 py-2.5">
          <span className="text-[13px] text-white font-medium">{selectedRows.length} {selectedRows.length === 1 ? 'country' : 'countries'} selected</span>
          <div className="flex items-center gap-3 ml-auto">
            <button className="text-[13px] text-success hover:underline">Accept All Document Types</button>
            <span className="text-border">|</span>
            <button className="text-[13px] text-error hover:underline">Block Country</button>
            <span className="text-border">|</span>
            <button onClick={() => setSelectedRows([])} className="text-[13px] text-cta hover:underline">Deselect</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[40px_1fr_90px_90px_90px_110px_110px_90px_36px] items-center px-4 py-2.5 border-b border-border text-[11px] font-medium text-text-secondary uppercase tracking-wider">
          <div className="flex items-center justify-center">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={e => toggleSelectAll(e.target.checked)}
              className="w-3.5 h-3.5 accent-cta cursor-pointer"
            />
          </div>
          <span>Country</span>
          <span className="text-center">Passport</span>
          <span className="text-center">National ID</span>
          <span className="text-center">Driver's Lic.</span>
          <span className="text-center">Residence</span>
          <span className="text-center">Bank Stmt.</span>
          <span>Status</span>
          <span></span>
        </div>

        {filtered.map(row => (
          <React.Fragment key={row.id}>
            <div
              className={`grid grid-cols-[40px_1fr_90px_90px_90px_110px_110px_90px_36px] items-center px-4 py-3 border-b border-border last:border-b-0 hover:bg-white/[0.02] transition-colors ${expandedRows.includes(row.id) ? 'bg-white/[0.02]' : ''}`}
            >
              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => toggleSelect(row.id)}
                  className="w-3.5 h-3.5 accent-cta cursor-pointer"
                />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[18px] leading-none">{row.flag}</span>
                <div>
                  <p className="text-[13px] text-white font-medium">{row.country}</p>
                  <p className="text-[11px] text-text-disabled">{row.code}</p>
                </div>
              </div>
              <div className="flex items-center justify-center"><StatusIcon status={row.types.passport} /></div>
              <div className="flex items-center justify-center"><StatusIcon status={row.types.nationalId} /></div>
              <div className="flex items-center justify-center"><StatusIcon status={row.types.driverLicense} /></div>
              <div className="flex items-center justify-center"><StatusIcon status={row.types.residence} /></div>
              <div className="flex items-center justify-center"><StatusIcon status={row.types.bank} /></div>
              <div><DocStatusBadge status={row.status} /></div>
              <div className="flex items-center justify-center">
                {row.variants.length > 0 ? (
                  <button
                    onClick={() => toggleExpand(row.id)}
                    className="text-text-secondary hover:text-white transition-colors"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${expandedRows.includes(row.id) ? 'rotate-180' : ''}`} />
                  </button>
                ) : null}
              </div>
            </div>

            {/* Accordion */}
            {expandedRows.includes(row.id) && row.variants.length > 0 && (
              <div className="bg-bg/40 border-b border-border">
                {row.variants.map((v, i) => (
                  <div key={i} className="grid grid-cols-[40px_1fr_auto] items-center px-4 py-2.5 ml-6 border-t border-border/50 first:border-t-0">
                    <span></span>
                    <span className="text-[13px] text-text-secondary pl-6">{v.name}</span>
                    <div className="pr-2"><StatusIcon status={v.status} /></div>
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Add Override Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-surface rounded-xl border border-border w-[480px] p-6 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[16px] font-semibold text-white">Add Document Override</h3>
                <p className="text-[13px] text-text-secondary mt-0.5">Set custom document rules for a specific country</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-text-secondary hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <Label>Search Country</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
                <TextInput className="pl-9" placeholder="Country name or code..." />
              </div>
            </div>

            <div>
              <Label>Document Types</Label>
              <div className="grid grid-cols-3 gap-2">
                {['Passport', 'National ID', "Driver's License", 'Residence Permit', 'Bank Statement', 'Military ID'].map(type => (
                  <label key={type} className="flex items-center gap-2 p-2.5 rounded-md bg-elevated border border-border cursor-pointer hover:border-cta/50 transition-colors text-[13px] text-white">
                    <input type="checkbox" className="accent-cta" />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-t border-b border-border">
              <span className="text-[14px] text-white">Accept selected types</span>
              <Toggle checked={true} onChange={() => {}} />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => setIsModalOpen(false)}
                className="h-9 px-4 rounded-md border border-border text-[13px] text-white hover:bg-white/[0.04] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => { setIsModalOpen(false); setUnsavedChanges(true) }}
                className="h-9 px-4 bg-cta rounded-md text-[13px] font-medium text-white hover:bg-cta/90 transition-colors"
              >
                Save Override
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── TAB: Integrations ────────────────────────────────────────────────────────

function IntegrationRow({
  logo, name, description, connected, onAction
}: {
  logo: React.ReactNode
  name: string
  description: string
  connected: boolean
  onAction: () => void
}) {
  return (
    <div className="flex items-center gap-4 py-4 border-b border-border last:border-b-0">
      <div className="w-10 h-10 rounded-lg bg-elevated border border-border flex items-center justify-center shrink-0 text-[13px] font-bold text-text-secondary">
        {logo}
      </div>
      <div className="flex-1">
        <p className="text-[14px] font-medium text-white">{name}</p>
        <p className={`text-[12px] mt-0.5 ${connected ? 'text-success' : 'text-text-secondary'}`}>{description}</p>
      </div>
      {connected ? (
        <button
          onClick={onAction}
          className="h-8 px-3 rounded-md border border-error/25 text-[13px] text-error hover:bg-error/10 transition-colors shrink-0"
        >
          Disconnect
        </button>
      ) : (
        <button
          onClick={onAction}
          className="h-8 px-3 rounded-md border border-cta text-[13px] text-cta hover:bg-cta/10 transition-colors shrink-0"
        >
          Connect
        </button>
      )}
    </div>
  )
}

const AVAILABLE_INTEGRATIONS = [
  { name: 'HubSpot', desc: 'Sync verified contacts to your CRM', logo: 'H' },
  { name: 'Zapier', desc: 'Automate workflows with 5000+ apps', logo: 'Z' },
  { name: 'Stripe Identity', desc: 'Combine with payment verification', logo: 'S' },
  { name: 'Datadog', desc: 'Export metrics and logs', logo: 'D' },
  { name: 'Segment', desc: 'Stream events to your data warehouse', logo: 'Sg' },
  { name: 'Notion', desc: 'Log compliance reports to Notion', logo: 'N' },
]

function IntegrationsTab() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-[22px] font-semibold text-white mb-1">Integrations</h2>
        <p className="text-[14px] text-text-secondary">Connect third-party services to extend your verification workflow.</p>
      </div>

      {/* Connected */}
      <div>
        <SectionTitle>Connected Services</SectionTitle>
        <div className="bg-surface rounded-lg border border-border px-4">
          <IntegrationRow
            logo="S"
            name="Salesforce CRM"
            description="Connected · Last synced 2026-03-17"
            connected={true}
            onAction={() => {}}
          />
          <IntegrationRow
            logo="#"
            name="Slack"
            description="Connected to #compliance-alerts"
            connected={true}
            onAction={() => {}}
          />
          <IntegrationRow
            logo="P"
            name="PagerDuty"
            description="Not connected"
            connected={false}
            onAction={() => {}}
          />
        </div>
      </div>

      {/* Available */}
      <div>
        <SectionTitle>Available Integrations</SectionTitle>
        <div className="grid grid-cols-3 gap-4">
          {AVAILABLE_INTEGRATIONS.map(intg => (
            <div key={intg.name} className="bg-elevated rounded-lg p-4 flex flex-col gap-3 border border-border hover:border-border/80 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-[14px] font-bold text-text-secondary">
                {intg.logo}
              </div>
              <div>
                <p className="text-[14px] font-medium text-white">{intg.name}</p>
                <p className="text-[12px] text-text-secondary mt-0.5">{intg.desc}</p>
              </div>
              <button className="text-[13px] text-cta hover:underline text-left">Connect →</button>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[13px] text-text-secondary">
        All integrations use your existing webhook infrastructure.{' '}
        <button className="text-cta hover:underline">Manage webhooks →</button>
      </p>
    </div>
  )
}

// ─── TAB: Preferences ────────────────────────────────────────────────────────

function PreferencesTab() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-[22px] font-semibold text-white mb-1">Preferences</h2>
        <p className="text-[14px] text-text-secondary">Customize your interface language and appearance.</p>
      </div>

      <div className="bg-surface rounded-lg border border-border p-6 flex flex-col gap-5">
        {/* Language */}
        <div>
          <Label>Display Language</Label>
          <div className="relative max-w-[220px]">
            <Select defaultValue="en">
              <option value="en">🇬🇧 English</option>
              <option value="tr">🇹🇷 Türkçe</option>
              <option value="de">🇩🇪 Deutsch</option>
              <option value="fr">🇫🇷 Français</option>
              <option value="es">🇪🇸 Español</option>
              <option value="ja">🇯🇵 日本語</option>
              <option value="ko">🇰🇷 한국어</option>
              <option value="zh">🇨🇳 中文</option>
            </Select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
          </div>
        </div>

        <Divider />

        {/* Theme */}
        <div>
          <Label>Interface Theme</Label>
          <div className="inline-flex rounded-md border border-border bg-elevated p-0.5 gap-0.5">
            {(['dark', 'light'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-1.5 rounded text-[13px] font-medium capitalize transition-colors ${theme === t ? 'bg-cta text-white' : 'text-text-secondary hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button className="h-9 px-4 bg-cta rounded-md text-[13px] font-medium text-white hover:bg-cta/90 transition-colors">
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── TAB: Danger Zone ─────────────────────────────────────────────────────────

function DangerZoneTab() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  const CONFIRM_TEXT = 'Acme Corp'
  const canDelete = deleteConfirmText === CONFIRM_TEXT

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-[28px] font-semibold text-error mb-1">Danger Zone</h2>
        <p className="text-[14px] text-text-secondary">Irreversible actions. Proceed with extreme caution.</p>
      </div>

      <div className="bg-surface rounded-lg border border-error/25 p-6 flex flex-col gap-6">
        {/* Export */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[15px] font-semibold text-white">Export All Data</p>
            <p className="text-[13px] text-text-secondary mt-1">
              Download a complete export of all verification records, credentials, and configuration. The archive will be emailed to your admin address.
            </p>
          </div>
          <button className="h-9 px-4 rounded-md border border-error/25 text-[13px] text-error hover:bg-error/10 transition-colors shrink-0 whitespace-nowrap">
            Export Data
          </button>
        </div>

        <Divider />

        {/* Delete */}
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-[15px] font-semibold text-white">Delete Organization</p>
            <p className="text-[13px] text-text-secondary mt-1">
              Permanently delete your organization, all verification records, issued credentials, team members, and configuration. This action cannot be undone.
            </p>
          </div>
          <button
            onClick={() => setIsDeleteModalOpen(true)}
            className="h-9 px-4 rounded-md bg-error text-[13px] font-medium text-white hover:bg-error/90 transition-colors shrink-0 whitespace-nowrap"
          >
            Delete Organization
          </button>
        </div>
      </div>

      {/* Delete modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-surface rounded-xl border border-border w-[440px] p-6 flex flex-col gap-5 shadow-2xl">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5 text-error" />
              </div>
              <div>
                <h3 className="text-[16px] font-semibold text-white">Delete Organization?</h3>
                <p className="text-[13px] text-text-secondary mt-1">
                  This will permanently delete <strong className="text-white">Acme Corp</strong> and all associated data. This action{' '}
                  <span className="text-error font-medium">cannot be undone</span>.
                </p>
              </div>
            </div>

            <div>
              <Label>Type <strong className="text-white">{CONFIRM_TEXT}</strong> to confirm</Label>
              <TextInput
                value={deleteConfirmText}
                onChange={e => setDeleteConfirmText(e.target.value)}
                placeholder={CONFIRM_TEXT}
                className={deleteConfirmText && !canDelete ? 'border-error' : ''}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                onClick={() => { setIsDeleteModalOpen(false); setDeleteConfirmText('') }}
                className="h-9 px-4 rounded-md border border-border text-[13px] text-white hover:bg-white/[0.04] transition-colors"
              >
                Cancel
              </button>
              <button
                disabled={!canDelete}
                className="h-9 px-4 rounded-md bg-error text-[13px] font-medium text-white hover:bg-error/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Permanently Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Root page ────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('organization')
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  const isDocumentsTab = activeTab === 'documents'

  return (
    <div className="flex h-full">
      {/* Secondary sidebar */}
      <div className="w-[200px] border-r border-border shrink-0 flex flex-col py-6 bg-bg">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id
          const isDanger = tab.id === 'danger'
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center h-9 px-4 text-[13px] font-medium transition-colors text-left w-full
                ${isActive
                  ? isDanger ? 'text-error' : 'text-white'
                  : isDanger
                    ? 'text-error hover:bg-error/10'
                    : 'text-text-secondary hover:bg-white/[0.04] hover:text-white'
                }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-cta rounded-r-full" />
              )}
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Content area */}
      <div className="flex-1 overflow-y-auto bg-bg">
        <div className={`p-8 mx-auto pb-24 ${isDocumentsTab ? 'max-w-[1200px]' : 'max-w-[800px]'}`}>
          {activeTab === 'organization' && <OrganizationTab />}
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'notifications' && <NotificationsTab />}
          {activeTab === 'compliance' && <ComplianceTab />}
          {activeTab === 'documents' && (
            <DocumentsTab unsavedChanges={unsavedChanges} setUnsavedChanges={setUnsavedChanges} />
          )}
          {activeTab === 'integrations' && <IntegrationsTab />}
          {activeTab === 'preferences' && <PreferencesTab />}
          {activeTab === 'danger' && <DangerZoneTab />}
        </div>
      </div>
    </div>
  )
}
