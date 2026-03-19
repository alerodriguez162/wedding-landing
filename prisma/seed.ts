/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.roomType.upsert({
    where: { roomType: 'quad' },
    create: {
      roomType: 'quad',
      label: 'Habitación para 4 personas',
      capacity: 4,
      pricePerNight: 2000,
      totalAvailable: 1,
      totalReserved: 0,
      active: true,
    },
    update: {},
  })

  await prisma.roomType.upsert({
    where: { roomType: 'six' },
    create: {
      roomType: 'six',
      label: 'Habitación para 6 personas',
      capacity: 6,
      pricePerNight: 2500,
      totalAvailable: 1,
      totalReserved: 0,
      active: true,
    },
    update: {},
  })

  await prisma.roomType.upsert({
    where: { roomType: 'matrimonial' },
    create: {
      roomType: 'matrimonial',
      label: 'Habitación matrimonial (2 personas)',
      capacity: 2,
      pricePerNight: 1250,
      totalAvailable: 3,
      totalReserved: 0,
      active: true,
    },
    update: {},
  })

  await prisma.roomType.upsert({
    where: { roomType: 'king' },
    create: {
      roomType: 'king',
      label: 'Habitación king size (2 personas)',
      capacity: 2,
      pricePerNight: 1600,
      totalAvailable: 2,
      totalReserved: 0,
      active: true,
    },
    update: {},
  })

  const transportDefaults = [
    {
      key: 'taxi_phones',
      value: '["5532276938","5528584046"]',
      description: 'Teléfonos de taxistas (JSON array)',
    },
    {
      key: 'huatulco_instructions',
      value: 'Instrucciones para quienes llegan a Huatulco.',
      description: null,
    },
    {
      key: 'puerto_escondido_instructions',
      value: 'Instrucciones para quienes llegan a Puerto Escondido. Tomar la Urvan en...',
      description: null,
    },
    { key: 'map_embed_or_url', value: '', description: 'URL o iframe del mapa' },
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
