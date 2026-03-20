'use client'

import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { PinterestBoardEmbed } from '@/components/landing/PinterestBoardEmbed'
import { PINTEREST_BOARD_URL, PINTEREST_SHARE_URL } from '@/lib/constants'

export function DressCode() {
  return (
    <Section id="dress-code" subtitle="Boho Chic Elegante de Playa" title="Dress code">
      <Card>
        <p className="mb-8 leading-relaxed text-stone-600">
          Queremos que nos acompañen en un ambiente relajado, natural y elegante frente al mar.
          Nuestra inspiración es un estilo bohemio chic, fresco pero sofisticado.
        </p>

        <div className="mb-8">
          <p className="mb-4 font-medium text-stone-800">✨ Inspírate con nuestro tablero</p>
          <PinterestBoardEmbed boardUrl={PINTEREST_BOARD_URL} shareUrl={PINTEREST_SHARE_URL} />
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="font-serif text-lg font-semibold text-stone-800">👗 Para ellas</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-stone-600">
              <li>Vestidos ligeros, fluidos y frescos (largos o midi)</li>
              <li>Jumpsuit, palazzo</li>
              <li>Telas como lino, algodón, gasa o satín ligero</li>
              <li>Colores: tonos neutros, tierra, pasteles o colores suaves</li>
              <li>Estampados sutiles florales o tropicales (opcional)</li>
            </ul>
            <p className="mt-3 text-sm font-medium text-stone-700">Evitar:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-600">
              <li>Blanco, ivory o tonos muy similares (reservados para la novia)</li>
              <li>Vestidos muy formales tipo gala pesada</li>
            </ul>
            <p className="mt-3 text-sm font-medium text-stone-700">Calzado:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-600">
              <li>Sandalias, alpargatas, flats o tacón ancho (ideal para arena)</li>
            </ul>
            <p className="mt-3 text-sm font-medium text-stone-700">Extra:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-600">
              <li>Accesorios naturales: conchas, dorados, tejidos</li>
              <li>Maquillaje y peinado relajado (ondas suaves, trenzas)</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-stone-800">👔 Para ellos</h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-stone-600">
              <li>Traje ligero o conjunto tipo lino/algodón</li>
              <li>Colores claros: beige, arena, gris claro, azul claro</li>
              <li>Camisa fresca (puede ser sin corbata para un look más relajado)</li>
            </ul>
            <p className="mt-3 text-sm font-medium text-stone-700">Calzado:</p>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-600">
              <li>Mocasines, loafers o zapatos sin calcetines visibles</li>
              <li>También pueden usar sandalias elegantes si lo prefieren</li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold text-stone-800">
              🌊 Recomendaciones generales
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-stone-600">
              <li>Considerar el clima cálido y húmedo</li>
              <li>Usar telas frescas y cómodas</li>
              <li>Traer lentes de sol y protección solar</li>
              <li>Evitar tacones delgados (se entierran en la arena)</li>
            </ul>
          </div>

          <p className="rounded-xl bg-sand-50 p-4 text-sm text-stone-700">
            <span className="font-medium">✨ Nota especial:</span> el novio vestirá traje y la novia
            un vestido blanco con mantilla, manteniendo un estilo bohemio elegante acorde al entorno
            de playa.
          </p>
        </div>
      </Card>
    </Section>
  )
}
