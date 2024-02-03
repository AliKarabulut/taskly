'use server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

import { NewPasswordScheme } from '@/schemas'
import { getUserById } from '@/libs/user'
import { client } from '@/libs/prismadb'

export const changePassword = async (values: z.infer<typeof NewPasswordScheme>, oldPassword: string | null, id: string | null) => {
  if (!oldPassword) {
    return { error: 'Old password is required' }
  }

  if (!id) {
    return { error: 'User id is required' }
  }

  const validateValues = NewPasswordScheme.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid Password!' }
  }

  const { password } = validateValues.data

  const existingUser = await getUserById(id)

  if (!existingUser) {
    return {
      error: "User doesn't exist",
    }
  }

  if (!existingUser.password) {
    return {
      error: 'User has no password',
    }
  }
  const isPasswordValid = await bcrypt.compare(oldPassword, existingUser.password)

  if (!isPasswordValid) {
    return {
      error: 'Old password is incorrect',
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    await client.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        password: hashedPassword,
      },
    })
  } catch (error) {
    return new Error('An error occurred while changing the password. Please try again.')
  }

  return { success: 'Password changed successfully' }
}
