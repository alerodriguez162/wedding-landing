/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const transportDefaults = [
    {
      key: 'taxi_phones',
      value: '["5532276938","9581180176","5528584046"]',
      description: 'Teléfonos de contactos para taxis (JSON array: Kari, Eduardo, Fabi)',
    },
    {
      key: 'huatulco_instructions',
      value: 'Transporte público (económico, ~$100): Salir del aeropuerto hasta la avenida principal. Tomar Urvan hacia San Pedro Pochutla (~$40). Bajarse en el crucero de Pochutla o hasta el final. Tomar taxi colectivo a Puerto Ángel, Playa Panteón (~$25). Transporte privado: taxi directo del aeropuerto a Puerto Ángel (~$800-$1,000).',
      description: 'Instrucciones detalladas para llegar desde Huatulco (HUX)',
    },
    {
      key: 'puerto_escondido_instructions',
      value: 'Transporte público (~$100): Del aeropuerto tomar taxi hacia la terminal ADO. De ahí tomar transporte hacia San Pedro Pochutla. Bajarse en el crucero de Pochutla. Tomar taxi a Puerto Ángel, Playa Panteón. Transporte privado: taxi directo del aeropuerto al hospedaje (~$1,300-$1,800).',
      description: 'Instrucciones detalladas para llegar desde Puerto Escondido (PXM)',
    },
    { key: 'map_embed_or_url', value: '', description: 'URL o iframe del mapa (opcional)' },
  ]

  for (const t of transportDefaults) {
    await prisma.transportInfo.upsert({
      where: { key: t.key },
      create: { key: t.key, value: t.value, description: t.description ?? undefined },
      update: {},
    })
  }

  console.log('Seed completado.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
