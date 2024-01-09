type CheckboxProps = {
  name: string
  label: string
}

const Checkbox: React.FC<CheckboxProps> = ({ name, label }) => {
  return (
    <div className="flex items-center">
      <input id={name} name={name} type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
      <label htmlFor={name} className="ml-3 block text-sm leading-6 text-gray-900">
        {label}
      </label>
    </div>
  )
}

export default Checkbox
