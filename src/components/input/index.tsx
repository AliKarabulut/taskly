'use client'
import { forwardRef } from 'react'

type InputProps = {
  label: string
  name: string
  id?: string
  type?: 'text' | 'email' | 'password' | 'number'
  error?: string
  autoComplete?: string
  required?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, id, type = 'text', autoComplete, required = true, error, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900 dark:text-darkModeNeutral-100">
          {label}
        </label>
        <div className="mt-2">
          <input
            id={id ?? name}
            ref={ref}
            name={name}
            type={type}
            autoComplete={autoComplete ?? name}
            required={required}
            {...props}
            className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:bg-darkModeNeutral-200 dark:text-darkModeNeutral-50 dark:focus:ring-darkModeNeutral-50 sm:text-sm sm:leading-6"
          />
        </div>
        {error && (
          <div className="mt-2 text-sm text-red-600" id={`${name}-error`}>
            {error}
          </div>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'
export default Input
