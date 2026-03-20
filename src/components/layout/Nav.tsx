'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { AdminLoginModal } from '@/components/admin/AdminLoginModal'

const SECTION_GROUPS = [
  {
    title: 'El evento',
    items: [
      { id: 'welcome', label: 'Bienvenida' },
      { id: 'program', label: 'Programa' },
      { id: 'dress-code', label: 'Dress code' },
      { id: 'gifts', label: 'Regalos' },
    ],
  },
  {
    title: 'Viaje y estancia',
    items: [
      { id: 'flights', label: 'Vuelos' },
      { id: 'lodging', label: 'Hospedaje' },
      { id: 'transfers', label: 'Traslados' },
    ],
  },
  {
    title: 'Participación',
    items: [
      { id: 'meals', label: 'Platillos' },
      { id: 'makeup', label: 'Maquillaje' },
      { id: 'photos', label: 'Fotos' },
      { id: 'contact', label: 'Contacto' },
    ],
  },
] as const

const HERO_ID = 'hero'

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)
  const router = useRouter()
  const menuPanelRef = useRef<HTMLDivElement>(null)

  const openAdminModal = () => {
    setIsMenuOpen(false)
    setIsAdminModalOpen(true)
  }

  const closeAdminModal = () => setIsAdminModalOpen(false)

  const handleAdminSuccess = () => {
    setIsAdminModalOpen(false)
    router.push('/admin')
  }

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMenuOpen(false)
  }

  const scrollToHero = () => scrollToSection(HERO_ID)

  const handleSectionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.sectionId
    if (id) scrollToSection(id)
  }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isMenuOpen])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isMenuOpen])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-sand-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="relative z-[60] mx-auto flex h-14 max-w-5xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
          <button
            className="min-w-0 shrink font-serif text-base font-semibold text-stone-800 sm:text-lg"
            type="button"
            onClick={scrollToHero}
          >
            Boda & Bautizo
          </button>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <button
              aria-controls="site-sections-menu"
              aria-expanded={isMenuOpen}
              aria-haspopup="dialog"
              className="flex items-center gap-1.5 rounded-full border border-sand-200/90 bg-sand-50/80 px-3 py-2 text-sm font-medium text-stone-700 shadow-sm transition hover:border-sand-300 hover:bg-sand-100 hover:text-stone-900"
              type="button"
              onClick={toggleMenu}
            >
              <span className="hidden min-[400px]:inline">Secciones</span>
              <span className="min-[400px]:hidden">Menú</span>
              <svg
                aria-hidden
                className={`h-4 w-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            </button>

            <button
              aria-label="Panel de administración"
              className="rounded-full p-2 text-stone-500 transition hover:bg-sand-100 hover:text-stone-700"
              title="Admin"
              type="button"
              onClick={openAdminModal}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                />
                <path
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                />
              </svg>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <>
              <motion.button
                animate={{ opacity: 1 }}
                aria-label="Cerrar menú"
                className="fixed inset-x-0 bottom-0 top-14 z-40 cursor-default bg-stone-900/35 backdrop-blur-[2px] sm:top-16"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                type="button"
                onClick={() => setIsMenuOpen(false)}
              />
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                aria-labelledby="sections-menu-title"
                aria-modal="true"
                className="fixed left-3 right-3 top-[3.75rem] z-50 max-h-[min(78vh,calc(100dvh-5rem))] overflow-hidden rounded-2xl border border-sand-200/90 bg-white shadow-2xl sm:left-auto sm:right-4 sm:top-[4.25rem] sm:w-[min(100%,28rem)]"
                exit={{ opacity: 0, y: -8 }}
                id="site-sections-menu"
                initial={{ opacity: 0, y: -8 }}
                ref={menuPanelRef}
                role="dialog"
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="border-b border-sand-100 bg-sand-50/50 px-4 py-3 sm:px-5">
                  <h2 className="text-sm font-semibold tracking-wide text-stone-500" id="sections-menu-title">
                    Ir a la sección
                  </h2>
                </div>
                <div className="max-h-[min(62vh,calc(100dvh-11rem))] overflow-y-auto overscroll-contain px-3 py-3 sm:px-4 sm:py-4">
                  <button
                    className="mb-3 flex w-full items-center gap-2 rounded-xl border border-sand-200/80 bg-white px-3 py-3 text-left text-sm font-medium text-stone-800 shadow-sm transition hover:border-amber-200/80 hover:bg-amber-50/50"
                    type="button"
                    onClick={() => scrollToSection(HERO_ID)}
                  >
                    <span
                      aria-hidden
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-sand-100 text-stone-600"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
                      </svg>
                    </span>
                    Inicio (portada)
                  </button>

                  <div className="grid gap-5 sm:gap-6">
                    {SECTION_GROUPS.map((group) => (
                      <div key={group.title}>
                        <p className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-stone-400">
                          {group.title}
                        </p>
                        <ul className="grid gap-1">
                          {group.items.map((section) => (
                            <li key={section.id}>
                              <button
                                className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-stone-700 transition hover:bg-sand-100 hover:text-stone-900"
                                data-section-id={section.id}
                                type="button"
                                onClick={handleSectionClick}
                              >
                                {section.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 border-t border-sand-100 pt-3">
                    <button
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-stone-500 transition hover:bg-sand-50 hover:text-stone-700"
                      type="button"
                      onClick={openAdminModal}
                    >
                      <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                        />
                        <path
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                        />
                      </svg>
                      Acceso administración
                    </button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>

      <AdminLoginModal
        isOpen={isAdminModalOpen}
        onClose={closeAdminModal}
        onSuccess={handleAdminSuccess}
      />
    </>
  )
}
