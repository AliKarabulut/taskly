const TableHead = () => {
  return (
    <thead>
      <tr className="grid grid-cols-12 text-gray-900 dark:text-darkModeNeutral-100">
        <th scope="col" className="col-span-1">
          <span className="sr-only">isCompleted</span>
        </th>
        <th scope="col" className="col-span-3 py-3.5 pl-4 pr-3 text-left text-sm font-semibold  sm:pl-0">
          Title
        </th>
        <th scope="col" className="col-span-5 px-3 py-3.5 text-left text-sm font-semibold ">
          Description
        </th>
        <th scope="col" className="col-span-1 px-3 py-3.5 text-left text-sm font-semibold ">
          Priority
        </th>
        <th scope="col" className="relative col-span-1 py-3.5 pl-3 pr-4 sm:pr-0">
          <span className="sr-only">Edit</span>
        </th>
        <th scope="col" className="relative col-span-1 py-3.5 pl-3 pr-4 sm:pr-0">
          <span className="sr-only">Delete</span>
        </th>
      </tr>
    </thead>
  )
}

export default TableHead
