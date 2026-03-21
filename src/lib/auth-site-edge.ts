import { jwtVerify } from 'jose'

const JWT_ISSUER = 'wedding-landing-site'

/**
 * El middleware corre en Edge Runtime. Las variables sin NEXT_PUBLIC_ NO están disponibles ahí.
 * Usamos NEXT_PUBLIC_SITE_PROTECTED como flag (solo indica que hay puerta; no expone la contraseña).
 * La validación real sigue usando SITE_PASSWORD en el API (auth-site.ts).
 */
export function isSitePasswordEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SITE_PROTECTED === 'true'
}

export async function verifySiteAccessToken(token: string): Promise<boolean> {
  try {
    const raw = process.env.ADMIN_JWT_SECRET || process.env.JWT_SECRET
    const secret = raw?.trim()
    if (!secret || secret.length < 32) return false
    const encoded = new TextEncoder().encode(secret)
    const { payload } = await jwtVerify(token, encoded, { issuer: JWT_ISSUER })
    return payload.access === true
  } catch {
    return false
  }
}
