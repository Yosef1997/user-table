import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from './lib/auth'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl

  const isAuth = token && (await verifyToken(token))
  const isLoginPage = pathname.startsWith('/login')

  if (!isAuth && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  if (isAuth && isLoginPage) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
