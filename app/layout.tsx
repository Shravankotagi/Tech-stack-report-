import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tech Stack Auditor — Enlight Lab',
  description:
    'Paste your tech stack or job listing and get an instant AI-powered risk and gap analysis with Enlight Lab service recommendations.',
  keywords: [
    'tech stack audit',
    'architecture review',
    'CTO tool',
    'engineering audit',
    'Enlight Lab',
    'scalability assessment',
  ],
  openGraph: {
    title: 'Tech Stack Auditor — Enlight Lab',
    description:
      'Get an instant AI-powered audit of your tech stack. Identify risks, gaps, and get expert recommendations.',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'Enlight Lab',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Stack Auditor — Enlight Lab',
    description: 'Instant AI-powered tech stack risk and gap analysis.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-el-bg flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0f172a',
              color: '#fff',
              border: '1px solid #1e2d6b',
            },
          }}
        />
      </body>
    </html>
  )
}