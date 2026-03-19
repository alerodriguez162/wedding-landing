import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth-admin'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }
  try {
    const list = await prisma.roomType.findMany({ orderBy: { capacity: 'asc' } })
    return NextResponse.json(
      list.map((r) => ({
        ...r,
        pricePerNight: Number(r.pricePerNight),
        available: r.totalAvailable - r.totalReserved,
      })),
    )
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }
  try {
    const body = await req.json()
    const { id, totalAvailable, active } = body
    if (!id) {
      return NextResponse.json({ message: 'id requerido' }, { status: 400 })
    }
    const data: { totalAvailable?: number; active?: boolean } = {}
    if (typeof totalAvailable === 'number') data.totalAvailable = totalAvailable
    if (typeof active === 'boolean') data.active = active
    await prisma.roomType.update({
      where: { id },
      data,
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
