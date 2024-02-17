import getUserInformation from '@/actions/get-user-information'
import Button from '@/components/button'
import TableBody from '@/components/table-body'
import TableHead from '@/components/table-head'
import { getTodoByUserId } from '@/libs/todo'

export const dynamic = 'force-dynamic'

const Todo = async () => {
  const user = await getUserInformation()
  const todo = await getTodoByUserId(user!.id, 0)
  return (
    <section id="todo">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-darkModeNeutral-100">Todos</h1>
            <p className="mt-2 text-sm text-gray-700 dark:text-darkModeNeutral-50">A list of all the todo</p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Button href="/new-todo" label="Add Todo"></Button>
          </div>
        </div>
        <table className="min-w-full divide-y divide-gray-400 overflow-x-auto py-2 align-middle dark:divide-darkModeNeutral-300">
          <TableHead />
          <tbody className="divide-y divide-gray-200 dark:divide-darkModeNeutral-300">
            {todo && todo.map(todo => <TableBody key={todo.id} todo={todo} />)}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Todo
