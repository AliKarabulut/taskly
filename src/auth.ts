import NextAuth from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'

import { client } from '@/libs/prismadb'
import authConfig from '@/auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(client),
  session: { strategy: 'jwt' },
  ...authConfig,
})
