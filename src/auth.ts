import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { client } from '@/libs/prismadb'
import authConfig from '@/auth.config'
import { getUserById } from '@/libs/user'
import { getTwoFactorConfirmationByUserId } from '@/libs/two-factor-confirmation'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/login',
  },
  events: {
    async linkAccount({ user }) {
      await client.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== 'credentials') return true

      const existingUser = await getUserById(user.id)

      if (!existingUser?.emailVerified) return false

      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        if (!twoFactorConfirmation) return false

        await client.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        })
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

      if (token.isTwoFactorEnabled && session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean
      }

      return session
    },

    async jwt({ token }) {
      if (!token.sub) return token
      const user = await getUserById(token.sub)

      if (!user) return token

      token.role = user.role
      token.isTwoFactorEnabled = user.isTwoFactorEnabled
      return token
    },
  },
  adapter: PrismaAdapter(client),
  session: { strategy: 'jwt' },
  ...authConfig,
})
