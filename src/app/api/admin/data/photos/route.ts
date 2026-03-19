import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth-admin'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getAdminSession()
  if (!session) {
    return NextResponse.json({ message: 'No autorizado' }, { status: 401 })
  }
  try {
    const list = await prisma.photoUpload.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(list)
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Error' }, { status: 500 })
  }
}
