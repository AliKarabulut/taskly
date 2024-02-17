'use client'
import { forwardRef } from 'react'

type CheckboxProps = {
  name: string
  label: string
  srOnly?: boolean
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ name, label, srOnly, ...props }, ref) => {
  return (
    <div className="flex items-center">
      <input
        id={name}
        name={name}
        type="checkbox"
        ref={ref}
        {...props}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600  focus:ring-indigo-600 dark:border-darkModeNeutral-50 dark:bg-darkModeNeutral-100 dark:text-darkModeNeutral-50 dark:ring-0 dark:focus:ring-neutral-300"
      />
      <label
        htmlFor={name}
        className={`ml-3 block text-sm leading-6 text-gray-900 dark:text-darkModeNeutral-50 ${srOnly ? 'sr-only' : ''}`}>
        {label}
      </label>
    </div>
  )
})
Checkbox.displayName = 'Checkbox'
export default Checkbox
