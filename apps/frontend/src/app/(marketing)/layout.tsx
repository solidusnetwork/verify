'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Globe, ChevronDown, Moon, Sun, Linkedin, Twitter, Github, MessageSquare } from 'lucide-react'

function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    setIsDark(saved !== 'light')
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
      className="w-9 h-9 bg-elevated border border-border rounded-md flex items-center justify-center hover:bg-elevated/80 transition-colors"
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark
        ? <Sun className="w-[18px] h-[18px] text-text-secondary" />
        : <Moon className="w-[18px] h-[18px] text-text-secondary" />
      }
    </button>
  )
}

function MarketingNav() {
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`w-full h-[72px] bg-bg/90 backdrop-blur-sm border-b border-border sticky top-0 z-[100] transition-shadow ${scrolled ? 'shadow-[0_1px_12px_rgba(0,0,0,0.12)]' : ''}`}>
      <div className="w-full h-full max-w-[1440px] mx-auto px-6 md:px-[120px] flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-3">
          {/* Light mode: dark-text logo (solidus_light.png is designed for light backgrounds) */}
          <img src="/logos/solidus_light.png" alt="Solidus" className="h-6 object-contain dark:hidden" />
          {/* Dark mode: white-text logo (solidus_dark.png is designed for dark backgrounds) */}
          <img src="/logos/solidus_dark.png" alt="Solidus" className="h-6 object-contain hidden dark:block" />
          <span className="text-[16px] font-bold tracking-tight text-text-primary">Solidus Verify</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: 'Product', href: '/home' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Use Cases', href: '/use-cases' },
            { label: 'Docs', href: '/docs' },
            { label: 'Company', href: '/home' },
          ].map(item => (
            <Link key={item.label} href={item.href} className="text-[14px] font-medium text-text-secondary hover:text-cta transition-colors duration-150">
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="h-9 px-3 bg-elevated border border-border rounded-md flex items-center gap-1.5 hover:bg-elevated/80 transition-colors"
            >
              <Globe className="w-[18px] h-[18px] text-text-secondary" />
              <span className="text-[12px] font-medium text-text-secondary">EN</span>
              <ChevronDown className="w-3 h-3 text-text-secondary" />
            </button>
            {langOpen && (
              <div className="absolute top-[calc(100%+4px)] right-0 w-[140px] bg-surface rounded-lg shadow-elevated border border-border py-2 flex flex-col z-[110]">
                {['EN 🇬🇧', 'TR 🇹🇷', 'DE 🇩🇪', 'FR 🇫🇷', 'ES 🇪🇸', 'JA 🇯🇵', 'KO 🇰🇷', 'ZH 🇨🇳'].map(l => (
                  <button key={l} onClick={() => setLangOpen(false)} className="px-4 py-2 text-left text-[13px] hover:bg-elevated hover:text-cta text-text-primary transition-colors">
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          <ThemeToggle />

          <div className="w-2" />
          <Link href="/login" className="h-9 px-4 text-[14px] font-medium text-text-secondary hover:text-cta transition-colors">
            Sign in
          </Link>
          <Link href="/signup" className="h-9 px-5 bg-cta hover:bg-cta/90 transition-colors rounded-lg text-[14px] font-semibold text-white flex items-center">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}

function MarketingFooter() {
  return (
    <footer className="w-full bg-bg border-t border-border py-16 px-8 md:px-[120px] flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <img src="/logos/solidus_light.png" alt="Solidus Verify" className="h-5 object-contain dark:hidden" />
            <img src="/logos/solidus_dark.png" alt="Solidus Verify" className="h-5 object-contain hidden dark:block" />
          </div>
          <p className="text-[14px] text-text-secondary max-w-[200px] leading-relaxed">KYC infrastructure for regulated industries.</p>
          <div className="flex items-center gap-3 mt-2">
            {[Linkedin, Twitter, Github, MessageSquare].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 rounded bg-elevated hover:bg-elevated/80 flex items-center justify-center transition-colors">
                <Icon className="w-4 h-4 text-text-secondary" />
              </a>
            ))}
          </div>
        </div>
        {[
          { title: 'Product', links: ['Verifications', 'API Keys', 'Webhooks', 'Analytics', 'Credential Management', 'Changelog', 'Status'] },
          { title: 'Developers', links: ['Documentation', 'API Reference', 'SDKs', 'Quickstart', 'Webhook Guide', 'Sample Code', 'Rate Limits'] },
          { title: 'Company', links: ['About Solidus', 'Pricing', 'Security & Trust', 'Privacy Policy', 'Terms of Service', 'GDPR', 'Contact Us'] },
        ].map(col => (
          <div key={col.title} className="flex flex-col gap-4">
            <span className="text-[12px] font-medium text-text-disabled tracking-widest uppercase">{col.title}</span>
            {col.links.map(l => (
              <a key={l} href="#" className="text-[14px] text-text-secondary hover:text-text-primary transition-colors">{l}</a>
            ))}
          </div>
        ))}
      </div>
      <div className="w-full pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="text-[12px] text-text-disabled">© 2026 Solidus Foundation. All rights reserved.</span>
        <span className="text-[12px] text-text-disabled">verify.solidus.network · v2.4.1</span>
      </div>
    </footer>
  )
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen bg-bg text-text-primary font-sans">
      <MarketingNav />
      {children}
      <MarketingFooter />
    </div>
  )
}
