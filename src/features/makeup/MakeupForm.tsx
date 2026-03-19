'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { makeupSchema, type MakeupInput } from './makeup-schema'
import { MAKEUP_HAIR_PRICE, MAKEUP_HAIR_LINK } from '@/lib/constants'

export function MakeupForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MakeupInput>({
    resolver: zodResolver(makeupSchema),
    defaultValues: { name: '', peopleCount: 1, serviceType: undefined },
  })

  const onSubmit = async (data: MakeupInput) => {
    setStatus('loading')
    setErrorMessage('')
    try {
      const res = await fetch('/api/makeup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Error al enviar')
      setStatus('success')
    } catch (e) {
      setStatus('error')
      setErrorMessage(e instanceof Error ? e.message : 'Error al guardar. Intenta de nuevo.')
    }
  }

  return (
    <Section id="makeup" subtitle="Servicio disponible para el evento" title="Maquillaje y peinado">
      <Card>
        <p className="mb-2 text-center text-2xl font-semibold text-stone-800">
          ${MAKEUP_HAIR_PRICE.toLocaleString()} MXN · Ambos (peinado + maquillaje)
        </p>
        <p className="mb-6 text-center">
          <a
            className="text-gold-600 underline decoration-gold-400 underline-offset-2"
            href={MAKEUP_HAIR_LINK}
            rel="noopener noreferrer"
            target="_blank"
          >
            Ver trabajo de la estilista
          </a>
        </p>

        {status === 'success' && (
          <div className="mb-6 rounded-xl bg-green-50 p-4 text-green-800">
            Solicitud registrada. Te contactaremos para confirmar.
          </div>
        )}
        {status === 'error' && (
          <div className="mb-6 rounded-xl bg-red-50 p-4 text-red-800">{errorMessage}</div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="label" htmlFor="makeup-name">
              Nombre
            </label>
            <input className="input-field mt-1" id="makeup-name" {...register('name')} />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
          </div>
          <div>
            <label className="label" htmlFor="peopleCount">
              Número de personas que requieren el servicio
            </label>
            <input
              className="input-field mt-1"
              id="peopleCount"
              max={20}
              min={1}
              type="number"
              {...register('peopleCount')}
            />
            {errors.peopleCount && (
              <p className="mt-1 text-sm text-red-600">{errors.peopleCount.message}</p>
            )}
          </div>
          <div>
            <label className="label mb-2 block">Qué necesitan</label>
            <div className="space-y-3">
              {[
                { id: 'peinado', label: 'Peinado' },
                { id: 'maquillaje', label: 'Maquillaje' },
                { id: 'ambos', label: 'Ambos' },
              ].map((opt) => (
                <label
                  className="flex cursor-pointer items-center gap-4 rounded-xl border border-sand-200 bg-white p-4 has-[:checked]:border-gold-500 has-[:checked]:ring-2 has-[:checked]:ring-gold-500/30"
                  key={opt.id}
                >
                  <input
                    type="radio"
                    value={opt.id}
                    {...register('serviceType')}
                    className="shrink-0"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
            {errors.serviceType && (
              <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>
            )}
          </div>
          <button
            className="btn-primary w-full sm:w-auto"
            disabled={status === 'loading'}
            type="submit"
          >
            {status === 'loading' ? 'Enviando…' : 'Enviar solicitud'}
          </button>
        </form>
      </Card>
    </Section>
  )
}
