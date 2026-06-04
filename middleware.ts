import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const path = req.nextUrl.pathname
  const isLoginPage = path === '/'

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('http://localhost:3000'))
  }

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/', req.url))
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
