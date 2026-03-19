import { NextResponse } from 'next/server'
import { deleteAdminCookie } from '@/lib/auth-admin'

export async function POST() {
  await deleteAdminCookie()
  return NextResponse.json({ ok: true })
}
