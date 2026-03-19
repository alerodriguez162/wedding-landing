import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const rooms = await prisma.roomType.findMany({
      where: { active: true },
      orderBy: { capacity: 'asc' },
    })
    const withAvailability = rooms.map((r) => ({
      ...r,
      available: Math.max(0, r.totalAvailable - r.totalReserved),
      pricePerNight: Number(r.pricePerNight),
    }))
    return NextResponse.json(withAvailability)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Error al cargar habitaciones' }, { status: 500 })
  }
}
