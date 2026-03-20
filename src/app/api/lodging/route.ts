import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { lodgingSchema } from '@/features/lodging/lodging-schema'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = lodgingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.errors.map((e) => e.message).join(', ') },
        { status: 400 },
      )
    }
    const data = parsed.data
    const numberOfPeople = data.adults + data.children
    const nights =
      data.arrivalDate && data.departureDate
        ? Math.ceil(
            (new Date(data.departureDate).getTime() - new Date(data.arrivalDate).getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : null

    await prisma.lodgingRequest.create({
      data: {
        name: data.name.trim(),
        numberOfPeople,
        adults: data.adults,
        children: data.children,
        roomsNeeded: data.roomsNeeded,
        roomBreakdown: data.roomBreakdown?.trim() || null,
        arrivalDate: new Date(data.arrivalDate),
        departureDate: new Date(data.departureDate),
        willingToShare: data.willingToShare ?? false,
        nights,
        estimatedTotal: null,
        paymentStatus: 'pending',
        notes: data.notes?.trim() || null,
      },
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Error al guardar' }, { status: 500 })
  }
}
