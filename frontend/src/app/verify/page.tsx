'use client'

import React, { useState, useEffect } from 'react'
import { UploadCloud, X, XCircle, CheckCircle, ShieldCheck, Loader2 } from 'lucide-react'

type FileState = { name: string; size: string } | null

const LIVENESS_STAGES = [
  { text: 'Connecting to camera...', borderColor: 'border-border' },
  { text: 'Position your face in the oval', borderColor: 'border-cta' },
  { text: 'Move closer', borderColor: 'border-cyan' },
  { text: 'Hold steady', borderColor: 'border-success' },
  { text: 'Slowly turn your head left', borderColor: 'border-cta' },
  { text: 'Slowly turn your head right', borderColor: 'border-cta' },
  { text: 'Capturing...', borderColor: 'border-cta' },
  { text: 'Perfect!', borderColor: 'border-success' },
]

const PROCESSING_STEPS = [
  { id: 1, title: 'Analyzing document authenticity' },
  { id: 2, title: 'Performing biometric match' },
  { id: 3, title: 'Checking against global registries' },
]

export default function HostedVerificationPage() {
  const [step, setStep] = useState(1)
  const [docType, setDocType] = useState('Passport')
  const [file, setFile] = useState<FileState>(null)
  const [fileError, setFileError] = useState(false)

  const [livenessIdx, setLivenessIdx] = useState(0)
  const [processingStep, setProcessingStep] = useState(0)
  const [result, setResult] = useState<'success' | 'failure' | null>(null)

  // Liveness auto-advance
  useEffect(() => {
    if (step !== 2) return
    setLivenessIdx(0)
    let current = 0
    const interval = setInterval(() => {
      current++
      if (current < LIVENESS_STAGES.length) {
        setLivenessIdx(current)
      } else {
        clearInterval(interval)
        setTimeout(() => setStep(3), 1000)
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [step])

  // Processing sequence
  useEffect(() => {
    if (step !== 3 || result !== null) return
    setProcessingStep(0)
    let cur = 0
    const interval = setInterval(() => {
      cur++
      setProcessingStep(cur)
      if (cur >= 4) {
        clearInterval(interval)
        setTimeout(() => setResult('success'), 800)
      }
    }, 1500)
    return () => clearInterval(interval)
  }, [step, result])

  const handleUpload = () => {
    setFile({ name: 'passport-front.jpg', size: '2.4 MB' })
    setFileError(false)
  }

  const resetAll = () => {
    setStep(1)
    setResult(null)
    setProcessingStep(0)
    setFile(null)
    setFileError(false)
  }

  const activeLiveness = LIVENESS_STAGES[livenessIdx] ?? LIVENESS_STAGES[0]!

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center py-12 px-4 text-white">

      {/* Header + progress */}
      <div className="w-full max-w-[480px] mb-8">
        <div className="flex items-center justify-center gap-2 mb-8">
          <ShieldCheck className="w-6 h-6 text-cta" />
          <span className="text-[16px] font-bold tracking-tight">Solidus Verify</span>
        </div>
        {result === null && (
          <div className="flex items-center gap-2">
            {[1, 2, 3].map(s => (
              <div key={s} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${step >= s ? 'bg-cta' : 'bg-border'}`} />
            ))}
          </div>
        )}
      </div>

      <div className="w-full max-w-[480px] flex flex-col">

        {/* Step 1: Upload */}
        {step === 1 && (
          <div className="flex flex-col">
            <h2 className="text-[24px] font-bold text-center mb-2">Upload your identity document</h2>
            <p className="text-[14px] text-text-secondary text-center mb-8">
              A government-issued ID is required to complete verification.
            </p>

            <div className="flex justify-center gap-2 mb-8">
              {['Passport', "Driver's License", 'National ID'].map(type => (
                <button
                  key={type}
                  onClick={() => setDocType(type)}
                  className={`px-4 py-2 rounded-full text-[14px] font-medium transition-colors ${docType === type ? 'bg-cta text-white' : 'bg-surface text-text-secondary hover:text-white'}`}
                >
                  {type}
                </button>
              ))}
            </div>

            {!file ? (
              <div
                className="w-full bg-surface rounded-lg border-2 border-dashed border-border p-10 flex flex-col items-center cursor-pointer hover:border-cta/50 hover:bg-surface/80 transition-all mb-8 group"
                onClick={handleUpload}
              >
                <div className="w-12 h-12 bg-elevated rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-6 h-6 text-text-secondary" />
                </div>
                <span className="text-[16px] text-white mb-1">Drag & drop or click to upload</span>
                <span className="text-[12px] text-text-secondary">JPG, PNG or PDF · max 10MB</span>
              </div>
            ) : (
              <div className={`relative w-full bg-elevated rounded-lg p-3 flex items-center gap-3 mb-8 ${fileError ? 'border-2 border-error' : 'border border-transparent'}`}>
                {fileError && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-elevated rounded-full flex items-center justify-center">
                    <XCircle className="w-5 h-5 text-error" />
                  </div>
                )}
                <div className="w-[60px] h-[40px] bg-surface rounded flex items-center justify-center shrink-0 border border-border">
                  <span className="text-[20px]">🪪</span>
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[14px] text-white truncate">{file.name}</span>
                    {!fileError && (
                      <button onClick={() => setFile(null)} className="p-1 hover:bg-border rounded-full transition-colors">
                        <X className="w-4 h-4 text-text-secondary" />
                      </button>
                    )}
                  </div>
                  <span className={`text-[12px] ${fileError ? 'text-error font-medium' : 'text-text-secondary'}`}>
                    {fileError ? 'Image quality too low' : file.size}
                  </span>
                </div>
              </div>
            )}

            {fileError && (
              <div className="flex flex-col gap-2 mb-8 bg-error/10 border border-error/20 rounded-lg p-4">
                <div className="text-[13px] font-medium text-error mb-1">Please try again:</div>
                {['Ensure all 4 corners are visible', 'Avoid glare and reflections', 'Move to a well-lit area'].map(tip => (
                  <div key={tip} className="flex items-center gap-2 text-[13px] text-text-secondary">
                    <div className="w-1 h-1 rounded-full bg-text-secondary" /> {tip}
                  </div>
                ))}
                <button className="text-[14px] font-medium text-error mt-2 self-start hover:opacity-80 transition-opacity" onClick={() => { setFile(null); setFileError(false) }}>
                  Retake Photo
                </button>
              </div>
            )}

            <button
              disabled={!file || fileError}
              onClick={() => setStep(2)}
              className={`w-full h-12 rounded-lg text-[16px] font-semibold transition-colors ${file && !fileError ? 'bg-cta hover:bg-cta/90 text-white' : 'bg-elevated text-text-disabled cursor-not-allowed'}`}
            >
              Continue
            </button>

            {file && !fileError && (
              <button onClick={() => setFileError(true)} className="mt-6 text-[11px] text-text-secondary hover:text-white underline decoration-dashed opacity-50 self-center">
                Simulate Quality Error
              </button>
            )}
          </div>
        )}

        {/* Step 2: Liveness */}
        {step === 2 && (
          <div className="flex flex-col items-center">
            <h2 className="text-[24px] font-bold text-center mb-2">Liveness Check</h2>
            <p className="text-[14px] text-text-secondary text-center mb-8">Follow the instructions on the screen.</p>

            <div className="relative w-full aspect-[3/4] bg-bg rounded-2xl overflow-hidden mb-8 border border-border">
              {/* Simulated camera: dark bg with face placeholder */}
              <div className="absolute inset-0 flex items-center justify-center bg-bg">
                {livenessIdx > 0 && (
                  <div className="w-40 h-52 bg-elevated/40 rounded-full flex items-center justify-center">
                    <span className="text-[64px]">👤</span>
                  </div>
                )}
              </div>

              {/* Oval mask */}
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <div className={`w-[200px] h-[280px] rounded-[50%] shadow-[0_0_0_9999px_rgba(10,22,40,0.85)] border-4 transition-colors duration-500 ${activeLiveness.borderColor}`} />
              </div>

              {/* Instruction badge */}
              <div className="absolute bottom-8 left-0 right-0 z-20 flex justify-center px-4">
                <div className="bg-surface/90 backdrop-blur-md px-6 py-3 rounded-full border border-border shadow-lg">
                  <span className="text-[15px] font-medium text-white">{activeLiveness.text}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Processing + Result */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center min-h-[400px]">

            {result === null && (
              <div className="flex flex-col items-center w-full">
                <div className="relative w-[120px] h-[120px] flex items-center justify-center mb-10">
                  <div className="absolute inset-0 rounded-full border-4 border-surface" />
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-cta border-r-cyan animate-spin" style={{ animationDuration: '800ms', animationTimingFunction: 'linear' }} />
                  <ShieldCheck className="w-8 h-8 text-cta animate-pulse" />
                </div>
                <h2 className="text-[24px] font-bold text-center mb-8">Verifying your identity...</h2>
                <div className="w-full max-w-[320px] flex flex-col gap-5 bg-surface/50 border border-border rounded-xl p-6">
                  {PROCESSING_STEPS.map(item => {
                    const isDone = processingStep > item.id
                    const isActive = processingStep === item.id
                    return (
                      <div key={item.id} className="flex items-center gap-4 transition-opacity duration-300" style={{ opacity: processingStep >= item.id ? 1 : 0.4 }}>
                        <div className="w-6 h-6 flex items-center justify-center shrink-0">
                          {isDone ? <CheckCircle className="w-5 h-5 text-success" /> : isActive ? <Loader2 className="w-5 h-5 text-cta animate-spin" /> : <div className="w-4 h-4 rounded-full border-2 border-border" />}
                        </div>
                        <span className={`text-[14px] ${isDone || isActive ? 'text-white font-medium' : 'text-text-secondary'}`}>{item.title}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {result === 'success' && (
              <div className="flex flex-col items-center w-full">
                <div className="w-24 h-24 rounded-full bg-success/10 flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(52,199,89,0.2)]">
                  <CheckCircle className="w-12 h-12 text-success" />
                </div>
                <h2 className="text-[28px] font-bold text-center mb-2">Verification Complete</h2>
                <p className="text-[15px] text-text-secondary text-center mb-8 max-w-[340px]">
                  You can now close this window. Your verified credential has been issued.
                </p>
                <div className="w-full bg-surface border border-border rounded-xl p-5 mb-8 flex flex-col gap-4">
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <span className="text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Credential Issued</span>
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-cyan/10 rounded-md border border-cyan/20">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan" />
                      <span className="text-[12px] font-bold text-cyan">Level 2 KYC</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 pt-1">
                    <div className="w-12 h-12 bg-elevated rounded-full flex items-center justify-center border border-success/30 text-[22px]">
                      👤
                    </div>
                    <div className="flex flex-col">
                      <div className="text-[16px] font-bold text-white leading-tight">Alex Morgan</div>
                      <div className="text-[13px] text-text-secondary font-mono mt-0.5">did:key:z6MkhaXg...9vR4</div>
                    </div>
                  </div>
                </div>
                <button onClick={() => window.location.href = '/'} className="w-full h-12 bg-elevated hover:bg-border text-white rounded-lg text-[16px] font-semibold transition-colors">
                  Return to Application
                </button>
              </div>
            )}

            {result === 'failure' && (
              <div className="flex flex-col items-center w-full">
                <div className="w-24 h-24 rounded-full bg-error/10 flex items-center justify-center mb-6 shadow-[0_0_60px_rgba(255,59,48,0.2)]">
                  <XCircle className="w-12 h-12 text-error" />
                </div>
                <h2 className="text-[28px] font-bold text-center text-error mb-2">Verification Unsuccessful</h2>
                <p className="text-[15px] text-text-secondary text-center mb-8 max-w-[360px]">
                  We couldn&apos;t verify your identity. The face in the selfie did not match the document provided.
                </p>
                <div className="w-full flex flex-col gap-3">
                  <button onClick={resetAll} className="w-full h-12 bg-cta hover:bg-cta/90 text-white rounded-lg text-[16px] font-semibold transition-colors">
                    Try Again
                  </button>
                  <button className="w-full h-12 bg-transparent border border-border hover:bg-surface text-white rounded-lg text-[16px] font-semibold transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  )
}
