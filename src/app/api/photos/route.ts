import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { prisma } from '@/lib/prisma'

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'photos')

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    const uploaderName = (formData.get('uploaderName') as string)?.trim() || null

    if (!file || !file.type.startsWith('image/')) {
      return NextResponse.json({ message: 'Selecciona una imagen válida' }, { status: 400 })
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ message: 'La imagen no debe superar 5 MB' }, { status: 400 })
    }

    await mkdir(UPLOAD_DIR, { recursive: true })
    const ext = path.extname(file.name) || '.jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
    const filepath = path.join(UPLOAD_DIR, filename)
    const bytes = await file.arrayBuffer()
    await writeFile(filepath, Buffer.from(bytes))

    const imageUrl = `/uploads/photos/${filename}`

    await prisma.photoUpload.create({
      data: { uploaderName, imageUrl },
    })

    return NextResponse.json({ ok: true, imageUrl })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ message: 'Error al subir la imagen' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const photos = await prisma.photoUpload.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(photos.map((p) => ({ ...p, imageUrl: p.imageUrl })))
  } catch (e) {
    console.error(e)
    return NextResponse.json([], { status: 500 })
  }
}
