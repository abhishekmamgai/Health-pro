import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 🚀 Temporary: allow all routes without auth check
  return NextResponse.next()
}

export const config = {
  matcher: [], // Disable all route protection for now
}