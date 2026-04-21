'use client'

import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

const mainSchedule: { time: string; title: string }[] = [
  { time: '4:00 – 5:30 p. m.', title: 'Misa y velo' },
  { time: '5:30 – 6:30 p. m.', title: 'Calenda' },
  { time: '6:30 – 7:00 p. m.', title: 'Break / traslado' },
  { time: '7:00 p. m.', title: 'Ceremonia' },
  { time: '7:30 p. m.', title: 'Comida y mariachi' },
  { time: '8:30 p. m.', title: 'Inicio del DJ' },
]

const afterDj: string[] = [
  'Presentación de los novios y de Julieta José, palabras y brindis',
  'Música durante la cena (30 min)',
  'Primer baile de los novios (5 min)',
  'Baile general (1 hora)',
  'Víbora de la mar',
  'Lanzamiento de ramo, liga y corbata',
  'Corte de pastel',
  'Tiempo de espera hasta la sirena',
]

const lateNight: { time: string; title: string }[] = [
  { time: '10:30 – 11:40 p. m.', title: 'Sirena' },
  { time: '11:10 p. m. en adelante', title: 'Música más intensa y ambiente de fiesta' },
  { time: '1:30 a. m.', title: 'Fin del evento' },
]

export function WeddingProgram() {
  return (
    <Section id="program" subtitle="Lo que viene" title="Programa del día">
      <Card>
        <div className="space-y-8">
          <p className="copy-justify text-sm leading-relaxed text-stone-600">
            Horarios orientativos; pequeños ajustes son posibles el mismo día.
          </p>

          <div>
            <h3 className="font-serif text-base font-semibold text-stone-800">Antes y durante la recepción</h3>
            <dl className="mt-4 space-y-4 border-l-2 border-gold-400/60 pl-4">
              {mainSchedule.map(({ time, title }) => (
                <div className="grid gap-1 sm:grid-cols-[minmax(0,11rem)_1fr] sm:gap-4" key={title + time}>
                  <dt className="shrink-0 text-sm font-medium tabular-nums text-gold-700">{time}</dt>
                  <dd className="text-sm leading-relaxed text-stone-700">
                    <span className="font-medium text-stone-800">{title}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-xl border border-blush-200/85 bg-blush-100/40 p-5">
            <h3 className="font-serif text-base font-semibold text-stone-800">Con el DJ y la fiesta</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-stone-700">
              {afterDj.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-base font-semibold text-stone-800">Madrugada</h3>
            <dl className="mt-4 space-y-3">
              {lateNight.map(({ time, title }) => (
                <div className="grid gap-1 sm:grid-cols-[minmax(0,13rem)_1fr] sm:gap-4" key={title}>
                  <dt className="shrink-0 text-sm font-medium tabular-nums text-gold-700">{time}</dt>
                  <dd className="text-sm leading-relaxed text-stone-700">{title}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Card>
    </Section>
  )
}
