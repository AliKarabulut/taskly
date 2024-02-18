'use server'
import { z } from 'zod'
import { AuthError } from 'next-auth'

import { client } from '@/libs/prismadb'
import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { generateTwoFactorToken, generateVerificationToken } from '@/libs/token'
import { getUserByEmail } from '@/libs/user'
import { getTwoFactorTokenByEmail } from '@/libs/two-factor-token'
import { getTwoFactorConfirmationByUserId } from '@/libs/two-factor-confirmation'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateValues = LoginSchema.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid credentials' }
  }

  const { email, password, code } = validateValues.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'Email does not exist' }
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email as string)

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

  if (existingUser.isTwoFactorEnabled && existingUser.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email)

      if (!twoFactorToken || twoFactorToken.token !== code) {
        return { error: 'Invalid code' }
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date()

      if (hasExpired) {
        return { error: 'Code has expired' }
      }

      await client.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      })

      const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

      if (existingConfirmation) {
        await client.twoFactorConfirmation.delete({
          where: {
            id: existingConfirmation.id,
          },
        })
      }

      await client.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      })
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email)

      const response = await fetch(`${process.env.SITE_URL}/api/send-two-factor-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: existingUser.email, token: twoFactorToken?.token }),
      })
      const data = await response.json()
      if (response.ok) {
        return { twoFactor: data.message }
      } else {
        return { error: data.error }
      }
    }
  }

  try {
    await signIn('credentials', { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Invalid credentials' }
        default:
          return { error: 'Something went wrong' }
      }
    }

    throw error
  }
}
