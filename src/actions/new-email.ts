'use server'
import { z } from 'zod'

import { EmailVerifyScheme } from '@/schemas'
import { client } from '@/libs/prismadb'
import { getEmailChangeTokenByToken } from '@/libs/email-change-token'
import { getUserByEmail } from '@/libs/user'
import { generateVerificationToken } from '@/libs/token'

export const newEmail = async (value: z.infer<typeof EmailVerifyScheme>, token: string | null) => {
  if (!token) {
    return {
      error: 'Token is required',
    }
  }

  const validateValues = EmailVerifyScheme.safeParse(value)

  if (!validateValues.success) {
    return { error: 'Invalid credentials!' }
  }

  const { email } = validateValues.data
  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return {
      error: 'Email already exists',
    }
  }

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

  const verificationToken = await generateVerificationToken(email, existingToken.email)

  if (!verificationToken) {
    return { error: 'An error occurred while attempting to send the verification email. Please try again.' }
  }

  try {
    await client.emailChangeToken.delete({
      where: {
        id: existingToken.id,
      },
    })
  } catch (error) {
    throw new Error('An error occurred while attempting to delete the email replacement token')
  }

  const response = await fetch(`${process.env.SITE_URL}/api/send-confirmation-mail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: verificationToken?.email, token: verificationToken?.token }),
  })

  const data = await response.json()

  if (response.ok) {
    return { success: data.message }
  } else {
    return { error: data.error }
  }
}
