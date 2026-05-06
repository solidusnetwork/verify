import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="flex flex-col items-center text-center max-w-[500px]">
        <h1 className="text-[96px] font-bold text-elevated leading-none mb-6 font-mono tracking-tighter select-none">
          404
        </h1>
        <h2 className="text-[28px] font-semibold text-white mb-3">Page not found</h2>
        <p className="text-[14px] text-text-secondary mb-8 max-w-[400px]">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="h-11 px-6 bg-cta hover:bg-cta/90 text-white text-[14px] font-semibold rounded-md transition-colors"
          >
            Back to Dashboard
          </Link>
          <Link
            href="/"
            className="h-11 px-6 bg-transparent hover:bg-elevated text-white text-[14px] font-medium rounded-md transition-colors border border-border"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  )
}
