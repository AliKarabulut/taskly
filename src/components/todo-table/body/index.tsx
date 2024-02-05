import { TrashIcon } from '@heroicons/react/24/outline'

type TableBodyProps = {
  todo: {
    name: string
    description: string
    priority: string
    id?: string
    userId?: string
  }
}

const TableBody = ({ todo }: TableBodyProps) => {
  // const deleteTodo = async (id: string) => {

  return (
    <tr key={todo.name}>
      <td>
        <div className="flex h-6 items-center">
          <input
            id="candidates"
            aria-describedby="candidates-description"
            name="candidates"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
          />
        </div>
      </td>
      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">{todo.name}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{todo.description}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{todo.priority}</td>
      <td className="relative  whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
        <div className="flex justify-end gap-3">
          <a href="#" className="text-indigo-600 hover:text-indigo-900">
            Edit<span className="sr-only">, {todo.name}</span>
          </a>
          <TrashIcon width={20} className="cursor-pointer transition-all hover:text-red-500" />
        </div>
      </td>
    </tr>
  )
}

export default TableBody
