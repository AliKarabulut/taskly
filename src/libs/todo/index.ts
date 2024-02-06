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

export const getTodoByUserId = async (userId: string, page: number) => {
  try {
    const todo = await client.todo.findMany({
      where: {
        userId,
      },
      skip: page * 10,
      take: 10,
    })

    return todo
  } catch {
    return null
  }
}
