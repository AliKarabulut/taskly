'use server'
import { z } from 'zod'

import { TodoSchema } from '@/schemas'
import { getUserById } from '@/libs/user'
import { client } from '@/libs/prismadb'

export const newTodo = async (values: z.infer<typeof TodoSchema>, userId: string) => {
  const validateValues = TodoSchema.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid Value' }
  }

  const existingUser = await getUserById(userId)

  if (!existingUser) {
    return {
      error: "User doesn't exist",
    }
  }

  try {
    await client.todo.create({
      data: {
        name: values.name,
        description: values.description,
        priority: values.priority,
        userId: existingUser.id,
      },
    })
  } catch (error) {
    return { error: 'An error occurred while creating the todo. Please try again.' }
  }
  return { success: 'Todo created successfully' }
}
