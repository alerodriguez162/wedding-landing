'use client'

import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'

export function Transfers() {
  return (
    <Section id="transfers" subtitle="Cómo llegar" title="Traslados">
      <Card>
        <div className="mb-10 space-y-3 text-center">
          <p className="font-medium leading-snug text-stone-800">
            🚗 Opciones de traslado a Puerto Ángel (Playa Panteón)
          </p>
          <p className="text-stone-600">
            📍 <strong>Destino final:</strong> Playa Panteón
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <h3 className="font-serif text-lg font-semibold text-stone-800">✈ Desde Huatulco</h3>
            <div className="mt-4 space-y-4 text-stone-600">
              <div className="rounded-xl border border-blush-200/85 bg-blush-100/45 p-4">
                <p className="font-medium text-stone-800">
                  🟢 Transporte público (económico) – ~$100 por persona
                </p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                  <li>Salir del aeropuerto hasta la avenida principal</li>
                  <li>Ahí tomar una Urvan hacia San Pedro Pochutla (~$40)</li>
                  <li>Bajarse en el crucero de Pochutla o hasta el final del recorrido</li>
                  <li>Tomar taxi colectivo a Puerto Ángel a playa Panteón (~$25)</li>
                </ol>
                <p className="mt-2 text-sm font-medium text-gold-700">
                  👉 Es la opción más fácil y práctica
                </p>
              </div>
              <div className="rounded-xl border border-blush-200/85 p-4">
                <p className="font-medium text-stone-800">🚕 Transporte privado – ~$800 a $1,000</p>
                <p className="mt-1 text-sm">Taxi directo del aeropuerto a Puerto Ángel</p>
              </div>
              <p className="text-sm">
                📞 <strong>Taxi en Huatulco:</strong> <a className="text-gold-600 underline" href="tel:+529581224362">
                  +52 1 958 122 4362
                </a> Don Ligorio José
              </p>
              <p className="text-sm text-stone-600">
                Desde Huatulco, si se requiere el servicio de taxi hay que solicitarlo con
                anticipación al señor Don Ligorio; dependerá de la disponibilidad.
              </p>
            </div>
          </section>

          <section>
            <h3 className="font-serif text-lg font-semibold text-stone-800">
              ✈ Desde Puerto Escondido
            </h3>
            <div className="mt-4 space-y-4 text-stone-600">
              <div className="rounded-xl border border-blush-200/85 bg-blush-200/25 p-4">
                <p className="font-medium text-stone-800">
                  🟡 Transporte público – ~$100 por persona
                </p>
                <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
                  <li>Del aeropuerto tomar taxi hacia la terminal ADO</li>
                  <li>De ahí tomar transporte hacia San Pedro Pochutla</li>
                  <li>Bajarse en el crucero de Pochutla</li>
                  <li>Tomar taxi a Puerto Ángel, Playa Panteón</li>
                </ol>
                <p className="mt-2 text-sm text-stone-800">
                  👉 Son 3 transportes, más largo y menos práctico
                </p>
              </div>
              <div className="rounded-xl border border-blush-200/85 p-4">
                <p className="font-medium text-stone-800">
                  🚕 Transporte privado – ~$1,300 a $1,800
                </p>
                <p className="mt-1 text-sm">Taxi directo del aeropuerto al hospedaje</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="font-serif text-lg font-semibold text-stone-800">
              🚘 Extra: renta de auto
            </h3>
            <p className="mt-2 text-stone-600">
              Aproximadamente <strong>$700 por día</strong>. Buena opción si quieren moverse
              libremente.
            </p>
            <div className="mt-4 rounded-xl border border-blush-200/85 bg-blush-100/40 p-4 text-sm leading-relaxed text-stone-700">
              <p className="font-medium text-stone-800">Sugerencia: reserva desde el aeropuerto</p>
              <p className="mt-2">
                Puedes comparar opciones y reservar recogida en aeropuerto (según tu vuelo a Huatulco o
                Puerto Escondido) en{' '}
                <a
                  className="font-medium text-gold-600 underline decoration-gold-400/70 underline-offset-2 hover:text-gold-700"
                  href="https://www.rentcars.com/es-mx/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Rentcars
                </a>
                . Revisa bien la ubicación de entrega y el tipo de vehículo antes de confirmar.
              </p>
            </div>
          </section>

          <div className="rounded-xl border border-gold-200 bg-gold-50/50 p-4 text-sm text-stone-700">
            <p className="font-medium text-stone-800">💡 Recomendación</p>
            <ul className="mt-2 flex flex-col gap-1">
              <li>✔ Más fácil: Huatulco en transporte público</li>
              <li>✔ Más cómodo: taxi privado</li>
              <li>⚠ Más complicado: Puerto Escondido en transporte público</li>
            </ul>
          </div>

          <p className="rounded-xl bg-blush-100/40 p-4 text-center text-sm text-stone-600">
            Contáctanos en cuanto tengan sus vuelos confirmados para coordinar si lo necesitan.
          </p>
        </div>
      </Card>
    </Section>
  )
}
