'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { EVENT_DATE, EVENT_DATE_DISPLAY_ES, VENUE_NAME } from '@/lib/constants'

type Countdown = { days: number; hours: number; minutes: number; seconds: number }

function getCountdown(): Countdown {
  const now = new Date()
  const remainingMs = EVENT_DATE.getTime() - now.getTime()
  if (remainingMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(remainingMs / (1000 * 60 * 60 * 24)),
    hours: Math.floor((remainingMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((remainingMs % (1000 * 60)) / 1000),
  }
}

const EMPTY_COUNTDOWN: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 }

export function Hero() {
  /** null hasta montar en el cliente: evita error de hidratación (servidor vs cliente en otro segundo). */
  const [timeLeft, setTimeLeft] = useState<Countdown | null>(null)

  useEffect(() => {
    setTimeLeft(getCountdown())
    const intervalId = setInterval(() => setTimeLeft(getCountdown()), 1000)
    return () => clearInterval(intervalId)
  }, [])

  const display = timeLeft ?? EMPTY_COUNTDOWN

  const scrollToWelcome = () => {
    document.getElementById('welcome')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sand-100 via-blush-50/30 to-sand-50 px-4 pb-14 pt-16 sm:pb-16"
      id="hero"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,169,98,0.08)_0%,transparent_70%)]" />
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-serif text-lg tracking-wide text-stone-500 sm:text-xl">
          Tenemos el gusto de invitarte a celebrar
        </p>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-stone-800 sm:text-5xl md:text-6xl">
          Nuestra Boda
          <br />
          <span className="text-gold-600">y el Bautismo</span>
        </h1>
        <p className="mt-6 font-sans text-xl text-stone-600">
          {VENUE_NAME} · {EVENT_DATE_DISPLAY_ES}
        </p>

        <div className="mx-auto mt-10 grid max-w-md grid-cols-4 gap-3 sm:gap-4">
          {[
            { value: display.days, label: 'Días' },
            { value: display.hours, label: 'Horas' },
            { value: display.minutes, label: 'Min' },
            { value: display.seconds, label: 'Seg' },
          ].map(({ value, label }) => (
            <div
              className="rounded-xl border border-sand-200 bg-white/80 py-3 shadow-sm"
              key={label}
            >
              <span className="block font-serif text-2xl font-semibold text-stone-800 sm:text-3xl">
                {String(value).padStart(2, '0')}
              </span>
              <span className="text-xs font-medium text-stone-500">{label}</span>
            </div>
          ))}
        </div>

        <motion.button
          className="btn-primary mt-10"
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={scrollToWelcome}
        >
          Ver detalles del evento
        </motion.button>
      </motion.div>
    </section>
  )
}
