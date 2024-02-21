'use client'
import { useRouter } from 'next/navigation'
import { createContext, useState } from 'react'
import toast from 'react-hot-toast'

import { deleteTodos as dltTodo } from '@/actions/delete-todo'

type TodoContextType = {
  todosToDelete: string[]
  toggleTodoToDelete: (id: string, shouldDelete: boolean) => void
  deleteTodos: () => void
  pending: boolean
}

type TodoProviderProps = {
  children: React.ReactNode
}

export const TodoContext = createContext<TodoContextType>({
  todosToDelete: [],
  toggleTodoToDelete: () => {},
  deleteTodos: () => {},
  pending: false,
})

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todosToDelete, setTodosToDelete] = useState<string[]>([])
  const [pending, setPending] = useState<boolean>(false)
  const router = useRouter()

  const toggleTodoToDelete = (id: string, shouldDelete: boolean) => {
    console.log('id', id, 'shouldDelete', shouldDelete)
    if (shouldDelete) {
      setTodosToDelete([...todosToDelete, id])
    } else {
      setTodosToDelete(todosToDelete.filter(todoId => todoId !== id))
    }
  }

  const deleteTodos = async () => {
    setPending(true)
    toast.promise(dltTodo(todosToDelete), {
      loading: 'Deleting todo...',
      success: (data: { success: string }) => {
        setPending(false)
        router.refresh()
        setTodosToDelete([])
        return data.success
      },
      error: (err: Error) => {
        setPending(false)
        return err.message
      },
    })
  }

  return <TodoContext.Provider value={{ todosToDelete, toggleTodoToDelete, deleteTodos, pending }}>{children}</TodoContext.Provider>
}
