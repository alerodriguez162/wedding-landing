import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth-admin'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }
  try {
    const list = await prisma.lodgingRequest.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(
      list.map((r) => ({
        ...r,
        estimatedTotal: r.estimatedTotal ? Number(r.estimatedTotal) : null,
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
    const { id, paymentStatus } = await req.json()
    if (!id || !paymentStatus) {
      return NextResponse.json({ message: 'id y paymentStatus requeridos' }, { status: 400 })
    }
    await prisma.lodgingRequest.update({
      where: { id },
      data: { paymentStatus },
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
