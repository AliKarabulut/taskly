import NextAuth from 'next-auth'

import authConfig from '@/auth.config'
import { DEFAULT_LOGIN_REDIRECT, apiAuthRoute, authRoutes, publicRoutes } from '@/routes'

const { auth } = NextAuth(authConfig)

export default auth(req => {
  const { nextUrl } = req
  const isLoggedIn = req.auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthRoute)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) return null

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl))
  }
})

export const config = {
  matcher: ['/((?!api|_next|_next/static|_next/image|images|_vercel.*\\..*).*)'],
}
