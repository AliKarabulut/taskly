import Link from 'next/link'
import { TrashIcon } from '@heroicons/react/24/outline'

import Checkbox from '@/components/checkbox'

type TableBodyProps = {
  todo: {
    title: string
    description: string
    priority: string
    id?: string
    userId?: string
  }
}

const TableBody = ({ todo }: TableBodyProps) => {
  // const deleteTodo = async (id: string) => {

  return (
    <tr className="grid grid-cols-12">
      <td className="col-span-1">
        <Checkbox name={todo.title} label={todo.title} srOnly />
      </td>
      <td className="col-span-3 truncate text-pretty break-words py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{todo.title}</td>
      <td className="col-span-5 truncate text-pretty break-words px-3 py-4 text-sm text-gray-500">{todo.description}</td>
      <td className="col-span-1 px-3 py-4 text-sm text-gray-500 first-letter:capitalize">{todo.priority}</td>
      <td className="relative col-span-1 py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
        <Link href={`/update-todo?id=${todo.id}`} className="text-indigo-600 hover:text-indigo-900">
          Edit<span className="sr-only">, {todo.title}</span>
        </Link>
      </td>
      <td className="col-span-1">
        <TrashIcon width={20} className="cursor-pointer transition-all hover:text-red-500" />
      </td>
    </tr>
  )
}

export default TableBody
