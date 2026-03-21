import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit } from 'next/font/google'
import {
  SITE_METADATA_DESCRIPTION,
  SITE_METADATA_TITLE,
  SITE_OG_DESCRIPTION,
} from '@/lib/constants'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: SITE_METADATA_TITLE,
  description: SITE_METADATA_DESCRIPTION,
  openGraph: {
    title: SITE_METADATA_TITLE,
    description: SITE_OG_DESCRIPTION,
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${cormorant.variable} ${outfit.variable}`} lang="es">
      <body className="font-sans min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
