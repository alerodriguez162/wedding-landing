import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { lodgingSchema } from '@/features/lodging/lodging-schema'
import { Decimal } from '@prisma/client/runtime/library'

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
      body.nights ??
      (data.arrivalDate && data.departureDate
        ? Math.ceil(
            (new Date(data.departureDate).getTime() - new Date(data.arrivalDate).getTime()) /
              (1000 * 60 * 60 * 24),
          )
        : null)
    const estimatedTotal = body.estimatedTotal ?? null

    if (data.willingToShare) {
      await prisma.lodgingRequest.create({
        data: {
          name: data.name.trim(),
          numberOfPeople,
          adults: data.adults,
          children: data.children,
          arrivalDate: new Date(data.arrivalDate),
          departureDate: new Date(data.departureDate),
          willingToShare: true,
          selectedRoomType: null,
          nights,
          estimatedTotal: null,
          paymentStatus: 'pending',
          notes: data.notes?.trim() || null,
        },
      })
      return NextResponse.json({ ok: true })
    }

    if (!data.selectedRoomType) {
      return NextResponse.json(
        { message: 'Selecciona un tipo de habitación o indica que estás dispuesto a compartir.' },
        { status: 400 },
      )
    }

    const room = await prisma.roomType.findFirst({
      where: { roomType: data.selectedRoomType, active: true },
    })
    if (!room) {
      return NextResponse.json({ message: 'Tipo de habitación no válido' }, { status: 400 })
    }
    const available = room.totalAvailable - room.totalReserved
    if (available <= 0) {
      return NextResponse.json(
        { message: 'Ya no hay disponibilidad para esta habitación' },
        { status: 409 },
      )
    }
    if (room.capacity < numberOfPeople) {
      return NextResponse.json(
        { message: `Esta habitación es para máximo ${room.capacity} personas` },
        { status: 400 },
      )
    }

    const roomType = data.selectedRoomType
    await prisma.$transaction(async (tx) => {
      const room = await tx.roomType.findFirst({
        where: { roomType, active: true },
      })
      if (!room || room.totalAvailable - room.totalReserved <= 0) {
        throw new Error(
          'Ya no hay disponibilidad para esta habitación. Otro invitado pudo haberla reservado.',
        )
      }
      await tx.roomType.update({
        where: { id: room.id },
        data: { totalReserved: { increment: 1 } },
      })
      await tx.lodgingRequest.create({
        data: {
          name: data.name.trim(),
          numberOfPeople,
          adults: data.adults,
          children: data.children,
          arrivalDate: new Date(data.arrivalDate),
          departureDate: new Date(data.departureDate),
          willingToShare: false,
          selectedRoomType: roomType,
          nights,
          estimatedTotal: estimatedTotal != null ? new Decimal(estimatedTotal) : null,
          paymentStatus: 'pending',
          notes: data.notes?.trim() || null,
        },
      })
    })

    return NextResponse.json({ ok: true })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Error al guardar'
    const status = msg.includes('disponibilidad') ? 409 : 500
    return NextResponse.json({ message: msg }, { status })
  }
}
