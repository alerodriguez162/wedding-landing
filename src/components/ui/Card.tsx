import type { ReactNode } from 'react'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`card p-6 sm:p-8 lg:p-9 ${className}`}>{children}</div>
}
