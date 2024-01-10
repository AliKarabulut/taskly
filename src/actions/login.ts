'use server'
import { z } from 'zod'

import { LoginSchema } from '@/schemas'

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateValues = LoginSchema.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid credentials' }
  }

  return { success: 'User logged in!' }
}
