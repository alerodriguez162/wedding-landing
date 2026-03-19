import { NextResponse } from 'next/server'
import {
  isSitePasswordEnabled,
  validateSitePassword,
  signSiteAccessToken,
  setSiteAccessCookie,
} from '@/lib/auth-site'

export async function POST(request: Request) {
  if (!isSitePasswordEnabled()) {
    return NextResponse.json({ message: 'Acceso no restringido' }, { status: 400 })
  }
  let body: { password?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Datos inválidos' }, { status: 400 })
  }
  const password = typeof body.password === 'string' ? body.password : ''
  if (!validateSitePassword(password)) {
    return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 })
  }
  const token = await signSiteAccessToken()
  await setSiteAccessCookie(token)
  return NextResponse.json({ ok: true })
}
