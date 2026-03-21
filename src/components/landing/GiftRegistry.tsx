import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import {
  GIFT_REGISTRY_BAPTISM_URL,
  GIFT_REGISTRY_WEDDING_URL,
  giftRegistryListIdFromUrl,
} from '@/lib/constants'

const registries = [
  {
    id: 'wedding' as const,
    label: 'Boda',
    url: GIFT_REGISTRY_WEDDING_URL,
  },
  {
    id: 'baptism' as const,
    label: 'Bautismo',
    url: GIFT_REGISTRY_BAPTISM_URL,
  },
]

export function GiftRegistry() {
  return (
    <Section id="gifts" subtitle="Tu cariño es nuestro mejor regalo" title="Mesa de regalos">
      <Card>
        <p className="copy-justify mb-4 font-sans text-sm leading-relaxed text-stone-600">
          Tenemos dos mesas en Liverpool: una para la boda y otra para el bautismo. Si buscas la mesa en el sitio de
          Liverpool, puedes usar el <strong className="font-medium text-stone-700">ID de mesa</strong> que aparece
          debajo.
        </p>
        <p className="mb-6 text-center text-xs leading-relaxed text-stone-500 sm:text-left">
          <span className="font-medium text-stone-600">iPhone o Instagram/WhatsApp:</span> si la página se queda en
          “Loading…” o no carga, usa <strong className="text-stone-700">Compartir → Abrir en Safari</strong> (o copia
          el enlace y ábrelo en Safari).
        </p>

        <div className="flex flex-col gap-5 sm:mx-auto sm:max-w-md">
          {registries.map((r) => {
            const listId = giftRegistryListIdFromUrl(r.url)
            return (
              <div className="flex flex-col gap-2" key={r.id}>
                <p className="text-center text-sm text-stone-600 sm:text-left">
                  <span className="font-medium text-stone-800">{r.label}</span>
                  <span className="text-stone-400"> · </span>
                  <span className="text-stone-500">ID mesa</span>{' '}
                  <code className="rounded-md bg-sand-100 px-2 py-0.5 font-mono text-sm font-semibold text-stone-800">
                    {listId}
                  </code>
                </p>
                <a
                  className="inline-flex w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-stone-800 px-5 py-3.5 text-center text-sm font-semibold text-white shadow-md transition hover:bg-stone-700 active:bg-stone-900"
                  href={r.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Abrir en Liverpool — {r.label}
                  <svg className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </a>
              </div>
            )
          })}
        </div>
      </Card>
    </Section>
  )
}
