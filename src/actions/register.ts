'use server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

import { client } from '@/libs/prismadb'
import { RegisterSchema } from '@/schemas'
import { getUserByEmail } from '@/libs/user'
import { generateVerificationToken } from '@/libs/token'
import sendVerificationEmail from '@/libs/mail'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateValues = RegisterSchema.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid credentials!' }
  }

  const { email, password, name } = validateValues.data
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email)

  if (existingUser) {
    return { error: 'User already is exist!' }
  }

  await client.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  const verificationToken = await generateVerificationToken(email)

  await sendVerificationEmail(verificationToken?.email as string, verificationToken?.token as string)

  if (!verificationToken) {
    return { error: 'An error occurred while attempting to send the verification email. Please try again.' }
  }

  return { success: 'Confirmation email send!' }
}
