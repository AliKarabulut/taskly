'use server'
import { z } from 'zod'

import { TodoSchema } from '@/schemas'
import { client } from '@/libs/prismadb'
import { getTodoById } from '@/libs/todo'

export const updateTodo = async (values: z.infer<typeof TodoSchema>, todoId: string) => {
  const validateValues = TodoSchema.safeParse(values)

  if (!validateValues.success) {
    return { error: 'Invalid Value' }
  }

  const existingTodo = await getTodoById(todoId)

  if (!existingTodo) {
    return {
      error: "Todo doesn't exist",
    }
  }

  try {
    await client.todo.update({
      where: {
        id: todoId,
      },
      data: {
        title: values.title,
        description: values.description,
        priority: values.priority,
      },
    })
  } catch (error) {
    return { error: 'An error occurred while updating the todo. Please try again.' }
  }

  return { success: 'Todo updated successfully' }
}
