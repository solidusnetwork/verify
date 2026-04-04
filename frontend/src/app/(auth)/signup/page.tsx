'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ShieldCheck, Zap, Shield, Lock, CheckCircle, XCircle } from 'lucide-react'
import { useAuth } from '../../../lib/auth'
import { ApiError } from '../../../lib/api'

// ─── Constants ────────────────────────────────────────────────────────────────

const FEATURE_PILLS = [
  { icon: Zap,    label: 'Real-time verification' },
  { icon: Shield, label: 'AML screening' },
  { icon: Lock,   label: 'Verifiable Credentials' },
]

// ─── Password strength ────────────────────────────────────────────────────────

function getPasswordStrength(pw: string): number {
  let score = 0
  if (pw.length >= 8)              score++
  if (/[A-Z]/.test(pw))           score++
  if (/[0-9]/.test(pw))           score++
  if (/[!@#$%^&*]/.test(pw))      score++
  return score
}

const STRENGTH_LABEL: Record<number, string> = {
  0: 'Weak',
  1: 'Weak',
  2: 'Fair',
  3: 'Good',
  4: 'Strong',
}

const STRENGTH_COLOR: Record<number, string> = {
  1: 'bg-error',
  2: 'bg-warning',
  3: 'bg-lime',
  4: 'bg-success',
}

// ─── Component ────────────────────────────────────────────────────────────────

type EmailStatus = 'idle' | 'checking' | 'available' | 'taken'

export default function SignupPage() {
  const router = useRouter()
  const { register } = useAuth()

  // Form state
  const [fullName,      setFullName]      = useState('')
  const [companyName,   setCompanyName]   = useState('')
  const [email,         setEmail]         = useState('')
  const [password,      setPassword]      = useState('')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showPw,        setShowPw]        = useState(false)
  const [loading,       setLoading]       = useState(false)
  const [error,         setError]         = useState('')

  // Email availability
  const [emailStatus,  setEmailStatus]  = useState<EmailStatus>('idle')
  const emailDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Email availability check ─────────────────────────────────────────────

  useEffect(() => {
    if (emailDebounceRef.current) clearTimeout(emailDebounceRef.current)

    if (!email) {
      setEmailStatus('idle')
      return
    }

    setEmailStatus('checking')
    emailDebounceRef.current = setTimeout(async () => {
      // Simulate async check
      await new Promise(r => setTimeout(r, 400))
      setEmailStatus(email.toLowerCase().includes('taken') ? 'taken' : 'available')
    }, 600)

    return () => {
      if (emailDebounceRef.current) clearTimeout(emailDebounceRef.current)
    }
  }, [email])

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (emailStatus === 'taken') return
    setLoading(true)
    setError('')
    try {
      await register(email, password, companyName)
      router.push('/')
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.detail ?? err.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  // ── Derived values ────────────────────────────────────────────────────────

  const pwStrength  = getPasswordStrength(password)
  const submitBlocked = !fullName || !companyName || emailStatus === 'taken' || !termsAccepted || loading

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-bg flex">

      {/* ── Brand panel (lg+) ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex w-[640px] shrink-0 flex-col items-center justify-center gap-8 p-12 relative overflow-hidden border-r border-border">
        {/* Logo top-left */}
        <div className="absolute top-6 left-6">
          <img src="/logos/solidus_dark.png" alt="Solidus" className="h-6 w-auto object-contain" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[480px] h-[480px] rounded-full bg-cta/5 blur-3xl" />
        </div>
        <div className="relative flex flex-col items-center gap-8 max-w-[360px] text-center">
          <div className="w-16 h-16 rounded-2xl bg-cta/10 border border-cta/20 flex items-center justify-center">
            <ShieldCheck className="w-9 h-9 text-cta" />
          </div>
          <h2 className="text-[28px] font-bold text-white leading-snug">
            Compliance infrastructure for the next generation of finance
          </h2>
          <div className="flex flex-col gap-3 w-full">
            {FEATURE_PILLS.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 bg-elevated/60 border border-border rounded-lg px-4 py-3">
                <div className="w-8 h-8 rounded-md bg-cta/10 flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-cta" />
                </div>
                <span className="text-[14px] text-white font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Form panel ────────────────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[400px] flex flex-col items-center gap-8">

          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center lg:hidden">
              <ShieldCheck className="w-7 h-7 text-cta" />
            </div>
            <div className="text-center">
              <h1 className="text-[24px] font-bold text-white">Create your account</h1>
              <p className="text-[14px] text-text-secondary mt-1">Start verifying identities in minutes.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full bg-surface rounded-xl border border-border p-6 flex flex-col gap-4">

            {error && (
              <div className="bg-error/10 border border-error/20 rounded-md p-3">
                <p className="text-[13px] text-error">{error}</p>
              </div>
            )}

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Alex Morgan"
                required
                className="h-10 px-3 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors"
              />
            </div>

            {/* Company Name */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Company Name</label>
              <input
                type="text"
                value={companyName}
                onChange={e => setCompanyName(e.target.value)}
                placeholder="Acme Corp"
                required
                className="h-10 px-3 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors"
              />
            </div>

            {/* Work Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Work Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className={[
                  'h-10 px-3 bg-elevated border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none transition-colors',
                  emailStatus === 'taken'
                    ? 'border-error/60 focus:border-error/80'
                    : emailStatus === 'available'
                      ? 'border-success/40 focus:border-success/60'
                      : 'border-border focus:border-cta/50',
                ].join(' ')}
              />
              {/* Email status feedback */}
              {emailStatus === 'checking' && (
                <p className="text-[12px] text-text-disabled">Checking...</p>
              )}
              {emailStatus === 'available' && (
                <p className="flex items-center gap-1.5 text-[12px] text-success">
                  <CheckCircle className="w-3.5 h-3.5 shrink-0" />
                  Available
                </p>
              )}
              {emailStatus === 'taken' && (
                <p className="flex items-center gap-1.5 text-[12px] text-error">
                  <XCircle className="w-3.5 h-3.5 shrink-0" />
                  Email already registered –{' '}
                  <Link href="/login" className="underline hover:opacity-80 transition-opacity">
                    Sign in instead →
                  </Link>
                </p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  required
                  minLength={8}
                  className="w-full h-10 px-3 pr-10 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-disabled hover:text-white transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Password strength meter */}
              {password.length > 0 && (
                <div className="flex items-center gap-2 mt-0.5">
                  <div className="flex gap-1 flex-1">
                    {[0, 1, 2, 3].map(i => (
                      <div
                        key={i}
                        className={[
                          'flex-1 h-1 rounded-full transition-colors duration-200',
                          i < pwStrength
                            ? (STRENGTH_COLOR[pwStrength] ?? 'bg-border')
                            : 'bg-border',
                        ].join(' ')}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-text-secondary shrink-0">
                    {STRENGTH_LABEL[pwStrength] ?? 'Weak'}
                  </span>
                </div>
              )}
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer group mt-1">
              <div
                onClick={() => setTermsAccepted(v => !v)}
                className={[
                  'w-4 h-4 rounded-[3px] border flex items-center justify-center shrink-0 mt-0.5 transition-colors',
                  termsAccepted ? 'bg-cta border-cta' : 'bg-elevated border-border group-hover:border-text-secondary',
                ].join(' ')}
              >
                {termsAccepted && (
                  <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 10 10" fill="none">
                    <path d="M1.5 5L4 7.5L8.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-[12px] text-text-secondary leading-relaxed">
                I agree to the{' '}
                <Link href="/terms" className="text-cta hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-cta hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={submitBlocked}
              className="h-10 w-full bg-cta hover:bg-cta/90 text-white text-[14px] font-semibold rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            <div className="relative flex items-center justify-center py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <span className="relative px-3 bg-surface text-[11px] text-text-disabled">OR</span>
            </div>

            <button
              type="button"
              className="h-10 w-full bg-transparent border border-border hover:bg-elevated rounded-lg flex items-center justify-center gap-3 transition-colors"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-[13px] text-white font-medium">Continue with Google</span>
            </button>
          </form>

          <p className="text-[14px] text-text-secondary">
            Already have an account?{' '}
            <Link href="/login" className="text-cta hover:underline font-medium">Sign in →</Link>
          </p>

        </div>
      </div>
    </div>
  )
}
