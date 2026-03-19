'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AccesoPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/site-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.message || 'Contraseña incorrecta')
        return
      }
      window.location.href = '/'
    } catch {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-sand-100 to-sand-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-sand-200 bg-white p-8 shadow-lg">
        <h1 className="text-center font-serif text-2xl font-semibold text-stone-800">
          Acceso privado
        </h1>
        <p className="mt-2 text-center text-sm text-stone-500">
          Introduce la contraseña que te compartieron para entrar.
        </p>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="label block" htmlFor="site-password">
              Contraseña
            </label>
            <input
              autoFocus
              className="input-field mt-1 w-full"
              disabled={loading}
              id="site-password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            className="btn-primary w-full py-3"
            disabled={loading}
            type="submit"
          >
            {loading ? 'Comprobando…' : 'Entrar'}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-stone-400">
          Boda y Bautizo · Sitio privado para invitados
        </p>
      </div>
      <Link
        className="mt-6 text-sm text-stone-500 underline hover:text-stone-700"
        href="/"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
