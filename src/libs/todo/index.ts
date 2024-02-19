import { client } from '@/libs/prismadb'

export const getTodoById = async (id: string) => {
  try {
    const todo = await client.todo.findUnique({
      where: {
        id,
      },
    })

    return todo
  } catch {
    return null
  }
}

export const getTotalPages = async (userId: string) => {
  try {
    const totalTodos = await client.todo.count({
      where: {
        userId,
      },
    })
    const totalPages = Math.ceil(totalTodos / 10)

    return totalPages
  } catch {
    return null
  }
}

export const getTodoByUserId = async (userId: string, page: number) => {
  try {
    const todos = await client.todo.findMany({
      where: {
        userId,
      },
      skip: page * 10,
      take: 10,
    })

    return todos
  } catch {
    return null
  }
}
