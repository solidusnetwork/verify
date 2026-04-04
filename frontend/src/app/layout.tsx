import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'
import { AuthProvider } from '../lib/auth'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Solidus Verify',
  description: 'Decentralized KYC verification powered by the Solidus Protocol',
  icons: { icon: '/favicon.ico' },
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
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-TSRL8T1QXV" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-TSRL8T1QXV');
        `}</Script>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
