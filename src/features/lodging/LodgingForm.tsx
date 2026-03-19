'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { RoomPhotosCarousel } from '@/components/landing/RoomPhotosCarousel'
import { lodgingSchema, type LodgingInput } from './lodging-schema'
import { PAYMENT_INSTRUCTIONS } from '@/lib/constants'
import { differenceInDays } from 'date-fns'

type RoomOption = {
  id: string
  roomType: string
  label: string
  capacity: number
  pricePerNight: number
  available: number
}

export function LodgingForm() {
  const [rooms, setRooms] = useState<RoomOption[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [estimatedTotal, setEstimatedTotal] = useState<number | null>(null)

  const form = useForm<LodgingInput>({
    resolver: zodResolver(lodgingSchema),
    defaultValues: {
      name: '',
      adults: 1,
      children: 0,
      arrivalDate: '',
      departureDate: '',
      willingToShare: false,
      selectedRoomType: '',
      notes: '',
    },
  })

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = form
  const adultsCount = watch('adults')
  const childrenCount = watch('children')
  const numberOfPeople = adultsCount + childrenCount
  const arrivalDate = watch('arrivalDate')
  const departureDate = watch('departureDate')
  const willingToShare = watch('willingToShare')
  const selectedRoomType = watch('selectedRoomType')

  useEffect(() => {
    fetch('/api/rooms')
      .then((res) => res.json())
      .then((data) => setRooms(Array.isArray(data) ? data : []))
      .catch(() => setRooms([]))
  }, [])

  const nights =
    arrivalDate && departureDate
      ? Math.max(0, differenceInDays(new Date(departureDate), new Date(arrivalDate)))
      : 0

  const selectedRoom = rooms.find((r) => r.roomType === selectedRoomType)
  useEffect(() => {
    if (selectedRoom && nights > 0) {
      setEstimatedTotal(selectedRoom.pricePerNight * nights)
    } else {
      setEstimatedTotal(null)
    }
  }, [selectedRoom, nights])

  const showShareOption = adultsCount === 1
  const canSelectRoom = !willingToShare && numberOfPeople >= 1
  const availableForGroup = rooms.filter((r) => r.capacity >= numberOfPeople && r.available > 0)

  const onSubmit = async (data: LodgingInput) => {
    setStatus('loading')
    setErrorMessage('')
    try {
      const payload = {
        ...data,
        numberOfPeople: data.adults + data.children,
        nights:
          data.selectedRoomType && data.arrivalDate && data.departureDate
            ? differenceInDays(new Date(data.departureDate), new Date(data.arrivalDate))
            : null,
        estimatedTotal: estimatedTotal ?? null,
      }
      const res = await fetch('/api/lodging', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Error al enviar')
      setStatus('success')
      form.reset()
      setEstimatedTotal(null)
    } catch (e) {
      setStatus('error')
      setErrorMessage(e instanceof Error ? e.message : 'Error al guardar. Intenta de nuevo.')
    }
  }

  return (
    <Section id="lodging" subtitle="Beach Club" title="Hospedaje">
      <Card>
        <RoomPhotosCarousel />
        <p className="mb-2 text-sm font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-xl p-3">
          Solo se deben considerar los confirmados con los novios. No habrá excepciones.
        </p>

        {status === 'success' && (
          <div className="mb-6 rounded-xl bg-green-50 p-4 text-green-800">
            Solicitud guardada. Te contactaremos para confirmar y dar instrucciones de pago.
          </div>
        )}
        {status === 'error' && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-800">{errorMessage}</div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label" htmlFor="name">
              Nombre
            </label>
            <input className="input-field mt-1" id="name" {...register('name')} />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="adults">
                Adultos
              </label>
              <input
                className="input-field mt-1"
                id="adults"
                max={20}
                min={0}
                type="number"
                {...register('adults')}
              />
              {errors.adults && (
                <p className="mt-1 text-sm text-red-600">{errors.adults.message}</p>
              )}
            </div>
            <div>
              <label className="label" htmlFor="children">
                Niños
              </label>
              <input
                className="input-field mt-1"
                id="children"
                max={20}
                min={0}
                type="number"
                {...register('children')}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="arrivalDate">
                Día de llegada
              </label>
              <input
                className="input-field mt-1"
                id="arrivalDate"
                type="date"
                {...register('arrivalDate')}
              />
              {errors.arrivalDate && (
                <p className="mt-1 text-sm text-red-600">{errors.arrivalDate.message}</p>
              )}
            </div>
            <div>
              <label className="label" htmlFor="departureDate">
                Día de salida
              </label>
              <input
                className="input-field mt-1"
                id="departureDate"
                type="date"
                {...register('departureDate')}
              />
              {errors.departureDate && (
                <p className="mt-1 text-sm text-red-600">{errors.departureDate.message}</p>
              )}
            </div>
          </div>

          {showShareOption && (
            <div className="rounded-xl border border-sand-200 bg-sand-50/50 p-5">
              <label className="flex cursor-pointer items-start gap-4">
                <input
                  className="mt-0.5 shrink-0"
                  type="checkbox"
                  {...register('willingToShare')}
                />
                <span className="space-y-1">
                  <span className="font-medium text-stone-800">
                    ¿Estás dispuesto(a) a compartir habitación con alguien?
                  </span>
                  <br />
                  <span className="text-sm text-stone-600">
                    Se tratará de asignar con conocidos y preferentemente con alguien del mismo
                    sexo. En ese caso no selecciones habitación abajo; te asignaremos días antes de
                    tu llegada.
                  </span>
                </span>
              </label>
            </div>
          )}

          {canSelectRoom && !willingToShare && (
            <div>
              <label className="label mb-2 block">Tipo de habitación</label>
              <p className="mb-3 text-sm text-stone-500">
                Solo se muestran habitaciones con disponibilidad y capacidad suficiente.
              </p>
              <div className="space-y-3">
                {availableForGroup.length === 0 ? (
                  <p className="rounded-xl bg-amber-50 p-4 text-amber-800">
                    No hay habitaciones disponibles para {numberOfPeople} personas en este momento.
                    Si vas a compartir, marca la opción de arriba.
                  </p>
                ) : (
                  availableForGroup.map((room) => (
                    <label
                      className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-sand-200 bg-white p-4 has-[:checked]:border-gold-500 has-[:checked]:ring-2 has-[:checked]:ring-gold-500/30"
                      key={room.id}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          value={room.roomType}
                          {...register('selectedRoomType')}
                          className="shrink-0"
                        />
                        <div>
                          <span className="font-medium">{room.label}</span>
                          <span className="ml-2 text-stone-500">
                            ${room.pricePerNight.toLocaleString()} / noche · {room.available}{' '}
                            disponible(s)
                          </span>
                        </div>
                      </div>
                    </label>
                  ))
                )}
              </div>
              {errors.selectedRoomType && (
                <p className="mt-1 text-sm text-red-600">{errors.selectedRoomType.message}</p>
              )}
            </div>
          )}

          {willingToShare && (
            <p className="rounded-xl bg-sand-100 p-3 text-stone-700">
              No es necesario seleccionar habitación. Te asignaremos una junto con otra persona
              confirmada días antes de tu llegada.
            </p>
          )}

          {estimatedTotal != null && estimatedTotal > 0 && (
            <p className="rounded-xl bg-gold-400/10 p-4 font-medium text-stone-800">
              Total estimado: ${estimatedTotal.toLocaleString()} MXN ({nights} noche
              {nights !== 1 ? 's' : ''})
            </p>
          )}

          <div className="rounded-xl border border-sand-200 bg-sand-50/50 p-4 text-sm text-stone-600">
            <p className="font-medium text-stone-700">Pago o apartado</p>
            <p className="mt-1 whitespace-pre-line">{PAYMENT_INSTRUCTIONS}</p>
          </div>

          <div>
            <label className="label" htmlFor="notes">
              Notas (opcional)
            </label>
            <textarea className="input-field mt-1" id="notes" rows={2} {...register('notes')} />
          </div>

          <button
            className="btn-primary w-full sm:w-auto"
            disabled={status === 'loading'}
            type="submit"
          >
            {status === 'loading' ? 'Enviando…' : 'Enviar solicitud de hospedaje'}
          </button>
        </form>
      </Card>
    </Section>
  )
}
