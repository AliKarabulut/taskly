'use server'
import { z } from 'zod'

import { RegisterSchema } from '@/schemas'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateValues = RegisterSchema.safeParse(values)

  if (!validateValues.success) {
    return { error: true }
  }

  return { success: true }
}
