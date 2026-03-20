import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { GIFT_REGISTRY_BAPTISM_URL, GIFT_REGISTRY_WEDDING_URL } from '@/lib/constants'

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
        <p className="copy-justify mb-8 font-sans text-sm leading-relaxed text-stone-600">
          Tenemos dos mesas en Liverpool: una para la boda y otra para el bautismo. Elige la que corresponda y
          ábrela en el sitio de Liverpool.
        </p>

        <div className="flex flex-col gap-4 sm:mx-auto sm:max-w-md">
          {registries.map((r) => (
            <a
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gold-500 px-5 py-3.5 text-center text-sm font-semibold text-white shadow-md transition hover:bg-gold-600"
              href={r.url}
              key={r.id}
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
          ))}
        </div>
      </Card>
    </Section>
  )
}
