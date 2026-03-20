'use client'

import { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')

export function PhotoSection() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [uploaderName, setUploaderName] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return
    setStatus('loading')
    try {
      const form = new FormData()
      form.append('file', file)
      if (uploaderName.trim()) form.append('uploaderName', uploaderName.trim())
      const res = await fetch('/api/photos', { method: 'POST', body: form })
      const json = await res.json()
      if (!res.ok) throw new Error(json.message || 'Error al subir')
      setStatus('success')
      setFile(null)
      setUploaderName('')
    } catch (err) {
      setStatus('error')
    }
  }

  const sharePhotosUrl = SITE_URL ? `${SITE_URL}#photos` : '#'

  const handleUploaderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploaderName(e.target.value)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null)
  }

  return (
    <Section id="photos" subtitle="Comparte tus recuerdos del evento" title="Álbum de fotos">
      <Card>
        <div className="space-y-6">
          <p className="leading-relaxed text-stone-600">
            Después del evento podrás subir aquí tus fotos para compartirlas con todos. Opcional:
            indica tu nombre para que aparezca en la galería.
          </p>

          {status === 'success' && (
            <div className="rounded-xl bg-green-50 p-4 leading-relaxed text-green-800">
              Foto subida correctamente. ¡Gracias por compartir!
            </div>
          )}
          {status === 'error' && (
            <div className="rounded-xl bg-red-50 p-4 leading-relaxed text-red-800">
              No se pudo subir la foto. Intenta de nuevo o usa el enlace alternativo más abajo.
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="label" htmlFor="uploaderName">
                Tu nombre (opcional)
              </label>
              <input
                className="input-field"
                id="uploaderName"
                placeholder="Para aparecer en la galería"
                type="text"
                value={uploaderName}
                onChange={handleUploaderNameChange}
              />
            </div>

            <div className="form-field">
              <label className="label" htmlFor="photoFile">
                Seleccionar foto
              </label>
              <input
                accept="image/*"
                className="block w-full text-sm leading-relaxed text-stone-600 file:mr-4 file:rounded-lg file:border-0 file:bg-sand-100 file:px-4 file:py-2.5 file:text-stone-700"
                id="photoFile"
                type="file"
                onChange={handleFileChange}
              />
            </div>

            <div className="pt-1">
              <button
                className="btn-primary w-full sm:w-auto"
                disabled={status === 'loading' || !file}
                type="submit"
              >
                {status === 'loading' ? 'Subiendo…' : 'Subir foto'}
              </button>
            </div>
          </form>

          <div className="space-y-3 rounded-xl border border-sand-200 bg-sand-50/50 p-5 text-center">
            <p className="text-sm font-medium text-stone-800">Compartir por enlace o QR</p>
            <p className="text-sm leading-relaxed text-stone-600">
              Puedes compartir esta página con otros invitados para que suban sus fotos:
            </p>
            <a className="inline-block text-gold-600 underline" href={sharePhotosUrl}>
              {sharePhotosUrl === '#' ? 'Esta misma página' : sharePhotosUrl}
            </a>
            <p className="pt-1 text-xs leading-relaxed text-stone-500">
              En una próxima actualización se puede agregar un QR que apunte a esta sección.
            </p>
          </div>
        </div>
      </Card>
    </Section>
  )
}
