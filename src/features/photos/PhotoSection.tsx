import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { PHOTOS_ALBUM_URL } from '@/lib/constants'

export function PhotoSection() {
  return (
    <Section id="photos" subtitle="Recuerdos del evento" title="Álbum de fotos">
      <Card>
        <div className="space-y-6 text-center">
          <p className="copy-justify mx-auto max-w-prose leading-relaxed text-stone-600">
            Las fotos del evento se comparten en un álbum de Google Fotos. Puedes verlas y añadir las tuyas
            desde ahí (según los permisos del álbum).
          </p>
          <div>
            <a
              className="inline-flex items-center gap-2 rounded-xl bg-gold-500 px-6 py-3.5 font-medium text-white shadow-sm transition hover:bg-gold-600"
              href={PHOTOS_ALBUM_URL}
              rel="noopener noreferrer"
              target="_blank"
            >
              Abrir álbum en Google Fotos
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </a>
          </div>
          <p className="text-xs leading-relaxed text-stone-500">
            Si el enlace no abre, pide el álbum a los anfitriones o revisa que estés usando la misma cuenta
            de Google con la que te compartieron el álbum.
          </p>
        </div>
      </Card>
    </Section>
  )
}
