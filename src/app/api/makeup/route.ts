import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { makeupSchema } from '@/features/makeup/makeup-schema'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = makeupSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.errors.map((e) => e.message).join(', ') },
        { status: 400 },
      )
    }
    await prisma.makeupHairRequest.create({
      data: {
        name: parsed.data.name.trim(),
        peopleCount: parsed.data.peopleCount,
        serviceType: parsed.data.serviceType,
      },
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Error al guardar' }, { status: 500 })
  }
}
