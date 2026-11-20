import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next()
  }

  const sessionCookie = request.cookies.get('rona_session')
  let user: { id: string; role: 'GURU' | 'ADMIN'; name: string } | null = null
  if (sessionCookie?.value) {
    try {
      user = JSON.parse(decodeURIComponent(sessionCookie.value))
    } catch {
      user = null
    }
  }

  const isLoginPage =
    pathname === '/login' ||
    pathname === '/loginGuru' ||
    pathname === '/loginAdmin'
  const isAdminRoute = pathname.startsWith('/admin')

  if (!user) {
    if (pathname === '/login') {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (user.role === 'GURU') {
    if (isLoginPage) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    if (isAdminRoute) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  if (user.role === 'ADMIN') {
    if (isLoginPage || pathname === '/') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return NextResponse.next()
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
