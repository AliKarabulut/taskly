'use server'

import { client } from '@/libs/prismadb'
import { getUserByEmail } from '@/libs/user'
import { getVerificationTokenByToken } from '@/libs/verification-token'

export const newVerification = async (token: string) => {
  if (!token) {
    return {
      error: 'Token is required',
    }
  }

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

  const existingUser = await getUserByEmail(existingToken.oldEmail ?? existingToken.email)

  if (!existingUser) {
    return {
      error: "User doesn't exist",
    }
  }

  if (existingUser.emailVerified && !existingToken.oldEmail) {
    return {
      error: 'User already verified',
    }
  }

  try {
    await client.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    })
  } catch (error) {
    return {
      error: 'An error occurred while attempting to verify your email. Please try again.',
    }
  }

  try {
    await client.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  } catch (error) {
    console.log('An error occurred while attempting to delete the verification token.')
  }
  return {
    success: 'Email verified',
  }
}
