'use server'
import { z } from 'zod'
import { AuthError } from 'next-auth'

import { LoginSchema } from '@/schemas'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { generateVerificationToken } from '@/libs/token'
import { getUserByEmail } from '@/libs/user'
import sendVerificationEmail from '@/libs/mail'

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
    await sendVerificationEmail(verificationToken?.email as string, verificationToken?.token as string)
    return { error: 'Email verification mail sent! Please confirm your email' }
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
