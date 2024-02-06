import getUserInformation from '@/actions/get-user-information'
import TableBody from '@/components/table-body'
import TableHead from '@/components/table-head'
import { getTodoByUserId } from '@/libs/todo'

const Todo = async () => {
  const user = await getUserInformation()
  const todo = await getTodoByUserId(user!.id, 2)
  return (
    <section id="todo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Todos</h1>
            <p className="mt-2 text-sm text-gray-700">A list of all the todo</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Add todo
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <TableHead />
                <tbody className="divide-y divide-gray-200">
                  {todo && todo.map((todo, index) => <TableBody key={index} todo={todo} />)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Todo
