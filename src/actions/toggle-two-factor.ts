'use server'
import { z } from 'zod'

import { BooleanSchema } from '@/schemas'
import getUserInformation from '@/actions/get-user-information'
import { client } from '@/libs/prismadb'

export const toggleTwoFactor = async (values: z.infer<typeof BooleanSchema>) => {
  const validateValues = BooleanSchema.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid Email!' }
  }

  const { value } = validateValues.data

  const existingUser = await getUserInformation()

  if (!existingUser) {
    return {
      error: "User doesn't exist",
    }
  }

  try {
    await client.user.update({
      where: {
        id: existingUser.id,
      },
      data: {
        isTwoFactorEnabled: value,
      },
    })

    return { success: value ? 'Two factor authentication enabled' : 'Two factor authentication disabled' }
  } catch (error) {
    return { error: 'An error occurred while attempting to enable two factor authentication. Please try again.' }
  }
}
