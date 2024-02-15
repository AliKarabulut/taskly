import { notFound } from 'next/navigation'

import UpdateTodoForm from '@/components/forms/update-todo-form'
import { getTodoById } from '@/libs/todo'

type UpdateTodoProps = {
  searchParams: {
    id: string
  }
}

const UpdateTodo = async ({ searchParams: { id } }: UpdateTodoProps) => {
  const existingTodo = await getTodoById(id)
  if (!existingTodo) {
    notFound()
  }

  return <UpdateTodoForm existingTodo={existingTodo} />
}

export default UpdateTodo
