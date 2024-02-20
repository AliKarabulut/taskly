'use server'
import { client } from '@/libs/prismadb'
import { getTodoById } from '@/libs/todo'
import getUserInformation from '@/actions/get-user-information'

export const deleteTodo = async (todoId: string) => {
  const user = await getUserInformation()

  const existingTodo = await getTodoById(todoId)

  if (!existingTodo) {
    return {
      error: "Todo doesn't exist",
    }
  }

  if (existingTodo?.userId !== user?.id) {
    return {
      error: "Todo doesn't exist",
    }
  }

  try {
    await client.todo.delete({
      where: {
        id: existingTodo.id,
      },
    })

    return { success: 'Todo deleted successfully' }
  } catch {
    return { error: 'An error occurred while deleting the todo. Please try again.' }
  }
}
