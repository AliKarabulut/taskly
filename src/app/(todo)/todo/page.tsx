import getUserInformation from '@/actions/get-user-information'
import DeleteSelectedTodosButton from '@/components/DeleteSelectedTodosButton'
import Button from '@/components/button'
import Pagination from '@/components/pagination'
import TableBody from '@/components/table-body'
import TableHead from '@/components/table-head'
import { getTodoByUserId, getTotalPages } from '@/libs/todo'
import { TodoProvider } from '@/store/todo-provider'

export const dynamic = 'force-dynamic'
type UpdateTodoProps = {
  searchParams: {
    page: number
  }
}
const Todo = async ({ searchParams: { page = 1 } }: UpdateTodoProps) => {
  page = !isNaN(Number(page)) ? Number(page) : 1
  const user = await getUserInformation()
  const totalPages = await getTotalPages(user!.id)
  const todo = await getTodoByUserId(user!.id, page - 1)

  return (
    <TodoProvider>
      <section id="todo">
        <div className="container mx-auto space-y-10 px-4 sm:px-6 lg:px-8">
          <div className="w-full justify-between sm:flex sm:items-center">
            <div>
              <h1 className="text-base font-semibold leading-6 text-gray-900 dark:text-darkModeNeutral-100">Todos</h1>
              <p className="mt-2 text-sm text-gray-700 dark:text-darkModeNeutral-50">A list of all the todo</p>
            </div>
            <div className="mt-4 flex gap-4 sm:ml-16 sm:mt-0">
              <DeleteSelectedTodosButton />
              <Button href="/new-todo" label="New Todo" />
            </div>
          </div>
          <table className="min-w-full divide-y divide-gray-400 overflow-x-auto py-2 align-middle dark:divide-darkModeNeutral-300">
            <TableHead />
            <tbody className="divide-y divide-gray-200 dark:divide-darkModeNeutral-300">
              {todo?.map(todo => <TableBody key={todo.id} todo={todo} />)}
            </tbody>
          </table>
          {totalPages && <Pagination totalPages={totalPages} activePage={page} className="ml-auto w-fit" />}
        </div>
      </section>
    </TodoProvider>
  )
}

export default Todo
