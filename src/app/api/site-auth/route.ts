import { NextResponse } from 'next/server'
import {
  isSitePasswordEnabled,
  validateSitePassword,
  signSiteAccessToken,
  getSiteAccessCookieOptions,
} from '@/lib/auth-site'

/**
 * La cookie debe ir en NextResponse (Set-Cookie). `cookies().set()` en Route Handlers
 * a veces no llega al navegador; sin cookie el middleware sigue redirigiendo a /acceso.
 */
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
  const res = NextResponse.json({ ok: true })
  const opts = getSiteAccessCookieOptions(token)
  res.cookies.set(opts.name, opts.value, {
    httpOnly: opts.httpOnly,
    secure: opts.secure,
    sameSite: opts.sameSite,
    maxAge: opts.maxAge,
    path: opts.path,
  })
  return res
}

/** Diagnóstico (sin exponer secretos): comprueba que el servidor ve SITE_PASSWORD y JWT. */
export async function GET() {
  const jwtLen = (process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET || '').trim().length
  let hint = 'OK: reinicia el servidor tras cambiar .env'
  if (jwtLen < 32) {
    hint = 'ADMIN_JWT_SECRET debe tener al menos 32 caracteres'
  } else if (!process.env.SITE_PASSWORD?.trim()) {
    hint = 'Define SITE_PASSWORD en .env'
  }
  return NextResponse.json({
    sitePasswordConfigured: Boolean(process.env.SITE_PASSWORD?.trim()),
    jwtSecretOk: jwtLen >= 32,
    hint,
  })
}
