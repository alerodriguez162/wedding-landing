import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isSitePasswordEnabled, verifySiteAccessToken } from '@/lib/auth-site-edge'

const COOKIE_NAME = 'site_access'

export async function middleware(request: NextRequest) {
  if (!isSitePasswordEnabled()) {
    return NextResponse.next()
  }

  const path = request.nextUrl.pathname
  if (path === '/acceso' || path.startsWith('/api/site-auth') || path.startsWith('/_next') || path.includes('.')) {
    return NextResponse.next()
  }

  const token = request.cookies.get(COOKIE_NAME)?.value
  if (token && (await verifySiteAccessToken(token))) {
    return NextResponse.next()
  }

  if (path.startsWith('/api/')) {
    return NextResponse.json({ message: 'Acceso restringido' }, { status: 401 })
  }

  const url = request.nextUrl.clone()
  url.pathname = '/acceso'
  url.searchParams.set('from', path)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
