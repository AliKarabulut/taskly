'use server'

import { client } from '@/libs/prismadb'
import { getUserByEmail } from '@/libs/user'
import { getVerificationTokenByToken } from '@/libs/verification-token'

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return {
      error: "Token doesn't exist",
    }
  }

  const hasExpired = new Date(existingToken.expires) < new Date()

  if (hasExpired) {
    return {
      error: 'Token has expired',
    }
  }

  const existingUser = await getUserByEmail(existingToken.email)

  if (!existingUser) {
    return {
      error: "User doesn't exist",
    }
  }

  if (existingUser.emailVerified) {
    return {
      error: 'User already verified',
    }
  }

  await client.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  })

  await client.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  })

  return {
    success: 'Email verified',
  }
}
