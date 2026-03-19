'use client'

import { useState, useRef, useEffect } from 'react'
import Script from 'next/script'
import { ROOM_PHOTOS_FACEBOOK_POST_URLS } from '@/lib/constants'

const FB_SDK_URL =
  'https://connect.facebook.net/es_ES/sdk.js#xfbml=1&version=v21.0'

declare global {
  interface Window {
    FB?: {
      XFBML: { parse: (element?: HTMLElement) => void }
    }
  }
}

export function RoomPhotosCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

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
    if (count === 0) return () => {}
    const t = setTimeout(parseEmbeds, 100)
    return () => clearTimeout(t)
  }, [count])

  if (count === 0) return null

  return (
    <>
      <div id="fb-root" />
      <Script
        src={FB_SDK_URL}
        strategy="afterInteractive"
        onLoad={parseEmbeds}
      />
      <div className="mb-6">
        <p className="mb-3 text-sm font-medium text-stone-700">
          Fotos de las habitaciones (desde Facebook)
        </p>
        <div className="relative overflow-hidden rounded-xl border border-sand-200 bg-sand-50/50">
          <div
            className="flex transition-transform duration-300 ease-out"
            ref={containerRef}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {urls.map((href) => (
              <div
                className="flex min-w-full shrink-0 justify-center px-4 py-4"
                key={href}
                style={{ width: '100%' }}
              >
                <div
                  className="fb-post"
                  data-href={href}
                  data-show-text="false"
                  data-width="500"
                />
              </div>
            ))}
          </div>
          {count > 1 && (
            <>
              <button
                aria-label="Anterior"
                className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-md transition hover:bg-white hover:text-stone-800"
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
                className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-stone-600 shadow-md transition hover:bg-white hover:text-stone-800"
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
              <div className="flex justify-center gap-1.5 pb-2 pt-1">
                {urls.map((_, i) => (
                  <button
                    aria-label={`Ir a foto ${i + 1}`}
                    className={`h-2 rounded-full transition ${
                      i === currentIndex
                        ? 'w-6 bg-gold-500'
                        : 'w-2 bg-sand-300 hover:bg-sand-400'
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
