'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '../../lib/auth'
import {
  BarChart2,
  Key,
  ScrollText,
  ShieldCheck,
  UserCheck,
  Webhook,
  Settings,
  Sun,
  Moon,
  Globe,
  ChevronDown,
  LayoutDashboard,
  Inbox,
  ListFilter,
  FileCheck,
  AlertTriangle,
  X,
} from 'lucide-react'

function Logo() {
  return (
    <>
      {/* Mobile: icon only */}
      <img
        src="/logos/solidus_icon.png"
        alt="Solidus"
        className="h-8 w-auto object-contain min-[1200px]:hidden"
      />
      {/* Desktop light mode: dark wordmark (logo designed for dark/colored bg → use on light bg) */}
      <img
        src="/logos/solidus_light.png"
        alt="Solidus Verify"
        className="h-7 w-auto object-contain hidden min-[1200px]:block dark:hidden"
      />
      {/* Desktop dark mode: light wordmark (logo designed for light bg → use on dark bg) */}
      <img
        src="/logos/solidus_dark.png"
        alt="Solidus Verify"
        className="h-7 w-auto object-contain hidden dark:min-[1200px]:block"
      />
    </>
  )
}

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Analytics', icon: BarChart2, path: '/analytics' },
  { name: 'Cases', icon: Inbox, path: '/cases', badge: '38' },
  { name: 'Lists', icon: ListFilter, path: '/lists' },
  { name: 'Documents', icon: FileCheck, path: '/documents-config' },
  { name: 'Verifications', icon: ShieldCheck, path: '/verifications' },
  { name: 'Credentials', icon: ScrollText, path: '/credentials' },
  { name: 'Webhooks', icon: Webhook, path: '/webhooks' },
  { name: 'API Keys', icon: Key, path: '/api-keys' },
  { name: 'Settings', icon: Settings, path: '/settings' },
]

function Sidebar() {
  const [isSandbox, setIsSandbox] = useState(true)
  const pathname = usePathname()

  return (
    <div className="w-[240px] flex-shrink-0 bg-surface border-r border-border flex flex-col h-screen sticky top-0">
      <div className="h-16 px-5 flex items-center shrink-0">
        <Logo />
      </div>

      <div className="px-4 pb-6 pt-2 shrink-0">
        <button
          onClick={() => setIsSandbox(!isSandbox)}
          className="w-full flex items-center justify-between bg-elevated border border-border rounded-md px-3 py-2 hover:bg-border transition-colors duration-150"
        >
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isSandbox ? 'bg-warning' : 'bg-success'}`} />
            <span className="text-xs font-medium tracking-[0.04em] text-white">
              {isSandbox ? 'SANDBOX' : 'PRODUCTION'}
            </span>
          </div>
          <ChevronDown className="w-4 h-4 text-text-secondary" />
        </button>
      </div>

      <div className="px-4 pb-2">
        <div className="text-[10px] font-medium text-text-disabled tracking-[0.04em] mb-2 px-2">MAIN</div>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== '/' && pathname.startsWith(item.path))
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors duration-150 relative ${
                  isActive
                    ? 'text-white'
                    : 'text-text-secondary hover:bg-elevated hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-cta rounded-r-full" />
                )}
                <item.icon
                  className={`w-5 h-5 shrink-0 ${isActive ? 'text-cta' : 'text-text-secondary'}`}
                />
                <span className="flex-1 truncate">{item.name}</span>
                {item.badge && (
                  <span className="shrink-0 h-[20px] px-2 rounded-full border border-warning/25 bg-warning/10 flex items-center justify-center text-[10px] font-semibold text-warning">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="px-4 pb-2 mt-4">
        <div className="text-[10px] font-medium text-text-disabled tracking-[0.04em] mb-2 px-2">DEVELOPER</div>
        <nav className="flex flex-col gap-1">
          {[
            { name: 'API Reference', path: '/docs' },
            { name: 'Quickstart', path: '/docs/quickstart' },
          ].map((item) => {
            const isActive = pathname === item.path || pathname.startsWith(item.path)
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors duration-150 relative ${
                  isActive
                    ? 'text-white'
                    : 'text-text-secondary hover:bg-elevated hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-cta rounded-r-full" />
                )}
                <span className="flex-1 truncate">{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto p-4 shrink-0 border-t border-border">
        <div className="bg-elevated rounded-lg p-3 text-xs flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Quota used</span>
            <span className="text-white font-mono">1,248 / 10k</span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-cta rounded-full" style={{ width: '12.48%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved === 'light') {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
      setIsDark(false)
    }
  }, [])

  const toggle = () => {
    const html = document.documentElement
    if (isDark) {
      html.classList.remove('dark')
      html.classList.add('light')
      localStorage.setItem('theme', 'light')
    } else {
      html.classList.remove('light')
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
    setIsDark(!isDark)
  }

  return (
    <button
      onClick={toggle}
      className="w-9 h-9 rounded-md bg-surface border border-border flex items-center justify-center hover:bg-elevated transition-colors duration-150"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Moon className="w-[18px] h-[18px] text-text-secondary" />
      ) : (
        <Sun className="w-[18px] h-[18px] text-text-secondary" />
      )}
    </button>
  )
}

function TopBar() {
  return (
    <div className="h-16 px-6 bg-surface border-b border-border flex items-center justify-between sticky top-0 z-10">
      <div className="font-semibold text-lg">Dashboard</div>
      <div className="flex items-center gap-3">
        <button className="h-9 px-3 rounded-md bg-surface border border-border flex items-center gap-1.5 hover:bg-elevated transition-colors duration-150 group">
          <Globe className="w-[18px] h-[18px] text-text-secondary group-hover:text-white transition-colors" />
          <span className="text-xs font-medium text-text-secondary group-hover:text-white transition-colors">EN</span>
          <ChevronDown className="w-3 h-3 text-text-secondary group-hover:text-white transition-colors" />
        </button>
        <ThemeToggle />
        <div className="w-9 h-9 rounded-full bg-elevated border border-border flex items-center justify-center overflow-hidden">
          <UserCheck className="w-4 h-4 text-text-secondary" />
        </div>
      </div>
    </div>
  )
}

function RateLimitBanner({ onClose }: { onClose: () => void }) {
  return (
    <div className="bg-error/10 border-b border-error/20 py-2.5 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <AlertTriangle className="w-4 h-4 text-error" />
        <span className="text-sm text-error">Rate limit reached — requests are being throttled.</span>
      </div>
      <button onClick={onClose} className="text-error hover:text-white transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [showRateLimit, setShowRateLimit] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login')
    }
  }, [isLoading, user, router])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-bg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cta border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex h-screen bg-bg text-text-primary overflow-hidden font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <TopBar />
        {showRateLimit && <RateLimitBanner onClose={() => setShowRateLimit(false)} />}
        <main className="flex-1 overflow-y-auto flex flex-col relative">
          <div className="w-full flex-1 mx-auto flex flex-col">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
