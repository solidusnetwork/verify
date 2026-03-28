'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { ShieldCheck, Eye, EyeOff, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

type Step = 'VALIDATING' | 'INVALID' | 'FORM' | 'SUCCESS'

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong']
const STRENGTH_COLORS = ['', 'bg-error', 'bg-warning', 'bg-warning', 'bg-success']

function getStrength(pw: string): number {
  if (!pw) return 0
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw)) s++
  if (/[0-9]/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return s === 0 ? 1 : s
}

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [step, setStep] = useState<Step>('VALIDATING')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  // Token validation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      if (token === 'expired' || token === 'invalid') {
        setStep('INVALID')
      } else {
        setStep('FORM')
      }
    }, 600)
    return () => clearTimeout(timer)
  }, [token])

  const strength = getStrength(password)
  const hasMinLength = password.length >= 8
  const isMatch = password.length > 0 && confirmPassword.length > 0 && password === confirmPassword
  const isMismatch = confirmPassword.length > 0 && !isMatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hasMinLength || !isMatch) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setStep('SUCCESS')
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-[480px]">

        {/* VALIDATING */}
        {step === 'VALIDATING' && (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-cta animate-spin" />
          </div>
        )}

        {/* INVALID — expired/used token */}
        {step === 'INVALID' && (
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <XCircle className="w-16 h-16 text-error" />
            </div>
            <h2 className="text-[28px] font-semibold text-white mb-4">Link expired</h2>
            <p className="text-[14px] text-text-secondary mb-8 leading-relaxed max-w-[340px]">
              This password reset link has expired or has already been used. Links are valid for 15 minutes.
            </p>
            <Link
              href="/forgot-password"
              className="w-full h-12 bg-cta hover:bg-cta/90 text-white rounded-md text-[16px] font-semibold transition-colors flex items-center justify-center"
            >
              Request a new link →
            </Link>
          </div>
        )}

        {/* SUCCESS */}
        {step === 'SUCCESS' && (
          <div className="flex flex-col items-center text-center w-full">
            <div className="mb-8">
              <CheckCircle className="w-16 h-16 text-success" />
            </div>
            <h2 className="text-[28px] font-bold text-white mb-4">Password updated</h2>
            <p className="text-[14px] text-text-secondary mb-8 leading-relaxed max-w-[340px]">
              Your password has been successfully changed.
            </p>
            <Link
              href="/login"
              className="w-full h-12 bg-cta hover:bg-cta/90 text-white rounded-md text-[16px] font-semibold transition-colors flex items-center justify-center"
            >
              Sign in to your dashboard →
            </Link>
          </div>
        )}

        {/* FORM */}
        {step === 'FORM' && (
          <div className="w-full flex flex-col items-center">
            {/* Logo */}
            <div className="flex flex-col items-center mb-10">
              <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-3">
                <ShieldCheck className="w-8 h-8 text-cyan" />
              </div>
              <span className="text-[14px] font-medium tracking-wide text-white">Solidus Verify</span>
            </div>

            <div className="w-full text-center mb-8">
              <h2 className="text-[28px] font-semibold text-white mb-3 leading-tight">Set a new password</h2>
              <p className="text-[14px] text-text-secondary">
                Your new password must be at least 8 characters and different from your previous password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
              <div className={loading ? 'opacity-60 pointer-events-none flex flex-col gap-6' : 'flex flex-col gap-6'}>
                {/* New password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-text-secondary">New password</label>
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                      className="h-12 w-full bg-elevated border border-border rounded-md px-4 pr-12 text-[16px] text-white placeholder:text-text-disabled outline-none focus:border-cta/60 transition-colors"
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors">
                      {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {/* Strength bar */}
                  {password.length > 0 && (
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex-1 flex gap-1">
                        {[1, 2, 3, 4].map(seg => (
                          <div
                            key={seg}
                            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${seg <= strength ? (STRENGTH_COLORS[strength] ?? 'bg-border') : 'bg-border'}`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-text-secondary w-10 text-right">{STRENGTH_LABELS[strength] ?? ''}</span>
                    </div>
                  )}
                </div>

                {/* Confirm password */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[12px] font-medium text-text-secondary">Confirm new password</label>
                  <div className="relative">
                    <input
                      type={showConfirm ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                      className={`h-12 w-full bg-elevated border rounded-md px-4 pr-12 text-[16px] text-white placeholder:text-text-disabled outline-none transition-colors ${isMismatch ? 'border-error focus:border-error' : 'border-border focus:border-cta/60'}`}
                    />
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-white transition-colors">
                      {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {isMismatch && (
                    <span className="text-[12px] text-error mt-0.5">Passwords do not match.</span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={!hasMinLength || !isMatch || loading}
                className="w-full h-12 bg-cta hover:bg-cta/90 text-white rounded-md text-[16px] font-semibold transition-colors flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Update Password'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}
