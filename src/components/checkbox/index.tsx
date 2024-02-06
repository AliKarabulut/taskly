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
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
      />
      <label htmlFor={name} className={`ml-3 block text-sm leading-6 text-gray-900 ${srOnly ? 'sr-only' : ''}`}>
        {label}
      </label>
    </div>
  )
})
Checkbox.displayName = 'Checkbox'
export default Checkbox
