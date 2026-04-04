'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams } from 'next/navigation'
import { ShieldCheck, Upload, Camera, CheckCircle, AlertCircle, Loader2, XCircle } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

type Step = 'intro' | 'document' | 'liveness' | 'processing' | 'complete' | 'failed'

type DocType = 'passport' | 'driving_license' | 'national_id' | 'residence_permit'

interface SessionInfo {
  id: string
  level: string
  status: string
  hostedUrl: string
}

const DOC_TYPE_LABELS: Record<DocType, string> = {
  passport: 'Passport',
  driving_license: "Driver's License",
  national_id: 'National ID',
  residence_permit: 'Residence Permit',
}

const DOC_NEEDS_BACK: DocType[] = ['driving_license', 'national_id']

function statusToStep(status: string): Step {
  switch (status) {
    case 'completed':
      return 'complete'
    case 'failed':
      return 'failed'
    case 'awaiting_liveness':
      return 'liveness'
    case 'processing':
      return 'processing'
    case 'document_uploaded':
      return 'processing'
    default:
      return 'intro'
  }
}

export default function HostedVerificationPage() {
  const params = useParams()
  const sessionToken = params.sessionId as string

  const [step, setStep] = useState<Step>('intro')
  const [session, setSession] = useState<SessionInfo | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [failReason, setFailReason] = useState<string | null>(null)

  // Document step state
  const [docType, setDocType] = useState<DocType>('passport')
  const [frontFile, setFrontFile] = useState<File | null>(null)
  const [backFile, setBackFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Liveness step state
  const [challenge, setChallenge] = useState<string | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [capturing, setCapturing] = useState(false)
  const [livenessUploading, setLivenessUploading] = useState(false)
  const [livenessError, setLivenessError] = useState<string | null>(null)
  const [cameraReady, setCameraReady] = useState(false)

  const videoRef = useRef<HTMLVideoElement | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const frontInputRef = useRef<HTMLInputElement | null>(null)
  const backInputRef = useRef<HTMLInputElement | null>(null)

  // Fetch session on mount
  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetch(`${API_URL}/v1/verifications/s/${sessionToken}`)
        if (!res.ok) {
          if (res.status === 404) {
            setLoadError('Verification session not found or has expired.')
          } else {
            setLoadError('Unable to load verification session. Please try again.')
          }
          return
        }
        const data: SessionInfo & { metadata?: { reason?: string } } = await res.json()
        setSession(data)
        const derived = statusToStep(data.status)
        if (derived !== 'intro') {
          if (derived === 'failed') {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setFailReason((data as any).metadata?.reason ?? null)
          }
          setStep(derived)
        }
      } catch {
        setLoadError('Network error — please check your connection and reload.')
      }
    }
    void fetchSession()
  }, [sessionToken])

  // Stop camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
      }
      if (pollRef.current) {
        clearInterval(pollRef.current)
      }
    }
  }, [])

  // Start polling for status changes
  const startPolling = useCallback(
    (targetStatuses: string[], onMatch: (status: string, data: SessionInfo & { metadata?: { reason?: string } }) => void) => {
      if (pollRef.current) clearInterval(pollRef.current)
      pollRef.current = setInterval(async () => {
        try {
          const res = await fetch(`${API_URL}/v1/verifications/s/${sessionToken}`)
          if (!res.ok) return
          const data: SessionInfo & { metadata?: { reason?: string } } = await res.json()
          if (targetStatuses.includes(data.status)) {
            clearInterval(pollRef.current!)
            pollRef.current = null
            onMatch(data.status, data)
          }
        } catch {
          // swallow network errors during polling
        }
      }, 2000)
    },
    [sessionToken],
  )

  // --- Document upload ---
  const handleDocumentSubmit = useCallback(async () => {
    if (!frontFile) return
    setUploadError(null)
    setUploading(true)

    try {
      const needsBack = DOC_NEEDS_BACK.includes(docType)

      if (needsBack && backFile) {
        // Upload front (not final)
        const frontForm = new FormData()
        frontForm.append('file', frontFile)
        frontForm.append('side', 'front')
        frontForm.append('type', docType)
        frontForm.append('final', 'false')
        const frontRes = await fetch(`${API_URL}/v1/verifications/s/${sessionToken}/documents`, {
          method: 'POST',
          body: frontForm,
        })
        if (!frontRes.ok) {
          const err = await frontRes.json().catch(() => ({}))
          throw new Error((err as { message?: string }).message ?? 'Failed to upload front of document.')
        }

        // Upload back (final)
        const backForm = new FormData()
        backForm.append('file', backFile)
        backForm.append('side', 'back')
        backForm.append('type', docType)
        backForm.append('final', 'true')
        const backRes = await fetch(`${API_URL}/v1/verifications/s/${sessionToken}/documents`, {
          method: 'POST',
          body: backForm,
        })
        if (!backRes.ok) {
          const err = await backRes.json().catch(() => ({}))
          throw new Error((err as { message?: string }).message ?? 'Failed to upload back of document.')
        }
      } else {
        // Single-sided or no back provided: upload front as final
        const formData = new FormData()
        formData.append('file', frontFile)
        formData.append('side', 'front')
        formData.append('type', docType)
        formData.append('final', 'true')
        const res = await fetch(`${API_URL}/v1/verifications/s/${sessionToken}/documents`, {
          method: 'POST',
          body: formData,
        })
        if (!res.ok) {
          const err = await res.json().catch(() => ({}))
          throw new Error((err as { message?: string }).message ?? 'Failed to upload document.')
        }
      }

      setUploading(false)
      setStep('processing')
      startPolling(['awaiting_liveness', 'failed', 'completed'], (status, data) => {
        if (status === 'awaiting_liveness') setStep('liveness')
        else if (status === 'completed') setStep('complete')
        else {
          setFailReason(data.metadata?.reason ?? null)
          setStep('failed')
        }
      })
    } catch (e) {
      setUploading(false)
      setUploadError(e instanceof Error ? e.message : 'Upload failed. Please try again.')
    }
  }, [frontFile, backFile, docType, sessionToken, startPolling])

  // --- Liveness ---
  const startCamera = useCallback(async () => {
    setCameraError(null)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 640, height: 480 },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.onloadedmetadata = () => {
          void videoRef.current?.play()
          setCameraReady(true)
        }
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === 'NotAllowedError') {
        setCameraError('Camera access was denied. Please allow camera access in your browser settings and reload.')
      } else {
        setCameraError('Unable to access camera. Please ensure a camera is connected and try again.')
      }
    }
  }, [])

  // Fetch liveness challenge when entering that step
  useEffect(() => {
    if (step !== 'liveness') return
    async function fetchChallenge() {
      try {
        const res = await fetch(`${API_URL}/v1/verifications/s/${sessionToken}/liveness-challenge`)
        if (res.ok) {
          const data: { challenge: string; expiresAt: string } = await res.json()
          setChallenge(data.challenge)
        }
      } catch {
        // non-fatal — show a generic instruction if challenge fails
        setChallenge('Look directly at the camera')
      }
    }
    void fetchChallenge()
    void startCamera()

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
      setCameraReady(false)
    }
  }, [step, sessionToken, startCamera])

  const captureAndUpload = useCallback(async () => {
    const video = videoRef.current
    if (!video || !cameraReady) return
    setLivenessError(null)
    setCapturing(true)

    try {
      // Capture 4 frames with brief gaps
      const frames: Blob[] = []
      for (let i = 0; i < 4; i++) {
        await new Promise<void>((resolve) => setTimeout(resolve, 300))
        const canvas = document.createElement('canvas')
        canvas.width = video.videoWidth || 640
        canvas.height = video.videoHeight || 480
        canvas.getContext('2d')!.drawImage(video, 0, 0)
        const blob = await new Promise<Blob>((resolve, reject) => {
          canvas.toBlob(
            (b) => {
              if (b) resolve(b)
              else reject(new Error('Frame capture failed'))
            },
            'image/jpeg',
            0.85,
          )
        })
        frames.push(blob)
      }
      setCapturing(false)
      setLivenessUploading(true)

      const formData = new FormData()
      frames.forEach((blob) => formData.append('frames', blob, 'frame.jpg'))
      const res = await fetch(`${API_URL}/v1/verifications/s/${sessionToken}/liveness`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error((err as { message?: string }).message ?? 'Liveness upload failed.')
      }

      setLivenessUploading(false)
      // Stop camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop())
        streamRef.current = null
      }
      setStep('processing')
      startPolling(['completed', 'failed'], (status, data) => {
        if (status === 'completed') setStep('complete')
        else {
          setFailReason(data.metadata?.reason ?? null)
          setStep('failed')
        }
      })
    } catch (e) {
      setCapturing(false)
      setLivenessUploading(false)
      setLivenessError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    }
  }, [cameraReady, sessionToken, startPolling])

  // ─── Render ───────────────────────────────────────────────────────────────

  const displayToken = sessionToken ? `${sessionToken.slice(0, 12)}...` : ''

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="w-full max-w-[480px] flex flex-col items-center gap-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cta/10 flex items-center justify-center">
            <ShieldCheck className="w-7 h-7 text-cta" />
          </div>
          <h1 className="text-[22px] font-bold text-white text-center">Identity Verification</h1>
          <p className="text-[12px] font-mono text-text-disabled">Session: {displayToken}</p>
        </div>

        {/* Card */}
        <div className="w-full bg-surface rounded-xl border border-border p-8 flex flex-col items-center gap-6">

          {/* Load error */}
          {loadError && (
            <>
              <div className="w-16 h-16 rounded-full bg-error/15 border border-error/30 flex items-center justify-center">
                <XCircle className="w-9 h-9 text-error" />
              </div>
              <div className="text-center">
                <h2 className="text-[18px] font-semibold text-white mb-2">Session Unavailable</h2>
                <p className="text-[14px] text-text-secondary">{loadError}</p>
              </div>
            </>
          )}

          {/* Intro */}
          {!loadError && step === 'intro' && (
            <>
              {session === null ? (
                <Loader2 className="w-8 h-8 text-cta animate-spin" />
              ) : (
                <>
                  <div className="text-[40px]">🪪</div>
                  <div className="text-center">
                    <h2 className="text-[18px] font-semibold text-white mb-2">Verify Your Identity</h2>
                    <p className="text-[14px] text-text-secondary">
                      You&apos;ll need a government-issued ID and a few minutes.
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    {[
                      "Government-issued ID (passport or driver's license)",
                      'Liveness check (selfie)',
                      'Usually takes 2–3 minutes',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle className="w-4 h-4 text-success shrink-0" />
                        <span className="text-[14px] text-text-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setStep('document')}
                    className="w-full h-11 bg-cta hover:bg-cta/90 text-white text-[15px] font-semibold rounded-md transition-colors"
                  >
                    Start Verification
                  </button>
                </>
              )}
            </>
          )}

          {/* Document upload */}
          {!loadError && step === 'document' && (
            <>
              <Upload className="w-12 h-12 text-cta" />
              <div className="text-center">
                <h2 className="text-[18px] font-semibold text-white mb-2">Upload Your ID</h2>
                <p className="text-[14px] text-text-secondary">
                  Select your document type and upload a clear photo.
                </p>
              </div>

              {/* Document type selector */}
              <div className="w-full grid grid-cols-2 gap-2">
                {(Object.keys(DOC_TYPE_LABELS) as DocType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setDocType(type)
                      setFrontFile(null)
                      setBackFile(null)
                    }}
                    className={[
                      'h-10 rounded-md border text-[13px] font-medium transition-colors',
                      docType === type
                        ? 'border-cta bg-cta/10 text-cta'
                        : 'border-border bg-transparent text-text-secondary hover:border-cta/40 hover:text-white',
                    ].join(' ')}
                  >
                    {DOC_TYPE_LABELS[type]}
                  </button>
                ))}
              </div>

              {/* Front upload */}
              <div className="w-full flex flex-col gap-2">
                <span className="text-[12px] font-medium text-text-secondary uppercase tracking-wide">
                  {DOC_NEEDS_BACK.includes(docType) ? 'Front side' : 'Document photo'}
                </span>
                <button
                  type="button"
                  onClick={() => frontInputRef.current?.click()}
                  className={[
                    'w-full h-[120px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 transition-colors',
                    frontFile
                      ? 'border-success/50 bg-success/5'
                      : 'border-border hover:border-cta/50 cursor-pointer',
                  ].join(' ')}
                >
                  {frontFile ? (
                    <>
                      <CheckCircle className="w-6 h-6 text-success" />
                      <span className="text-[13px] text-success truncate max-w-[280px] px-4">{frontFile.name}</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-text-secondary" />
                      <span className="text-[13px] text-text-secondary">Click to upload</span>
                    </>
                  )}
                </button>
                <input
                  ref={frontInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFrontFile(e.target.files?.[0] ?? null)}
                />
              </div>

              {/* Back upload (conditional) */}
              {DOC_NEEDS_BACK.includes(docType) && (
                <div className="w-full flex flex-col gap-2">
                  <span className="text-[12px] font-medium text-text-secondary uppercase tracking-wide">
                    Back side <span className="normal-case text-text-disabled">(optional)</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => backInputRef.current?.click()}
                    className={[
                      'w-full h-[120px] border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-2 transition-colors',
                      backFile
                        ? 'border-success/50 bg-success/5'
                        : 'border-border hover:border-cta/50 cursor-pointer',
                    ].join(' ')}
                  >
                    {backFile ? (
                      <>
                        <CheckCircle className="w-6 h-6 text-success" />
                        <span className="text-[13px] text-success truncate max-w-[280px] px-4">{backFile.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-text-secondary" />
                        <span className="text-[13px] text-text-secondary">Click to upload (optional)</span>
                      </>
                    )}
                  </button>
                  <input
                    ref={backInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setBackFile(e.target.files?.[0] ?? null)}
                  />
                </div>
              )}

              {uploadError && (
                <div className="w-full flex items-start gap-2 p-3 rounded-lg bg-error/10 border border-error/20">
                  <AlertCircle className="w-4 h-4 text-error shrink-0 mt-0.5" />
                  <p className="text-[13px] text-error">{uploadError}</p>
                </div>
              )}

              <button
                onClick={() => void handleDocumentSubmit()}
                disabled={!frontFile || uploading}
                className="w-full h-11 bg-cta hover:bg-cta/90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-md transition-colors flex items-center justify-center gap-2"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Continue'
                )}
              </button>
            </>
          )}

          {/* Liveness check */}
          {!loadError && step === 'liveness' && (
            <>
              <Camera className="w-12 h-12 text-cta" />
              <div className="text-center">
                <h2 className="text-[18px] font-semibold text-white mb-2">Liveness Check</h2>
                {challenge ? (
                  <p className="text-[14px] text-text-secondary">
                    <span className="text-white font-medium">{challenge}</span>
                  </p>
                ) : (
                  <p className="text-[14px] text-text-secondary">Look at the camera and follow the instructions.</p>
                )}
              </div>

              {cameraError ? (
                <div className="w-full flex items-start gap-2 p-3 rounded-lg bg-error/10 border border-error/20">
                  <AlertCircle className="w-4 h-4 text-error shrink-0 mt-0.5" />
                  <p className="text-[13px] text-error">{cameraError}</p>
                </div>
              ) : (
                <div className="w-[280px] h-[280px] rounded-full border-2 border-cta/30 bg-elevated overflow-hidden flex items-center justify-center relative">
                  <video
                    ref={videoRef}
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {!cameraReady && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="w-8 h-8 text-cta animate-spin" />
                    </div>
                  )}
                </div>
              )}

              {livenessError && (
                <div className="w-full flex items-start gap-2 p-3 rounded-lg bg-error/10 border border-error/20">
                  <AlertCircle className="w-4 h-4 text-error shrink-0 mt-0.5" />
                  <p className="text-[13px] text-error">{livenessError}</p>
                </div>
              )}

              <button
                onClick={() => void captureAndUpload()}
                disabled={!cameraReady || capturing || livenessUploading || !!cameraError}
                className="w-full h-11 bg-cta hover:bg-cta/90 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[15px] font-semibold rounded-md transition-colors flex items-center justify-center gap-2"
              >
                {capturing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Capturing frames...
                  </>
                ) : livenessUploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  'Take Selfie'
                )}
              </button>
            </>
          )}

          {/* Processing / polling */}
          {!loadError && step === 'processing' && (
            <>
              <div className="w-16 h-16 rounded-full border-4 border-cta/20 border-t-cta animate-spin" />
              <div className="text-center">
                <h2 className="text-[18px] font-semibold text-white mb-2">Verifying...</h2>
                <p className="text-[14px] text-text-secondary">This usually takes a few seconds. Please wait.</p>
              </div>
            </>
          )}

          {/* Complete */}
          {!loadError && step === 'complete' && (
            <>
              <div className="w-16 h-16 rounded-full bg-success/15 border border-success/30 flex items-center justify-center">
                <ShieldCheck className="w-9 h-9 text-success" />
              </div>
              <div className="text-center">
                <h2 className="text-[18px] font-semibold text-white mb-2">Verification Complete</h2>
                <p className="text-[14px] text-text-secondary">
                  Your identity has been verified successfully. You can now close this window.
                </p>
              </div>
            </>
          )}

          {/* Failed */}
          {!loadError && step === 'failed' && (
            <>
              <div className="w-16 h-16 rounded-full bg-error/15 border border-error/30 flex items-center justify-center">
                <XCircle className="w-9 h-9 text-error" />
              </div>
              <div className="text-center">
                <h2 className="text-[18px] font-semibold text-white mb-2">Verification Failed</h2>
                <p className="text-[14px] text-text-secondary">
                  {failReason ?? 'We were unable to verify your identity. Please contact the service provider for assistance.'}
                </p>
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <p className="text-[11px] text-text-disabled text-center">
          Powered by Solidus Verify · Your data is encrypted and secure
        </p>
      </div>
    </div>
  )
}
