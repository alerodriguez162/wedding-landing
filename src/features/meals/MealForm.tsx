'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { mealSelectionSchema, type MealSelectionInput } from './meal-schema'
import { ADULT_MAIN_DISHES } from '@/lib/menu-options'

export function MealForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<MealSelectionInput>({
    resolver: zodResolver(mealSelectionSchema),
    defaultValues: { senderName: '', attendeeName: '', notes: '' },
  })

  const onSubmit = async (data: MealSelectionInput) => {
    setStatus('loading')
    setErrorMessage('')
    try {
      const res = await fetch('/api/meals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, imageUrls: [] }),
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
    <Section id="meals" subtitle="Ayúdanos a elegir el menú" title="Votación de platillo">
      <Card>
        <div className="space-y-6">
          <div className="space-y-4">
            <p className="leading-relaxed text-stone-600">
              Esto es una <strong>votación</strong>, no una elección individual: al final se servirá el{' '}
              <strong>platillo más votado</strong> para todos los asistentes. Vota por tu favorito.
            </p>
            <p className="text-sm leading-relaxed text-stone-500">
              Si envías la votación de varias personas, repite el formulario o indícalo en notas. El
              nombre del remitente nos ayuda a identificar quién envió la información.
            </p>
          </div>

          {status === 'success' && (
            <div className="rounded-xl bg-green-50 p-4 leading-relaxed text-green-800">
              Gracias. Tu voto se guardó correctamente.
            </div>
          )}
          {status === 'error' && (
            <div className="rounded-xl bg-red-50 p-4 leading-relaxed text-red-800">
              {errorMessage}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-field">
              <label className="label" htmlFor="senderName">
                Nombre de quien envía
              </label>
              <input
                className="input-field"
                id="senderName"
                placeholder="Tu nombre"
                {...register('senderName')}
              />
              {errors.senderName && (
                <p className="form-error" role="alert">
                  {errors.senderName.message}
                </p>
              )}
            </div>

            <div className="form-field">
              <label className="label" htmlFor="attendeeName">
                Nombre del asistente (opcional)
              </label>
              <input
                className="input-field"
                id="attendeeName"
                placeholder="Si es diferente al remitente"
                {...register('attendeeName')}
              />
            </div>

            <div className="form-field">
              <p className="label">Tu voto — plato fuerte</p>
              <p className="text-sm leading-relaxed text-stone-500" id="meal-vote-hint">
                Todos incluyen: puré de zanahoria con 4 quesos y ensalada fresca.
              </p>
              <div
                aria-describedby="meal-vote-hint"
                aria-label="Opciones de plato fuerte"
                className="grid gap-3 sm:grid-cols-2 sm:gap-4"
                role="radiogroup"
              >
                {ADULT_MAIN_DISHES.map((opt) => (
                  <label
                    className="flex cursor-pointer items-center gap-4 rounded-xl border border-sand-200 bg-white p-4 has-[:checked]:border-gold-500 has-[:checked]:ring-2 has-[:checked]:ring-gold-500/30"
                    key={opt.id}
                  >
                    <input
                      type="radio"
                      value={opt.id}
                      {...register('adultMainDish')}
                      className="shrink-0"
                    />
                    <span className="font-medium text-stone-800">{opt.label}</span>
                  </label>
                ))}
              </div>
              {errors.adultMainDish && (
                <p className="form-error" role="alert">
                  {errors.adultMainDish.message}
                </p>
              )}
            </div>

            <div className="form-field">
              <label className="label" htmlFor="notes">
                Notas (opcional)
              </label>
              <textarea
                className="input-field min-h-[5rem]"
                id="notes"
                placeholder="Alergias, más asistentes, etc."
                rows={3}
                {...register('notes')}
              />
            </div>

            <div className="pt-1">
              <button
                className="btn-primary w-full sm:w-auto"
                disabled={status === 'loading'}
                type="submit"
              >
                {status === 'loading' ? 'Enviando…' : 'Enviar voto'}
              </button>
            </div>
          </form>
        </div>
      </Card>
    </Section>
  )
}
