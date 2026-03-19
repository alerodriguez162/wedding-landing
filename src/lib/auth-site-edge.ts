import { jwtVerify } from 'jose'

const JWT_ISSUER = 'wedding-landing-site'

export function isSitePasswordEnabled(): boolean {
  return Boolean(process.env.SITE_PASSWORD?.trim())
}

export async function verifySiteAccessToken(token: string): Promise<boolean> {
  try {
    const secret = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET
    if (!secret || secret.length < 32) return false
    const encoded = new TextEncoder().encode(secret)
    const { payload } = await jwtVerify(token, encoded, { issuer: JWT_ISSUER })
    return payload.access === true
  } catch {
    return false
  }
}
