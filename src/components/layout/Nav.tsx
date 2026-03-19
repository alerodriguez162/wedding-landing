'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { AdminLoginModal } from '@/components/admin/AdminLoginModal'

const SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'welcome', label: 'Bienvenida' },
  { id: 'meals', label: 'Platillos' },
  { id: 'flights', label: 'Vuelos' },
  { id: 'lodging', label: 'Hospedaje' },
  { id: 'transfers', label: 'Traslados' },
  { id: 'makeup', label: 'Maquillaje' },
  { id: 'photos', label: 'Fotos' },
  { id: 'contact', label: 'Contacto' },
]

export function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false)
  const router = useRouter()

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

  const scrollToHero = () => scrollToSection('hero')

  const handleSectionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.dataset.sectionId
    if (id) scrollToSection(id)
  }

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-sand-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <button
            className="font-serif text-lg font-semibold text-stone-800"
            type="button"
            onClick={scrollToHero}
          >
            Boda & Bautizo
          </button>
          <div className="hidden items-center gap-1 sm:flex">
            {SECTIONS.slice(1).map((section) => (
              <button
                className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 hover:bg-sand-100 hover:text-stone-800"
                data-section-id={section.id}
                key={section.id}
                type="button"
                onClick={handleSectionClick}
              >
                {section.label}
              </button>
            ))}
            <button
              className="ml-2 flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-stone-500 hover:bg-sand-100 hover:text-stone-700"
              title="Panel de administración"
              type="button"
              onClick={openAdminModal}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              Admin
            </button>
          </div>
          <div className="flex items-center gap-1 sm:hidden">
            <button
              aria-label="Admin"
              className="rounded-lg p-2 text-stone-500 hover:bg-sand-100"
              title="Panel de administración"
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
            <button
              aria-label="Abrir menú"
              className="rounded-lg p-2 text-stone-600 hover:bg-sand-100"
              type="button"
              onClick={toggleMenu}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                ) : (
                  <path
                    d="M4 6h16M4 12h16M4 18h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              animate={{ opacity: 1, height: 'auto' }}
              className="border-t border-sand-200 bg-white sm:hidden"
              exit={{ opacity: 0, height: 0 }}
              initial={{ opacity: 0, height: 0 }}
            >
              <div className="flex flex-col py-2">
                {SECTIONS.map((section) => (
                  <button
                    className="px-4 py-3 text-left text-sm font-medium text-stone-700 hover:bg-sand-50"
                    data-section-id={section.id}
                    key={section.id}
                    type="button"
                    onClick={handleSectionClick}
                  >
                    {section.label}
                  </button>
                ))}
                <button
                  className="flex w-full items-center gap-2 border-t border-sand-100 px-4 py-3 text-left text-sm font-medium text-stone-600 hover:bg-sand-50"
                  type="button"
                  onClick={openAdminModal}
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  Admin
                </button>
              </div>
            </motion.div>
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
