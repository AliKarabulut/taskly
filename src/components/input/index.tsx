type InputProps = {
  label: string
  name: string
  type?: 'text' | 'email' | 'password'
  autoComplete?: string
  required?: boolean
}

const Input: React.FC<InputProps> = ({ label, name, type = 'text', autoComplete, required = true }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          autoComplete={autoComplete ?? name}
          required={required}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  )
}

export default Input
