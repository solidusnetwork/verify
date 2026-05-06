'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck } from 'lucide-react'

export default function VerifyRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 3000)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <ShieldCheck className="w-12 h-12 text-[#0066FF] mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-white mb-2">
          Verification sessions are initiated via the API
        </h1>
        <p className="text-sm text-[#8E8E93] mb-4">
          Create a verification session using your API key, then redirect users to the session URL.
          See the API documentation for details.
        </p>
        <p className="text-xs text-[#48484F]">Redirecting to dashboard...</p>
      </div>
    </div>
  )
}
