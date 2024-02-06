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
    <tr key={todo.title} className="grid grid-cols-12">
      <td className="col-span-1">
        <Checkbox name={todo.title} label={todo.title} srOnly />
      </td>
      <td className="col-span-3 whitespace-nowrap text-pretty py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{todo.title}</td>
      <td className="col-span-5 whitespace-nowrap text-pretty px-3 py-4 text-sm text-gray-500">{todo.description}</td>
      <td className="col-span-1 whitespace-nowrap px-3 py-4 text-sm text-gray-500 first-letter:capitalize">{todo.priority}</td>
      <td className="relative col-span-1 whitespace-nowrap py-4 pl-3 pr-4 text-sm font-medium sm:pr-0">
        <a href="#" className="text-indigo-600 hover:text-indigo-900">
          Edit<span className="sr-only">, {todo.title}</span>
        </a>
      </td>
      <td className="col-span-1">
        <TrashIcon width={20} className="cursor-pointer transition-all hover:text-red-500" />
      </td>
    </tr>
  )
}

export default TableBody
