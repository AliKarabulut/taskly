'use server'
import { client } from '@/libs/prismadb'
import { getTodoById } from '@/libs/todo'
import getUserInformation from '@/actions/get-user-information'

export const deleteTodos = async (todoIds: string[]) => {
  const user = await getUserInformation()

  const existingTodos = await Promise.all(todoIds.map(todoId => getTodoById(todoId)))

  const nonExistingTodo = existingTodos.find(todo => !todo)
  if (nonExistingTodo) {
    throw new Error("One or more todos don't exist")
  }

  const unauthorizedTodo = existingTodos.find(todo => todo?.userId !== user?.id)
  if (unauthorizedTodo) {
    throw new Error("One or more todos don't belong to the current user")
  }

  try {
    await client.todo.deleteMany({
      where: {
        id: {
          in: todoIds,
        },
      },
    })

    return { success: 'Todos deleted successfully' }
  } catch {
    throw new Error('An error occurred while deleting the todos. Please try again.')
  }
}
