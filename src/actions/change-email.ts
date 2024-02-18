'use server'
import { z } from 'zod'

import { EmailSchema } from '@/schemas'
import { getUserAccounts, getUserByEmail } from '@/libs/user'
import { generateEmailChangeToken } from '@/libs/token'

export const changeEmail = async (values: z.infer<typeof EmailSchema>) => {
  const validateValues = EmailSchema.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid Email!' }
  }

  const { email } = validateValues.data

  const existingUser = await getUserByEmail(email)

  if (!existingUser) {
    return {
      error: "User doesn't exist",
    }
  }

  const isAccountHasProvider = await getUserAccounts(existingUser.id)

  if (isAccountHasProvider) {
    return {
      error: 'User have a provider account',
    }
  }

  const emailChangeToken = await generateEmailChangeToken(email)

  if (!emailChangeToken) {
    return { error: 'An error occurred while attempting to send the reset email. Please try again.' }
  }

  const response = await fetch(`${process.env.SITE_URL}/api/send-email-change-mail`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: emailChangeToken?.email, token: emailChangeToken?.token }),
  })

  const data = await response.json()

  if (response.ok) {
    return { success: data.message }
  } else {
    return { error: data.error }
  }
}
