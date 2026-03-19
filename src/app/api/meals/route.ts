import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { mealSelectionSchema } from '@/features/meals/meal-schema'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const parsed = mealSelectionSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { message: parsed.error.errors.map((e) => e.message).join(', ') },
        { status: 400 },
      )
    }
    const { senderName, attendeeName, adultMainDish, kidsMainDish, notes } = parsed.data
    const imageUrls = Array.isArray(body.imageUrls) ? body.imageUrls : []

    await prisma.mealSelection.create({
      data: {
        senderName: senderName.trim(),
        attendeeName: attendeeName?.trim() || null,
        adultMainDish,
        kidsMainDish: kidsMainDish || null,
        imageUrls,
        notes: notes?.trim() || null,
      },
    })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Error al guardar la selección' }, { status: 500 })
  }
}
