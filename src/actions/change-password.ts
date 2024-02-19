'use server'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

import { ChangePasswordScheme } from '@/schemas'
import { getUserById } from '@/libs/user'
import { client } from '@/libs/prismadb'
import getUserInformation from '@/actions/get-user-information'

export const changePassword = async (values: z.infer<typeof ChangePasswordScheme>) => {
  const validateValues = ChangePasswordScheme.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid Password!' }
  }

  const { password } = validateValues.data

  const user = await getUserInformation()

  if (!user) {
    return {
      error: "User doesn't exist",
    }
  }

  if (user.isOAuth) {
    return {
      error: 'Oauth users cannot change their password',
    }
  }

  const existingUser = await getUserById(user.id)

  if (!existingUser) {
    return {
      error: "User doesn't exist",
    }
  }

  if (!existingUser.password) {
    return {
      error: "User's password doesn't exist",
    }
  }

  const isPasswordValid = await bcrypt.compare(values.oldPassword, existingUser.password)

  if (!isPasswordValid) {
    return {
      error: 'Old password is incorrect',
    }
  }

  if (values.oldPassword === password) {
    return {
      error: 'New password cannot be the same as the old password',
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
    return { error: 'An error occurred while attempting to change the password. Please try again.' }
  }

  return { success: 'Password changed successfully' }
}
