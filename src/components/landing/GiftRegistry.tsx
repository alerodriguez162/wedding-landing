'use client'

import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { GIFT_REGISTRY_LINK } from '@/lib/constants'

export function GiftRegistry() {
  const hasLink = Boolean(GIFT_REGISTRY_LINK?.trim())

  return (
    <Section id="gifts" subtitle="Tu cariño es nuestro mejor regalo" title="Mesa de regalos">
      <Card>
        {hasLink ? (
          <p className="text-center leading-relaxed">
            <a
              className="inline-flex items-center gap-2 text-gold-600 underline decoration-gold-400 underline-offset-2 hover:text-gold-700"
              href={GIFT_REGISTRY_LINK}
              rel="noopener noreferrer"
              target="_blank"
            >
              Ver mesa de regalos
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </a>
          </p>
        ) : (
          <p className="text-center leading-relaxed text-stone-600">
            Te pasamos el enlace de la mesa de regalos más adelante. ¡Gracias por tu paciencia!
          </p>
        )}
      </Card>
    </Section>
  )
}
