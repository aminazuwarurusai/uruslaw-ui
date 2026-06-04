import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email:    { label: 'Email',    type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        // Dynamic import keeps bcryptjs out of Edge runtime (proxy context)
        const { verifyUser } = await import('@/lib/users')
        const user = await verifyUser(
          credentials.email as string,
          credentials.password as string,
        )
        if (!user) return null
        return { id: user.id, name: user.name, email: user.email, role: user.role }
      },
    }),
  ],
  pages: { signIn: '/', signOut: '/signout' },
  session: { strategy: 'jwt' },
  callbacks: {
    authorized({ auth: session, request }) {
      const isLoggedIn = !!session?.user
      const path = request.nextUrl.pathname
      const isLoginPage  = path === '/'
      const isSignout    = path === '/signout'
      const isPublic     = isLoginPage || isSignout

      // Logged in + hitting login page → redirect to main app
      if (isLoggedIn && isLoginPage) {
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
        return Response.redirect(new URL(appUrl))
      }

      // Not logged in + protected page → redirect to login
      if (!isLoggedIn && !isPublic) return false

      return true
    },
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role
      return token
    },
    async session({ session, token }) {
      if (session.user) (session.user as { role?: unknown }).role = token.role
      return session
    },
  },
})
