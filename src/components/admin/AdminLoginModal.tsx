'use client'

import { useState, useEffect } from 'react'

type AdminLoginModalProps = {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export function AdminLoginModal({ isOpen, onClose, onSuccess }: AdminLoginModalProps) {
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    setPassword('')
    setLoginError('')
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return () => {}
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !loading) onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, loading, onClose])

  const handleClose = () => {
    if (!loading) onClose()
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include',
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Error')
      onSuccess()
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      aria-labelledby="admin-login-modal-title"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
    >
      <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-sm" onClick={handleClose} />
      <div className="relative w-full max-w-md rounded-3xl border border-sand-200/80 bg-white p-8 shadow-2xl sm:p-10">
        <button
          aria-label="Cerrar"
          className="absolute right-4 top-4 rounded-lg p-2 text-stone-400 hover:bg-sand-100 hover:text-stone-600"
          type="button"
          onClick={handleClose}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </button>
        <div className="mb-6 flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-600">
            <svg
              aria-hidden
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
              />
            </svg>
          </div>
        </div>
        <h2
          className="text-center font-serif text-2xl font-semibold text-stone-800"
          id="admin-login-modal-title"
        >
          Iniciar sesión
        </h2>
        <p className="mt-2 text-center text-sm text-stone-500">
          Introduce tu contraseña para acceder al panel
        </p>
        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="form-field">
            <label className="label" htmlFor="admin-login-password">
              Contraseña
            </label>
            <input
              autoFocus
              autoComplete="current-password"
              className="input-field w-full"
              disabled={loading}
              id="admin-login-password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {loginError && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700">
              <svg
                className="h-5 w-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              {loginError}
            </div>
          )}
          <button className="btn-primary w-full py-3.5 text-base" disabled={loading} type="submit">
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Entrando…
              </span>
            ) : (
              'Entrar'
            )}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-stone-400">
          Boda y Bautismo · Acceso restringido
        </p>
      </div>
    </div>
  )
}
