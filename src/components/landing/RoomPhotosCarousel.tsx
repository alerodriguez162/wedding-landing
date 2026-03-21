'use client'

import { useEffect, useRef, useState } from 'react'
import Script from 'next/script'
import { ROOM_PHOTOS_FACEBOOK_POST_URLS } from '@/lib/constants'

const FB_SDK_URL =
  'https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v21.0'

/** Altura mínima reservada: evita CLS al cargar el SDK y el iframe de Facebook. */
const EMBED_AREA_CLASS =
  'min-h-[460px] sm:min-h-[500px] md:min-h-[520px]'

/** Ancho del embed fb-post: en móvil usa el ancho disponible para evitar cortes y scroll horizontal. */
function useFbEmbedWidth() {
  const [w, setW] = useState(320)
  useEffect(() => {
    const calc = () => {
      if (typeof window === 'undefined') return
      const max = window.innerWidth
      // padding lateral del card + slide (~24px) y márgenes seguros
      setW(Math.min(500, Math.max(280, max - 40)))
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])
  return w
}

declare global {
  interface Window {
    FB?: {
      XFBML: { parse: (element?: HTMLElement) => void }
    }
  }
}

export function RoomPhotosCarousel() {
  const [mounted, setMounted] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const embedWidth = useFbEmbedWidth()

  useEffect(() => {
    setMounted(true)
  }, [])

  const urls = ROOM_PHOTOS_FACEBOOK_POST_URLS
  const count = urls.length

  const goPrev = () => setCurrentIndex((i) => (i <= 0 ? count - 1 : i - 1))
  const goNext = () => setCurrentIndex((i) => (i >= count - 1 ? 0 : i + 1))

  const parseEmbeds = () => {
    if (typeof window !== 'undefined' && window.FB && containerRef.current) {
      window.FB.XFBML.parse(containerRef.current)
    }
  }

  useEffect(() => {
    if (count === 0) return
    setCurrentIndex((i) => (i >= count ? 0 : i))
  }, [count])

  useEffect(() => {
    if (count === 0) {
      return undefined
    }
    const t = setTimeout(parseEmbeds, 100)
    return () => clearTimeout(t)
  }, [count, currentIndex, embedWidth])

  if (count === 0) {
    return (
      <div className="mb-6 rounded-xl border border-dashed border-blush-200/90 bg-blush-100/55 px-4 py-6 text-center text-sm text-stone-600">
        <p className="font-medium text-stone-700">Fotos de habitaciones</p>
        <p className="mt-2 text-xs text-stone-500">
          Configura <code className="rounded bg-blush-200/60 px-1 py-0.5 text-[0.75rem]">
            NEXT_PUBLIC_ROOM_PHOTOS_FACEBOOK_POST_URLS
          </code> (enlaces a publicaciones de Facebook, separados por coma).
        </p>
      </div>
    )
  }

  /** Placeholder durante SSR/hidratación: misma altura mínima que el embed para no mover el layout. */
  if (!mounted) {
    return (
      <div className="mb-6 w-full min-w-0">
        <p className="mb-3 text-sm font-medium text-stone-700">
          Fotos de las habitaciones (desde Facebook)
        </p>
        <div
          className={`flex w-full items-center justify-center rounded-xl border border-blush-200/85 bg-blush-100/45 text-sm text-stone-500 ${EMBED_AREA_CLASS}`}
        >
          Cargando…
        </div>
      </div>
    )
  }

  return (
    <>
      <div id="fb-root" />
      <Script src={FB_SDK_URL} strategy="afterInteractive" onLoad={parseEmbeds} />
      <div className="mb-6 w-full min-w-0">
        <p className="mb-3 text-sm font-medium text-stone-700">
          Fotos de las habitaciones (desde Facebook)
        </p>
        <div className="relative w-full min-w-0 overflow-hidden rounded-xl border border-blush-200/85 bg-blush-100/45">
          <div
            className="flex w-full min-w-0 items-stretch transition-transform duration-300 ease-out"
            ref={containerRef}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {urls.map((href, i) => (
              <div
                className={`box-border flex min-w-[100%] max-w-full shrink-0 flex-col justify-start px-2 py-3 sm:px-4 sm:py-4 ${EMBED_AREA_CLASS}`}
                key={`${href}-${i}`}
                style={{ width: '100%' }}
              >
                <div className="flex w-full min-w-0 flex-1 flex-col items-center justify-start overflow-x-auto overflow-y-visible [-webkit-overflow-scrolling:touch]">
                  <div
                    className="fb-post mx-auto w-full max-w-full shrink-0"
                    data-href={href}
                    data-show-text="false"
                    data-width={embedWidth}
                  />
                </div>
              </div>
            ))}
          </div>
          {count > 1 && (
            <>
              <button
                aria-label="Anterior"
                className="absolute left-1 top-[42%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-blush-200/80 bg-white/95 text-stone-600 shadow-md transition hover:bg-white hover:text-stone-800 sm:left-2 sm:h-10 sm:w-10"
                type="button"
                onClick={goPrev}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M15 19l-7-7 7-7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
              <button
                aria-label="Siguiente"
                className="absolute right-1 top-[42%] z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-blush-200/80 bg-white/95 text-stone-600 shadow-md transition hover:bg-white hover:text-stone-800 sm:right-2 sm:h-10 sm:w-10"
                type="button"
                onClick={goNext}
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
              <div className="relative z-10 flex justify-center gap-1.5 border-t border-blush-200/50 bg-blush-100/30 px-2 py-2.5">
                {urls.map((_, i) => (
                  <button
                    aria-label={`Ir a foto ${i + 1}`}
                    className={`h-2 rounded-full transition ${
                      i === currentIndex
                        ? 'w-6 bg-stone-800'
                        : 'w-2 bg-blush-300 hover:bg-blush-400'
                    }`}
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
