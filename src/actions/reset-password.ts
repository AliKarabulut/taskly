'use server'
import { z } from 'zod'

import { ResetPasswordSchema } from '@/schemas'
import { getUserByEmail } from '@/libs/user'
import { generatePasswordResetToken } from '@/libs/token'

export const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
  const validateValues = ResetPasswordSchema.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid Email!' }
  }

  const { email } = validateValues.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return { error: 'User not found!' }
  }

  const passwordResetToken = await generatePasswordResetToken(email)

  if (!passwordResetToken) {
    return { error: 'An error occurred while attempting to send the reset email. Please try again.' }
  }

  const response = await fetch(`${process.env.SITE_URL}/api/send-reset-password-mail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: passwordResetToken?.email, token: passwordResetToken?.token }),
  })

  const data = await response.json()

  if (response.ok) {
    return { success: data.message }
  } else {
    return { error: data.error }
  }
}
