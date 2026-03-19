'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { VENUE_FB_LINK } from '@/lib/constants'

const paragraphs = [
  'Gracias por acompañar a Dulce Fabiola Rodríguez Miranda y José Eduardo José en este día tan importante, así como a Julieta José Rodríguez al celebrar su bautizo.',
  'Hemos creado este espacio especialmente para ti, donde podrás conocer todos los detalles del evento que se llevará a cabo el próximo 25 de abril de 2026 en Beach Club.',
  'Este sitio tiene como finalidad ayudarnos a tener una mejor organización, por lo que te agradecemos mucho el tiempo que te tomes para completar la información solicitada.',
  'Además, si lo deseas, puedes unirte a nuestro grupo de WhatsApp (no es obligatorio), donde estaremos compartiendo información adicional en caso de ser necesario.',
  '¡Gracias por ser parte de este momento tan especial!',
]

export function Welcome() {
  return (
    <Section id="welcome" subtitle="Tu presencia es nuestro mejor regalo" title="Bienvenidos">
      <Card>
        <div className="prose prose-stone mx-auto max-w-none prose-p:leading-relaxed prose-p:text-stone-600">
          {paragraphs.map((p, i) => (
            <motion.p
              className="mb-4 font-sans text-base sm:text-lg"
              initial={{ opacity: 0, y: 8 }}
              key={i}
              transition={{ delay: i * 0.08 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              {p}
            </motion.p>
          ))}
        </div>
        <p className="mt-6 text-center">
          <a
            className="inline-flex items-center gap-2 text-gold-600 underline decoration-gold-400 underline-offset-2 hover:text-gold-700"
            href={VENUE_FB_LINK}
            rel="noopener noreferrer"
            target="_blank"
          >
            Ver Beach Club en Facebook
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
      </Card>
    </Section>
  )
}
