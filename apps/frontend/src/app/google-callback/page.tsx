'use client'

import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function GoogleCallbackInner() {
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const token = searchParams.get('token')
    if (token) {
      localStorage.setItem('accessToken', token)
      window.location.href = '/'
    } else {
      router.replace('/login?error=google_auth_failed')
    }
  }, [router, searchParams])

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-cta border-t-transparent rounded-full animate-spin" />
        <p className="text-[14px] text-text-secondary">Completing sign in...</p>
      </div>
    </div>
  )
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-cta border-t-transparent rounded-full animate-spin" />
          <p className="text-[14px] text-text-secondary">Loading...</p>
        </div>
      </div>
    }>
      <GoogleCallbackInner />
    </Suspense>
  )
}
