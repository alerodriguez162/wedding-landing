'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { AdminLoginModal } from '@/components/admin/AdminLoginModal'
import { getAdultDishLabel } from '@/lib/menu-options'
import { getMakeupServiceLabel } from '@/lib/admin-labels'

type Tab = 'meals' | 'lodging' | 'makeup'

export default function AdminPage() {
  const [auth, setAuth] = useState<boolean | null>(null)
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [tab, setTab] = useState<Tab>('meals')
  const [meals, setMeals] = useState<Array<Record<string, unknown>>>([])
  const [lodging, setLodging] = useState<Array<Record<string, unknown>>>([])
  const [makeup, setMakeup] = useState<Array<Record<string, unknown>>>([])

  useEffect(() => {
    fetch('/api/admin/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => setAuth(d.authenticated === true))
      .catch(() => setAuth(false))
  }, [])

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)
  const handleLoginSuccess = () => {
    setAuth(true)
    setIsLoginModalOpen(false)
  }

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'include' })
    setAuth(false)
  }

  const handleTabClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.tab as Tab | undefined
    if (id) setTab(id)
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.dataset.id
    if (id) updatePayment(id, e.target.value)
  }

  const loadData = async (t: Tab) => {
    const cred = { credentials: 'include' as RequestCredentials }
    if (t === 'meals') {
      const r = await fetch('/api/admin/data/meals', cred)
      if (r.ok) setMeals(await r.json())
    } else if (t === 'lodging') {
      const r = await fetch('/api/admin/data/lodging', cred)
      if (r.ok) setLodging(await r.json())
    } else if (t === 'makeup') {
      const r = await fetch('/api/admin/data/makeup', cred)
      if (r.ok) setMakeup(await r.json())
    }
  }

  useEffect(() => {
    if (auth) loadData(tab)
  }, [auth, tab])

  const updatePayment = async (id: string, paymentStatus: string) => {
    await fetch('/api/admin/data/lodging', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, paymentStatus }),
      credentials: 'include',
    })
    loadData('lodging')
  }

  if (auth === null) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold-500 border-t-transparent" />
        <p className="text-sm font-medium text-stone-500">Verificando sesión…</p>
      </div>
    )
  }

  if (!auth) {
    return (
      <div className="mx-auto max-w-5xl p-4 sm:p-6">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sand-200/80 bg-white/80 px-5 py-4 shadow-sm backdrop-blur sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition hover:text-gold-600"
              href="/"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
              Volver al sitio
            </Link>
            <span className="hidden text-stone-300 sm:inline">|</span>
            <h1 className="font-serif text-xl font-semibold text-stone-800 sm:text-2xl">
              Panel de administración
            </h1>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-xl bg-stone-800 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-stone-700"
            type="button"
            onClick={openLoginModal}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
              />
            </svg>
            Iniciar sesión
          </button>
        </header>

        <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-sand-200/80 bg-white/60 p-8 text-center backdrop-blur">
          <p className="text-stone-500">
            Inicia sesión para ver y gestionar las respuestas del evento.
          </p>
          <button
            className="mt-4 text-gold-600 font-medium hover:underline"
            type="button"
            onClick={openLoginModal}
          >
            Abrir inicio de sesión
          </button>
        </div>

        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          onSuccess={handleLoginSuccess}
        />
      </div>
    )
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'meals', label: 'Platillos' },
    { id: 'lodging', label: 'Hospedaje' },
    { id: 'makeup', label: 'Maquillaje' },
  ]

  return (
    <div className="mx-auto max-w-5xl p-4 pb-12 sm:p-6">
      <header className="mb-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sand-200/80 bg-white/80 px-5 py-4 shadow-sm backdrop-blur sm:px-6">
        <div className="flex items-center gap-4">
          <Link
            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 transition hover:text-gold-600"
            href="/"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Volver al sitio
          </Link>
          <span className="hidden text-stone-300 sm:inline">|</span>
          <h1 className="font-serif text-xl font-semibold text-stone-800 sm:text-2xl">
            Panel de administración
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <a
            download
            className="inline-flex items-center gap-2 rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-sand-50"
            href="/api/admin/export/csv?type=all"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Exportar CSV
          </a>
          <button
            className="inline-flex items-center gap-2 rounded-xl border border-sand-200 bg-white px-4 py-2.5 text-sm font-medium text-stone-700 shadow-sm transition hover:bg-sand-50"
            type="button"
            onClick={logout}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
            Cerrar sesión
          </button>
        </div>
      </header>

      <nav
        aria-label="Secciones"
        className="mb-6 flex gap-1 overflow-x-auto rounded-xl border border-sand-200/80 bg-white/80 p-1.5 shadow-sm backdrop-blur"
      >
        {tabs.map((tabItem) => (
          <button
            className={`rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition ${
              tab === tabItem.id
                ? 'bg-stone-800 text-white shadow'
                : 'text-stone-600 hover:bg-sand-100 hover:text-stone-800'
            }`}
            data-tab={tabItem.id}
            key={tabItem.id}
            type="button"
            onClick={handleTabClick}
          >
            {tabItem.label}
          </button>
        ))}
      </nav>

      <div className="rounded-2xl border border-sand-200/80 bg-white/95 p-5 shadow-sm backdrop-blur sm:p-6">
        {tab === 'meals' && (
          <div className="space-y-4">
            <h2 className="font-semibold text-stone-800">
              Selecciones de platillo ({meals.length})
            </h2>
            {meals.length === 0 ? (
              <p className="text-stone-500">Sin registros</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-sand-200 text-left">
                      <th className="p-2">Remitente</th>
                      <th className="p-2">Asistente</th>
                      <th className="p-2">Voto (plato)</th>
                      <th className="p-2">Notas</th>
                      <th className="p-2">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {meals.map((m: Record<string, unknown>) => (
                      <tr className="border-b border-sand-100" key={String(m.id)}>
                        <td className="p-2">{String(m.senderName)}</td>
                        <td className="p-2">{String(m.attendeeName || '-')}</td>
                        <td className="p-2">
                          <span className="font-medium text-stone-800">
                            {getAdultDishLabel(String(m.adultMainDish))}
                          </span>
                          <span className="ml-1 text-xs text-stone-400">({String(m.adultMainDish)})</span>
                        </td>
                        <td
                          className="p-2 max-w-[220px] truncate text-xs"
                          title={m.notes ? String(m.notes) : ''}
                        >
                          {m.notes ? String(m.notes) : '—'}
                        </td>
                        <td className="p-2 text-stone-500">
                          {new Date(String(m.createdAt)).toLocaleString('es-MX')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'lodging' && (
          <div className="space-y-4">
            <h2 className="font-semibold text-stone-800">
              Solicitudes de hospedaje ({lodging.length})
            </h2>
            {lodging.length === 0 ? (
              <p className="text-stone-500">Sin registros</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-sand-200 text-left">
                      <th className="p-2">Nombre</th>
                      <th className="p-2">Total</th>
                      <th className="p-2">Adultos</th>
                      <th className="p-2">Niños</th>
                      <th className="p-2">Llegada</th>
                      <th className="p-2">Salida</th>
                      <th className="p-2">Noches</th>
                      <th className="p-2">Habitación(es)</th>
                      <th className="p-2">Detalle</th>
                      <th className="p-2">Compartir</th>
                      <th className="p-2">Notas</th>
                      <th className="p-2">Estado pago</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lodging.map((r: Record<string, unknown>) => (
                      <tr className="border-b border-sand-100" key={String(r.id)}>
                        <td className="p-2">{String(r.name)}</td>
                        <td className="p-2">{String(r.numberOfPeople)}</td>
                        <td className="p-2">{String(r.adults ?? '—')}</td>
                        <td className="p-2">{String(r.children ?? '—')}</td>
                        <td className="p-2">
                          {r.arrivalDate
                            ? new Date(String(r.arrivalDate)).toLocaleDateString('es-MX')
                            : '-'}
                        </td>
                        <td className="p-2">
                          {r.departureDate
                            ? new Date(String(r.departureDate)).toLocaleDateString('es-MX')
                            : '-'}
                        </td>
                        <td className="p-2">{r.nights != null ? String(r.nights) : '—'}</td>
                        <td className="p-2">
                          {r.roomsNeeded != null ? String(r.roomsNeeded) : '-'}
                        </td>
                        <td
                          className="p-2 max-w-[180px] truncate text-xs"
                          title={String(r.roomBreakdown || '')}
                        >
                          {r.roomBreakdown ? String(r.roomBreakdown) : '-'}
                        </td>
                        <td className="p-2">{r.willingToShare ? 'Sí' : 'No'}</td>
                        <td
                          className="p-2 max-w-[220px] truncate text-xs"
                          title={r.notes ? String(r.notes) : ''}
                        >
                          {r.notes ? String(r.notes) : '—'}
                        </td>
                        <td className="p-2">
                          <select
                            className="rounded border border-sand-300 text-xs"
                            data-id={String(r.id)}
                            value={String(r.paymentStatus)}
                            onChange={handlePaymentChange}
                          >
                            <option value="pending">Pendiente</option>
                            <option value="paid">Pagado</option>
                            <option value="cancelled">Cancelado</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === 'makeup' && (
          <div className="space-y-4">
            <h2 className="font-semibold text-stone-800">Maquillaje y peinado ({makeup.length})</h2>
            {makeup.length === 0 ? (
              <p className="text-stone-500">Sin registros</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-sand-200 text-left">
                      <th className="p-2">Nombre</th>
                      <th className="p-2">Personas</th>
                      <th className="p-2">Servicio</th>
                      <th className="p-2">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {makeup.map((m: Record<string, unknown>) => (
                      <tr className="border-b border-sand-100" key={String(m.id)}>
                        <td className="p-2">{String(m.name)}</td>
                        <td className="p-2">{String(m.peopleCount)}</td>
                        <td className="p-2">{getMakeupServiceLabel(String(m.serviceType))}</td>
                        <td className="p-2 text-stone-500">
                          {new Date(String(m.createdAt)).toLocaleString('es-MX')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  )
}
