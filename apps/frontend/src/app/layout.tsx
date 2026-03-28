import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '../lib/auth'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Solidus Verify',
  description: 'Decentralized KYC verification powered by the Solidus Protocol',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Prevent flash: apply stored theme before first paint */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark');document.documentElement.classList.add('light');}})()` }} />
      </head>
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
