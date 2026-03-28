'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [emailNotFound, setEmailNotFound] = useState(false)

  const [resendTimer, setResendTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const [resendKey, setResendKey] = useState(0)

  useEffect(() => {
    if (!sent) return

    setResendTimer(60)
    setCanResend(false)

    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [sent, resendKey])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'notfound@example.com') {
      setEmailNotFound(true)
      return
    }
    await new Promise(r => setTimeout(r, 600))
    setSent(true)
  }

  const handleResend = () => {
    setResendKey(k => k + 1)
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="w-full max-w-[400px] flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-cta" />
          </div>
          <div className="text-center">
            <h1 className="text-[24px] font-bold text-white">Reset your password</h1>
            <p className="text-[14px] text-text-secondary mt-1">We'll send you a reset link.</p>
          </div>
        </div>

        <div className="w-full bg-surface rounded-xl border border-border p-6 flex flex-col gap-4">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-[40px] mb-3">📧</div>
              <h3 className="text-[16px] font-semibold text-white mb-2">Check your email</h3>
              <p className="text-[14px] text-text-secondary">We sent a reset link to <strong className="text-white">{email}</strong>. The link expires in 15 minutes.</p>
              <div className="mt-3">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-[13px] text-cta hover:underline"
                  >
                    Resend reset link
                  </button>
                ) : (
                  <span className="text-[13px] text-text-disabled">
                    Didn't receive it? Resend in {resendTimer}s
                  </span>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-medium text-text-secondary uppercase tracking-[0.04em]">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value)
                    setEmailNotFound(false)
                  }}
                  placeholder="you@company.com"
                  required
                  className="h-10 px-3 bg-elevated border border-border rounded-md text-[14px] text-white placeholder:text-text-disabled outline-none focus:border-cta/50 transition-colors"
                />
                {emailNotFound && (
                  <p className="text-[13px] text-error">
                    No account found with this email.{' '}
                    <Link href="/signup" className="text-cta hover:underline">
                      Sign up instead →
                    </Link>
                  </p>
                )}
              </div>
              <button type="submit" className="h-10 w-full bg-cta hover:bg-cta/90 text-white text-[14px] font-semibold rounded-md transition-colors">Send Reset Link</button>
            </form>
          )}
        </div>

        <Link href="/login" className="flex items-center gap-2 text-[14px] text-text-secondary hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
      </div>
    </div>
  )
}
