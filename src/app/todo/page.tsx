import TableBody from '@/components/todo-table/body'

const todo = [
  { name: 'Todo 1', description: 'Description 1', priority: 'High' },
  { name: 'Todo 2', description: 'Description 2', priority: 'Medium' },
  { name: 'Todo 3', description: 'Description 3', priority: 'Low' },
  { name: 'Todo 4', description: 'Description 4', priority: 'High' },
  { name: 'Todo 5', description: 'Description 5', priority: 'Medium' },
  { name: 'Todo 6', description: 'Description 6', priority: 'Low' },
]

export default function Example() {
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
                <thead>
                  <tr>
                    <th>
                      <span className="sr-only">isCompleted</span>
                    </th>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Description
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Priority
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {todo.map((todo, index) => (
                    <TableBody key={index} todo={todo} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
