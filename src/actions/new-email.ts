'use server'
import { z } from 'zod'

import { EmailVerifyScheme } from '@/schemas'
import { client } from '@/libs/prismadb'
import { getEmailChangeTokenByToken } from '@/libs/email-change-token'

export const newEmail = async (value: z.infer<typeof EmailVerifyScheme>, token: string | null) => {
  if (!token) {
    return {
      error: 'Token is required',
    }
  }

  const validateValues = EmailVerifyScheme.safeParse(value)

  if (!validateValues.success) {
    return { error: 'Invalid Email!' }
  }

  const { email } = validateValues.data

  const existingToken = await getEmailChangeTokenByToken(token)

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

  if (existingToken.email === email) {
    return {
      error: 'The email is the same as the current email',
    }
  }

  try {
    await client.user.update({
      where: {
        email: existingToken.email,
      },
      data: {
        email,
      },
    })
  } catch (error) {
    throw new Error('An error occurred while changing the email. Please try again.')
  }

  try {
    await client.emailChangeToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  } catch (error) {
    console.log('An error occurred while attempting to delete the email replacement token')
  }
  return { success: 'Email replacement successfully' }
}
