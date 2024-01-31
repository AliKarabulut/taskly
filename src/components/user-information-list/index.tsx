type UserInformationListProps = {
  name: string
  value: string | null | boolean
}
const UserInformationList = ({ name, value }: UserInformationListProps) => {
  return (
    <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 first:border-t">
      <span className="font-medium first-letter:capitalize dark:text-white">{name}:</span>
      <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700  ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
        {value === null ? 'Not set' : value === true ? 'On' : value === false ? 'Off' : value}
      </span>
    </li>
  )
}

export default UserInformationList
