import { forwardRef } from 'react'

import cn from '@/utils/cn'

type CheckboxProps = {
  name: string
  label: string
  srOnly?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked?: boolean
  withLine?: boolean
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({ name, label, srOnly, onChange, checked, withLine, ...props }, ref) => {
  return (
    <>
      <div
        className={cn('flex items-center', {
          'relative z-10': withLine,
        })}>
        <input
          id={name}
          name={name}
          type="checkbox"
          ref={ref}
          checked={checked}
          onChange={onChange}
          {...props}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600  focus:ring-indigo-600 dark:border-darkModeNeutral-50 dark:bg-darkModeNeutral-100 dark:text-darkModeNeutral-50 dark:ring-0 dark:focus:ring-neutral-300"
        />
        <label
          htmlFor={name}
          className={`ml-3 block text-sm leading-6 text-gray-900 dark:text-darkModeNeutral-50 ${srOnly ? 'sr-only' : ''}`}>
          {label}
        </label>
      </div>
      {withLine && checked && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gray-200 dark:bg-darkModeNeutral-100" />
      )}
    </>
  )
})
Checkbox.displayName = 'Checkbox'
export default Checkbox
