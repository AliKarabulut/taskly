'use server'
import { z } from 'zod'
import { AuthError } from 'next-auth'

import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { generateVerificationToken } from '@/libs/token'
import { getUserByEmail } from '@/libs/user'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateValues = LoginSchema.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid credentials' }
  }

  const { email, password } = validateValues.data

  const user = await getUserByEmail(email)

  if (!user) {
    return { error: 'Email does not exist' }
  }

  if (!user.emailVerified) {
    const verificationToken = await generateVerificationToken(user.email as string)

    await fetch(`${process.env.SITE_URL}/api/send-mail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: verificationToken?.email, token: verificationToken?.token }),
    })

    return { error: 'Confirmation email send!! Please confirm your email' }
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
