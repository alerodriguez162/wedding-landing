import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const COOKIE_NAME = 'site_access'
const TOKEN_MAX_AGE_SEC = 60 * 60 * 24 * 365 // 1 year
const JWT_ISSUER = 'wedding-landing-site'

function getSecret(): Uint8Array {
  const raw = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET
  const secret = raw?.trim()
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_JWT_SECRET must be set for site access (min 32 chars)')
  }
  return new TextEncoder().encode(secret)
}

export function isSitePasswordEnabled(): boolean {
  return Boolean(process.env.SITE_PASSWORD?.trim())
}

export function validateSitePassword(password: string): boolean {
  const expected = process.env.SITE_PASSWORD
  if (!expected) return false
  return password.trim() === expected.trim()
}

export async function signSiteAccessToken(): Promise<string> {
  const secret = getSecret()
  return new SignJWT({ access: true })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(JWT_ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_MAX_AGE_SEC}s`)
    .sign(secret)
}

export async function verifySiteAccessToken(token: string): Promise<boolean> {
  try {
    const secret = getSecret()
    const { payload } = await jwtVerify(token, secret, { issuer: JWT_ISSUER })
    return payload.access === true
  } catch {
    return false
  }
}

export async function setSiteAccessCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE_SEC,
    path: '/',
  })
}

/** Opciones de cookie para `site_access` (usar con NextResponse.cookies.set en Route Handlers). */
export function getSiteAccessCookieOptions(token: string) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true as const,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: TOKEN_MAX_AGE_SEC,
    path: '/',
  }
}

export { COOKIE_NAME, JWT_ISSUER, TOKEN_MAX_AGE_SEC }
