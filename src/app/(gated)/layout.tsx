import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import {
  isSitePasswordEnabled,
  verifySiteAccessToken,
  COOKIE_NAME,
} from '@/lib/auth-site'

/**
 * Protección por contraseña en el layout (Node.js).
 * El middleware Edge no tiene acceso a SITE_PASSWORD; esta comprobación sí.
 */
export default async function GatedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!isSitePasswordEnabled()) {
    return children
  }

  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (token && (await verifySiteAccessToken(token))) {
    return children
  }

  redirect('/acceso')
}
