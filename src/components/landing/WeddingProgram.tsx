'use client'

import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

export function WeddingProgram() {
  return (
    <Section id="program" subtitle="Lo que viene" title="Programa de la boda">
      <Card>
        <div className="space-y-3 text-center">
          <p className="font-serif text-lg leading-relaxed text-stone-600">
            Próximamente compartiremos aquí el programa del día.
          </p>
          <p className="text-sm leading-relaxed text-stone-500">
            Horarios, ceremonia, recepción y más detalles.
          </p>
        </div>
      </Card>
    </Section>
  )
}
