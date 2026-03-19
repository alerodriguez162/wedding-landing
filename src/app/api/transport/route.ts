import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const rows = await prisma.transportInfo.findMany()
    const data: Record<string, string> = {}
    for (const r of rows) {
      data[r.key] = r.value
    }
    return NextResponse.json(data)
  } catch (e) {
    console.error(e)
    return NextResponse.json({}, { status: 500 })
  }
}
