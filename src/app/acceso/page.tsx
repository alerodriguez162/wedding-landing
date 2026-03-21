'use client'

import { useEffect, useState } from 'react'

function safeRedirectPath(from: string | null): string {
  if (!from || !from.startsWith('/') || from.startsWith('//') || from.includes('..')) {
    return '/'
  }
  return from
}

/**
 * Contraseña embebida en el QR vía fragmento (#c=...).
 * El hash no se envía al servidor al cargar la página (mejor que ?p= en la query).
 */
function readPasswordFromHash(): string | null {
  if (typeof window === 'undefined') return null
  const raw = window.location.hash.startsWith('#')
    ? window.location.hash.slice(1)
    : window.location.hash
  const params = new URLSearchParams(raw)
  const encoded = params.get('c')
  if (!encoded) return null
  try {
    return decodeURIComponent(encoded)
  } catch {
    return null
  }
}

export default function AccesoPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [redirectTo, setRedirectTo] = useState('/')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const redirect = safeRedirectPath(params.get('from'))
    setRedirectTo(redirect)

    const fromHash = readPasswordFromHash()
    if (fromHash) {
      window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
      setPassword(fromHash)
      setLoading(true)
      setError('')
      void (async () => {
        try {
          const res = await fetch('/api/site-auth', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password: fromHash }),
          })
          const data = await res.json()
          if (!res.ok) {
            setError(data.message || 'Contraseña incorrecta')
            return
          }
          window.location.href = redirect
        } catch {
          setError('Error de conexión. Intenta de nuevo.')
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [])

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
      window.location.href = redirectTo
    } catch {
      setError('Error de conexión. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blush-100 to-blush-50 px-4">
      <div className="w-full max-w-sm rounded-2xl border border-blush-200/80 bg-white p-8 shadow-lg">
        <h1 className="text-center font-serif text-2xl font-semibold text-stone-800">
          Acceso privado
        </h1>
        <p className="mt-2 text-center text-sm text-stone-500">
          Introduce la contraseña que te compartieron para entrar.
        </p>
        <p className="mt-3 text-center text-xs text-stone-400">
          Si entraste con un QR con enlace mágico, la clave se aplica sola de forma segura.
        </p>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="label" htmlFor="site-password">
              Contraseña
            </label>
            <input
              autoFocus
              className="input-field w-full"
              disabled={loading}
              id="site-password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
          </div>
          <div className="pt-1">
            <button className="btn-primary w-full py-3" disabled={loading} type="submit">
              {loading ? 'Comprobando…' : 'Entrar'}
            </button>
          </div>
        </form>
        <p className="mt-6 text-center text-xs text-stone-400">
          Boda y Bautismo · Sitio privado para invitados
        </p>
      </div>
    </div>
  )
}
