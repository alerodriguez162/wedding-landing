import { cookies } from 'next/headers'
import { SignJWT, jwtVerify } from 'jose'

const COOKIE_NAME = 'admin_token'
const TOKEN_MAX_AGE_SEC = 60 * 60 * 24 * 7 // 7 days
const JWT_ISSUER = 'wedding-landing-admin'

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET
  if (!secret || secret.length < 32) {
    throw new Error('ADMIN_JWT_SECRET or JWT_SECRET must be set (min 32 chars)')
  }
  return new TextEncoder().encode(secret)
}

export async function validateAdminPassword(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  return password === expected
}

export async function signAdminToken(): Promise<string> {
  const secret = getJwtSecret()
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(JWT_ISSUER)
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_MAX_AGE_SEC}s`)
    .sign(secret)
  return token
}

export async function verifyAdminToken(token: string): Promise<{ role: string } | null> {
  try {
    const secret = getJwtSecret()
    const { payload } = await jwtVerify(token, secret, {
      issuer: JWT_ISSUER,
    })
    if (payload.role === 'admin') {
      return { role: payload.role as string }
    }
    return null
  } catch {
    return null
  }
}

export async function getAdminSession(): Promise<{ role: string } | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyAdminToken(token)
}

export async function setAdminCookie(token: string): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: TOKEN_MAX_AGE_SEC,
    path: '/',
  })
}

export async function deleteAdminCookie(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export { COOKIE_NAME }
