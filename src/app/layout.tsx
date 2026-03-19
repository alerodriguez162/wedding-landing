import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit } from 'next/font/google'
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
  title: 'Dulce Fabiola & José Eduardo | Boda y Bautizo',
  description:
    'Celebra con nosotros el 25 de abril de 2026 en Beach Club. Boda de Dulce Fabiola Rodríguez Miranda y José Eduardo José, y bautizo de Julieta José Rodríguez.',
  openGraph: {
    title: 'Dulce Fabiola & José Eduardo | Boda y Bautizo',
    description: '25 de abril de 2026 · Beach Club',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={`${cormorant.variable} ${outfit.variable}`} lang="es">
      <body className="font-sans min-h-screen">{children}</body>
    </html>
  )
}
