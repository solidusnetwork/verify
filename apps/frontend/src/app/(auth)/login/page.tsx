'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, ShieldCheck, Zap, Shield, Lock } from 'lucide-react'
import { useAuth } from '../../../lib/auth'
import { ApiError } from '../../../lib/api'

const FEATURE_PILLS = [
  { icon: Zap, label: 'Real-time verification' },
  { icon: Shield, label: 'AML screening' },
  { icon: Lock, label: 'Verifiable Credentials' },
]

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [step, setStep] = useState<'LOGIN' | 'MFA'>('LOGIN')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // MFA state
  const [mfaCode, setMfaCode] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [mfaResendKey, setMfaResendKey] = useState(0)

  // Resend countdown — restarts whenever mfaResendKey increments or step changes to MFA
  useEffect(() => {
    if (step !== 'MFA') return
    setResendTimer(30)
    setCanResend(false)
    const interval = setInterval(() => {
      setResendTimer(t => {
        if (t <= 1) {
          clearInterval(interval)
          setCanResend(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [step, mfaResendKey])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      router.push('/')
    } catch (err) {
      if (err instanceof ApiError && err.message === 'TOTP required') {
        setStep('MFA')
      } else if (err instanceof ApiError) {
        setError(err.detail ?? err.message)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleMfaInput = (value: string, index: number) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...mfaCode]
    next[index] = digit
    setMfaCode(next)
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleMfaKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !mfaCode[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleMfaPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const digits = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const next = [...mfaCode]
    for (let i = 0; i < 6; i++) {
      next[i] = digits[i] ?? ''
    }
    setMfaCode(next)
    inputRefs.current[Math.min(digits.length, 5)]?.focus()
  }

  const handleMfaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (mfaCode.join('').length < 6) return
    setLoading(true)
    setError('')
    try {
      await login(email, password, mfaCode.join(''))
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

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Brand panel — lg and up only */}
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

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-[400px] flex flex-col items-center gap-8">

          {step === 'LOGIN' && (
            <>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center lg:hidden">
                  <ShieldCheck className="w-7 h-7 text-cta" />
                </div>
                <div className="text-center">
                  <h1 className="text-[24px] font-bold text-white">Sign in to Solidus Verify</h1>
                  <p className="text-[14px] text-text-secondary mt-1">Your KYC operations platform.</p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="w-full bg-surface rounded-xl border border-border p-6 flex flex-col gap-4">
                {error && (
                  <div className="bg-error/10 border border-error/20 rounded-md p-3">
                    <p className="text-[13px] text-error">{error}</p>
                  </div>
                )}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="h-10 px-3 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Password</label>
                    <Link href="/forgot-password" className="text-[12px] text-cta hover:underline">Forgot password?</Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full h-10 px-3 pr-10 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-disabled hover:text-white transition-colors">
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="h-10 w-full bg-cta hover:bg-cta/90 text-white text-[14px] font-semibold rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed mt-1">
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>

                <div className="relative flex items-center justify-center py-1">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <span className="relative px-3 bg-surface text-[11px] text-text-disabled">OR</span>
                </div>

                <button
                  type="button"
                  disabled={loading}
                  className="h-10 w-full bg-transparent border border-border hover:bg-elevated rounded-lg flex items-center justify-center gap-3 transition-colors disabled:opacity-60"
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
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-cta hover:underline font-medium">Create one →</Link>
              </p>
            </>
          )}

          {step === 'MFA' && (
            <>
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-cta" />
                </div>
                <div className="text-center">
                  <h1 className="text-[24px] font-bold text-white">Two-factor authentication</h1>
                  <p className="text-[14px] text-text-secondary mt-1">Enter the 6-digit code from your authenticator app.</p>
                </div>
              </div>

              <form onSubmit={handleMfaSubmit} className="w-full bg-surface rounded-xl border border-border p-6 flex flex-col gap-5">
                {error && (
                  <div className="bg-error/10 border border-error/20 rounded-md p-3">
                    <p className="text-[13px] text-error">{error}</p>
                  </div>
                )}

                {/* 6-digit OTP inputs */}
                <div className="flex justify-center gap-2" onPaste={handleMfaPaste}>
                  {mfaCode.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { inputRefs.current[i] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleMfaInput(e.target.value, i)}
                      onKeyDown={e => handleMfaKeyDown(e, i)}
                      className="w-11 h-14 text-center text-[20px] font-bold text-white bg-elevated border border-border rounded-lg outline-none focus:border-cta/70 transition-colors caret-cta"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || mfaCode.join('').length < 6}
                  className="h-10 w-full bg-cta hover:bg-cta/90 text-white text-[14px] font-semibold rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>

                <div className="flex items-center justify-between text-[13px]">
                  <button type="button" onClick={() => setStep('LOGIN')} className="text-text-secondary hover:text-white transition-colors">
                    ← Back to sign in
                  </button>
                  {canResend ? (
                    <button type="button" onClick={() => setMfaResendKey(k => k + 1)} className="text-cta hover:underline">
                      Resend code
                    </button>
                  ) : (
                    <span className="text-text-disabled">Resend in {resendTimer}s</span>
                  )}
                </div>
              </form>

              <Link href="/recovery" className="text-[13px] text-text-secondary hover:text-white transition-colors">
                Use recovery code →
              </Link>
            </>
          )}

        </div>
      </div>
    </div>
  )
}
