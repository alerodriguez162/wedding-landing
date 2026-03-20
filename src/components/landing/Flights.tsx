'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

const tips = [
  {
    title: 'Aeropuerto principal recomendado',
    text: 'Huatulco (HUX) — suele ser la opción más práctica para conectar con traslados hacia la zona del evento.',
  },
  {
    title: 'Alternativa',
    text: 'También puedes volar a Puerto Escondido (PXM) si te conviene más el horario o el precio.',
  },
  {
    title: 'Aerolínea',
    text: 'VivaAerobus suele ser la más económica para estas fechas (revisa también otras aerolíneas).',
  },
  { title: 'Consejo', text: 'Reserva con anticipación para mejores precios y disponibilidad.' },
]

export function Flights() {
  return (
    <Section id="flights" subtitle="Recomendaciones para tu llegada" title="Vuelos">
      <Card>
        <p className="mb-8 text-center font-sans leading-relaxed text-stone-600">
          Te sugerimos llegar al aeropuerto de <strong>Huatulco</strong>. Si te conviene más,
          también puedes llegar a <strong>Puerto Escondido</strong>. Para las fechas del evento, <strong>VivaAerobus</strong> suele ofrecer tarifas económicas — compara opciones.
        </p>
        <ul className="space-y-4">
          {tips.map((item, i) => (
            <motion.li
              className="flex gap-4 rounded-xl bg-sand-50 p-4"
              initial={{ opacity: 0, x: -8 }}
              key={item.title}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gold-400/20 text-gold-700">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M5 13l4 4L19 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </span>
              <div>
                <h3 className="font-semibold text-stone-800">{item.title}</h3>
                <p className="text-stone-600">{item.text}</p>
              </div>
            </motion.li>
          ))}
        </ul>
      </Card>
    </Section>
  )
}
