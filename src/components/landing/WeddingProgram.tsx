'use client'

import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

export function WeddingProgram() {
  return (
    <Section id="program" subtitle="Lo que viene" title="Programa del día">
      <Card>
        <div className="space-y-3">
          <p className="copy-justify font-serif text-lg leading-relaxed text-stone-600">
            Próximamente compartiremos aquí el programa del día.
          </p>
          <p className="copy-justify text-sm leading-relaxed text-stone-500">
            Horarios, ceremonias, recepción y más detalles.
          </p>
        </div>
      </Card>
    </Section>
  )
}
