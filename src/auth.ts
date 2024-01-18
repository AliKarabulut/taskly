import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { client } from '@/libs/prismadb'
import authConfig from '@/auth.config'
import { getUserById } from '@/libs/user'
import { NextResponse } from 'next/server'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user }) {
      const existingUser = await getUserById(user.id)
      if (!existingUser || !existingUser.emailVerified) {
        return false
      }

      return true
    },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.role && session.user) {
        session.user.role = token.role as 'ADMIN' | 'USER'
      }
      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token
      const user = await getUserById(token.sub)

      if (!user) return token

      token.role = user.role

      return token
    },
  },
  adapter: PrismaAdapter(client),
  session: { strategy: 'jwt' },
  ...authConfig,
})
