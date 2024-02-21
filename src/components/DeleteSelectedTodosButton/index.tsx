'use client'
import { useContext } from 'react'

import Button from '@/components/button'
import { TodoContext } from '@/store/todo-provider'

const DeleteSelectedTodosButton = () => {
  const { deleteTodos, pending, todosToDelete } = useContext(TodoContext)
  return todosToDelete.length > 0 && <Button label="Delete Todos" onClick={deleteTodos} disabled={pending} className="whitespace-nowrap" />
}

export default DeleteSelectedTodosButton
