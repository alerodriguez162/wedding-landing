import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Administración | Boda y Bautismo',
  robots: 'noindex, nofollow',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sand-100 via-sand-50 to-blush-50/30">
      {children}
    </div>
  )
}
