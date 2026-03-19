import { NextResponse } from 'next/server'
import { validateAdminPassword, signAdminToken, setAdminCookie } from '@/lib/auth-admin'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const password = body.password
    if (!password || typeof password !== 'string') {
      return NextResponse.json({ message: 'Contraseña requerida' }, { status: 400 })
    }
    const isValid = await validateAdminPassword(password)
    if (!isValid) {
      return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 })
    }
    const token = await signAdminToken()
    await setAdminCookie(token)
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error(e)
    return NextResponse.json(
      { message: e instanceof Error ? e.message : 'Error de configuración' },
      { status: 500 },
    )
  }
}
