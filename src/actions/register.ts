'use server'
import { z } from 'zod'
import bcrypt from 'bcrypt'

import { client } from '@/libs/prismadb'
import { RegisterSchema } from '@/schemas'
import { getUserByEmail } from '@/libs/user'

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

  return { success: 'User created!' }
}
