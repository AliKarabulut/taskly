'use client'
import Link from 'next/link'
import { TrashIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'

import { TodoContext } from '@/store/todo-provider'
import { deleteTodos } from '@/actions/delete-todo'
import Checkbox from '@/components/checkbox'
import cn from '@/utils/cn'

type TableBodyProps = {
  todo: {
    title: string
    description: string
    priority: string
    id: string
    userId: string
  }
}

const TableBody = ({ todo }: TableBodyProps) => {
  const [pending, setPending] = useState<boolean>(false)
  const router = useRouter()
  const { toggleTodoToDelete, todosToDelete } = useContext(TodoContext)

  const deleteHandler = async (id: string) => {
    setPending(true)
    toast.promise(deleteTodos([id]), {
      loading: 'Deleting todo...',
      success: (data: { success: string }) => {
        setPending(false)
        router.refresh()
        return data.success
      },
      error: (err: Error) => {
        setPending(false)
        return err.message
      },
    })
  }

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleTodoToDelete(todo.id, e.target.checked)
  }
  return (
    <tr className="relative grid grid-cols-12">
      <td className="col-span-1">
        <Checkbox
          name={todo.title}
          label={todo.title}
          srOnly
          onChange={checkboxHandler}
          checked={todosToDelete.includes(todo.id)}
          withLine
        />
      </td>
      <td className="col-span-3 truncate text-pretty break-words py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-darkModeNeutral-100 sm:pl-0">
        {todo.title}
      </td>
      <td className="col-span-5 truncate text-pretty break-words px-3 py-4 text-sm text-gray-500 dark:text-darkModeNeutral-50">
        {todo.description}
      </td>
      <td className="col-span-1 px-3 py-4 text-sm text-gray-500 first-letter:capitalize dark:text-darkModeNeutral-50">{todo.priority}</td>
      <td className="relative col-span-1 py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
        <Link
          href={`/update-todo?id=${todo.id}`}
          className="text-indigo-600 hover:text-indigo-900 dark:text-darkModeNeutral-100 dark:hover:text-darkModeNeutral-200">
          Edit<span className="sr-only">, {todo.title}</span>
        </Link>
      </td>
      <td className="col-span-1">
        <button type="button" onClick={() => deleteHandler(todo.id)} disabled={pending}>
          <TrashIcon
            width={20}
            className={cn(
              'cursor-pointer transition-all hover:text-red-500 dark:text-darkModeNeutral-100 dark:hover:text-darkModeNeutral-50',
              {
                'text-gray-400 hover:text-gray-400': pending,
              },
            )}
          />
        </button>
      </td>
    </tr>
  )
}

export default TableBody
