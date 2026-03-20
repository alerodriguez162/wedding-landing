'use client'

import Script from 'next/script'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

declare global {
  interface Window {
    /** Pinterest pinit.js */
    pint?: () => void
  }
}

type PinterestBoardEmbedProps = {
  boardUrl: string
  /** Enlace corto pin.it u otro para “Abrir en Pinterest” */
  shareUrl?: string
}

/**
 * Pinterest reemplaza el <a> del embed por un iframe. No usar <a> de React aquí
 * (provoca error removeChild al reconciliar). El ancla se crea con la API del DOM.
 */
export function PinterestBoardEmbed({ boardUrl, shareUrl }: PinterestBoardEmbedProps) {
  const [scriptReady, setScriptReady] = useState(false)
  const [embedWidth, setEmbedWidth] = useState(720)
  const hintId = useId()
  const pinHostRef = useRef<HTMLDivElement>(null)

  const updateWidth = useCallback(() => {
    if (typeof window === 'undefined') return
    const padding = 48
    const vw = window.innerWidth - padding
    setEmbedWidth(Math.max(280, Math.min(900, Math.floor(vw))))
  }, [])

  useEffect(() => {
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [updateWidth])

  useEffect(() => {
    if (!scriptReady) {
      return undefined
    }
    const host = pinHostRef.current
    if (!host) {
      return undefined
    }

    host.innerHTML = ''
    const a = document.createElement('a')
    a.href = boardUrl
    a.className = 'block w-full'
    a.setAttribute('data-pin-do', 'embedBoard')
    a.setAttribute('data-pin-board-width', String(embedWidth))
    a.setAttribute('data-pin-scale-height', '420')
    a.setAttribute('data-pin-scale-width', '120')
    host.appendChild(a)

    const id = window.requestAnimationFrame(() => {
      window.pint?.()
    })

    return () => {
      window.cancelAnimationFrame(id)
      host.innerHTML = ''
    }
  }, [scriptReady, embedWidth, boardUrl])

  const openExternal = shareUrl ?? boardUrl

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <a
          className="text-sm font-medium text-gold-600 underline decoration-gold-400/50 underline-offset-2 hover:text-gold-700"
          href={openExternal}
          rel="noopener noreferrer"
          target="_blank"
        >
          Abrir tablero en Pinterest
        </a>
      </div>

      <p className="text-xs text-stone-500 sm:text-sm">
        Tablero en cuadrícula. Puedes hacer scroll dentro del widget de Pinterest.
      </p>

      <Script
        src="https://assets.pinterest.com/js/pinit.js"
        strategy="lazyOnload"
        onLoad={() => setScriptReady(true)}
      />

      <div className="overflow-hidden rounded-2xl border border-sand-200/90 bg-white shadow-sm">
        <div className="w-full px-2 py-2 sm:px-3">
          <div className="relative min-h-[280px]">
            {!scriptReady ? (
              <div
                aria-busy="true"
                aria-label="Cargando tablero de Pinterest"
                className="flex min-h-[280px] items-center justify-center rounded-xl bg-sand-50/80"
              >
                <p className="text-sm text-stone-500">Cargando inspiración…</p>
              </div>
            ) : null}
            <div
              className={!scriptReady ? 'hidden min-h-0' : 'min-h-[200px] w-full'}
              ref={pinHostRef}
            />
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-stone-400" id={`${hintId}-hint`}>
        Pinterest puede mostrar un aviso de cookies. El contenido lo sirve Pinterest.
      </p>
    </div>
  )
}
