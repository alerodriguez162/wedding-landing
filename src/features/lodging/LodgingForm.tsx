'use client'

import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { RoomPhotosCarousel } from '@/components/landing/RoomPhotosCarousel'
import { lodgingSchema, type LodgingInput } from './lodging-schema'
import { PAYMENT_INSTRUCTIONS } from '@/lib/constants'
import { differenceInDays } from 'date-fns'

export function LodgingForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const form = useForm<LodgingInput>({
    resolver: zodResolver(lodgingSchema),
    defaultValues: {
      name: '',
      adults: 1,
      children: 0,
      roomsNeeded: 1,
      roomBreakdown: '',
      arrivalDate: '',
      departureDate: '',
      willingToShare: false,
      notes: '',
    },
  })

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = form

  const adults = watch('adults')
  const children = watch('children')
  const arrivalDate = watch('arrivalDate')
  const departureDate = watch('departureDate')

  const numberOfPeople = useMemo(
    () => (Number(adults) || 0) + (Number(children) || 0),
    [adults, children],
  )

  const nights =
    arrivalDate && departureDate
      ? Math.max(0, differenceInDays(new Date(departureDate), new Date(arrivalDate)))
      : 0

  const onSubmit = async (data: LodgingInput) => {
    setStatus('loading')
    setErrorMessage('')
    try {
      const payload = {
        ...data,
        numberOfPeople: data.adults + data.children,
        nights:
          data.arrivalDate && data.departureDate
            ? differenceInDays(new Date(data.departureDate), new Date(data.arrivalDate))
            : null,
      }
      const res = await fetch('/api/lodging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Error al enviar')
      setStatus('success')
      reset()
    } catch (e) {
      setStatus('error')
      setErrorMessage(e instanceof Error ? e.message : 'Error al guardar. Intenta de nuevo.')
    }
  }

  return (
    <Section id="lodging" subtitle="Beach Club" title="Hospedaje">
      <Card>
        <div className="space-y-6">
          <RoomPhotosCarousel />
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm font-medium leading-relaxed text-amber-800">
            Solo se deben considerar los confirmados con los novios. No habrá excepciones.
          </p>

          {status === 'success' && (
            <div className="rounded-xl bg-green-50 p-4 leading-relaxed text-green-800">
              Solicitud guardada. Te contactaremos para confirmar y dar instrucciones de pago.
            </div>
          )}
          {status === 'error' && (
            <div className="rounded-xl bg-red-50 p-4 leading-relaxed text-red-800">
              {errorMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <label className="label" htmlFor="name">
                Nombre
              </label>
              <input className="input-field" id="name" {...register('name')} />
              {errors.name && (
                <p className="form-error" role="alert">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label className="label" htmlFor="adults">
                  Adultos
                </label>
                <input
                  className="input-field"
                  id="adults"
                  max={20}
                  min={0}
                  type="number"
                  {...register('adults', { valueAsNumber: true })}
                />
                {errors.adults && (
                  <p className="form-error" role="alert">
                    {errors.adults.message}
                  </p>
                )}
              </div>
              <div className="form-field">
                <label className="label" htmlFor="children">
                  Niños
                </label>
                <input
                  className="input-field"
                  id="children"
                  max={20}
                  min={0}
                  type="number"
                  {...register('children', { valueAsNumber: true })}
                />
              </div>
            </div>

            <p className="rounded-xl bg-sand-50 px-4 py-3 text-sm leading-relaxed text-stone-700">
              Total de personas: <strong>{numberOfPeople}</strong>
            </p>

            <div className="form-field">
              <label className="label" htmlFor="roomsNeeded">
                ¿Cuántas habitaciones necesitan?
              </label>
              <input
                className="input-field max-w-xs"
                id="roomsNeeded"
                max={50}
                min={1}
                type="number"
                {...register('roomsNeeded', { valueAsNumber: true })}
              />
              {errors.roomsNeeded && (
                <p className="form-error" role="alert">
                  {errors.roomsNeeded.message}
                </p>
              )}
            </div>

            <div className="form-field">
              <label className="label" htmlFor="roomBreakdown">
                Detalle por habitación (opcional)
              </label>
              <p className="text-xs leading-relaxed text-stone-500">
                Ej.: habitación 1: 2 adultos; habitación 2: 1 adulto y 1 niño.
              </p>
              <textarea
                className="input-field min-h-[5.5rem]"
                id="roomBreakdown"
                placeholder="Si quieres repartir personas entre habitaciones, descríbelo aquí."
                rows={3}
                {...register('roomBreakdown')}
              />
            </div>

            <div className="form-grid-2">
              <div className="form-field">
                <label className="label" htmlFor="arrivalDate">
                  Día de llegada
                </label>
                <input
                  className="input-field"
                  id="arrivalDate"
                  type="date"
                  {...register('arrivalDate')}
                />
                {errors.arrivalDate && (
                  <p className="form-error" role="alert">
                    {errors.arrivalDate.message}
                  </p>
                )}
              </div>
              <div className="form-field">
                <label className="label" htmlFor="departureDate">
                  Día de salida
                </label>
                <input
                  className="input-field"
                  id="departureDate"
                  type="date"
                  {...register('departureDate')}
                />
                {errors.departureDate && (
                  <p className="form-error" role="alert">
                    {errors.departureDate.message}
                  </p>
                )}
              </div>
            </div>

            {nights > 0 && (
              <p className="text-sm leading-relaxed text-stone-600">
                Estancia: <strong>{nights}</strong> noche{nights !== 1 ? 's' : ''}
              </p>
            )}

            <div className="rounded-xl border border-sand-200 bg-sand-50/50 p-5">
              <label className="flex cursor-pointer items-start gap-4">
                <input
                  className="mt-0.5 shrink-0"
                  type="checkbox"
                  {...register('willingToShare')}
                />
                <span className="space-y-1">
                  <span className="font-medium text-stone-800">
                    Estoy dispuesto(a) a compartir habitación si hace falta
                  </span>
                  <br />
                  <span className="text-sm leading-relaxed text-stone-600">
                    Lo coordinaremos con los novios según disponibilidad.
                  </span>
                </span>
              </label>
            </div>

            <div className="rounded-xl border border-sand-200 bg-sand-50/50 p-5 text-sm leading-relaxed text-stone-600">
              <p className="font-medium text-stone-800">Pago o apartado</p>
              <p className="mt-2 whitespace-pre-line">{PAYMENT_INSTRUCTIONS}</p>
            </div>

            <div className="form-field">
              <label className="label" htmlFor="notes">
                Notas (opcional)
              </label>
              <textarea
                className="input-field min-h-[5rem]"
                id="notes"
                rows={2}
                {...register('notes')}
              />
            </div>

            <div className="pt-1">
              <button
                className="btn-primary w-full sm:w-auto"
                disabled={status === 'loading'}
                type="submit"
              >
                {status === 'loading' ? 'Enviando…' : 'Enviar solicitud de hospedaje'}
              </button>
            </div>
          </form>
        </div>
      </Card>
    </Section>
  )
}
