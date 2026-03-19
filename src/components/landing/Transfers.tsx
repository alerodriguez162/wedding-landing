'use client'

import { useState, useEffect } from 'react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { CONTACTS } from '@/lib/constants'

type TransportData = {
  taxiPhones: string
  huatulcoInstructions: string
  puertoEscondidoInstructions: string
  mapEmbedOrUrl: string
}

const defaultTransport: TransportData = {
  taxiPhones: '5532276938, 5528584046',
  huatulcoInstructions:
    'Si llegas a Huatulco, contacta a los taxistas listados para coordinar tu traslado hasta Beach Club. Contáctenos en cuanto tengan sus vuelos confirmados. En caso de no haber disponibilidad, háganoslo saber para ayudarles con su traslado.',
  puertoEscondidoInstructions:
    'Si llegas a Puerto Escondido, puedes tomar la Urvan con dirección a la zona del evento. Contáctenos en cuanto tengan sus vuelos confirmados. En caso de no haber disponibilidad, háganoslo saber para ayudarles con su traslado.',
  mapEmbedOrUrl: '',
}

function formatWhatsAppUrl(phone: string) {
  const digits = phone.replace(/\D/g, '')
  return digits ? `https://wa.me/52${digits}` : null
}

function mapApiTransportToData(api: Record<string, unknown>): Partial<TransportData> {
  return {
    taxiPhones: typeof api.taxi_phones === 'string' ? api.taxi_phones : undefined,
    huatulcoInstructions:
      typeof api.huatulco_instructions === 'string' ? api.huatulco_instructions : undefined,
    puertoEscondidoInstructions:
      typeof api.puerto_escondido_instructions === 'string'
        ? api.puerto_escondido_instructions
        : undefined,
    mapEmbedOrUrl: typeof api.map_embed_or_url === 'string' ? api.map_embed_or_url : undefined,
  }
}

export function Transfers() {
  const [transportData, setTransportData] = useState<TransportData>(defaultTransport)

  useEffect(() => {
    fetch('/api/transport')
      .then((res) => (res.ok ? res.json() : {}))
      .then((apiJson) => {
        if (apiJson && typeof apiJson === 'object') {
          const mapped = mapApiTransportToData(apiJson as Record<string, unknown>)
          setTransportData((prev) => ({
            ...prev,
            ...Object.fromEntries(Object.entries(mapped).filter(([, v]) => v !== undefined)),
          }))
        }
      })
      .catch(() => {})
  }, [])

  const phoneList = transportData.taxiPhones
    ? transportData.taxiPhones
        .split(/[,;]/)
        .map((phone) => phone.trim())
        .filter(Boolean)
    : []

  return (
    <Section id="transfers" subtitle="Cómo llegar" title="Traslados">
      <Card>
        <p className="mb-6 rounded-xl bg-amber-50 p-4 text-amber-900">
          Por favor contáctennos en cuanto tengan sus vuelos confirmados. En caso de no haber
          disponibilidad, háganoslo saber para ayudarles con su traslado.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="font-semibold text-stone-800">Teléfonos de taxistas</h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {phoneList.length > 0 ? (
                phoneList.map((phone) => {
                  const whatsAppUrl = formatWhatsAppUrl(phone)
                  return (
                    <li key={phone}>
                      {whatsAppUrl ? (
                        <a
                          className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 py-2 text-white hover:bg-[#20bd5a]"
                          href={whatsAppUrl}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {phone} · WhatsApp
                        </a>
                      ) : (
                        <span className="rounded-xl bg-sand-100 px-4 py-2">{phone}</span>
                      )}
                    </li>
                  )
                })
              ) : (
                <li>
                  <a
                    className="text-gold-600 underline"
                    href={`https://wa.me/52${CONTACTS[0].phone}`}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Contactar a Kari
                  </a>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-stone-800">Si llegas a Huatulco</h3>
            <p className="mt-2 text-stone-600">
              {transportData.huatulcoInstructions || defaultTransport.huatulcoInstructions}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-stone-800">Si llegas a Puerto Escondido</h3>
            <p className="mt-2 text-stone-600">
              {transportData.puertoEscondidoInstructions ||
                defaultTransport.puertoEscondidoInstructions}
            </p>
          </div>

          {transportData.mapEmbedOrUrl && (
            <div className="rounded-xl overflow-hidden border border-sand-200">
              {transportData.mapEmbedOrUrl.includes('iframe') ? (
                <div dangerouslySetInnerHTML={{ __html: transportData.mapEmbedOrUrl }} />
              ) : (
                <a
                  className="block p-4 text-gold-600 underline"
                  href={transportData.mapEmbedOrUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Ver mapa / ruta de la Urvan
                </a>
              )}
            </div>
          )}
        </div>
      </Card>
    </Section>
  )
}
