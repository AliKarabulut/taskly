'use client'
import { Fragment, forwardRef, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'

type SelectProps = {
  id?: string
  name: string
  error?: string
  label: string
  value: string
}

type PriorityProps = {
  name: string
}

const priority = [{ name: 'low' }, { name: 'medium' }, { name: 'high' }]

const Select = forwardRef<HTMLInputElement, SelectProps>(({ error, label, name, id, value, ...props }, ref) => {
  const [selected, setSelected] = useState<PriorityProps | undefined>(value ? { name: value } : undefined)

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <div>
          <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900">
            {label}
          </label>
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white px-4 py-1.5 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm sm:leading-6">
            <input
              id={id ?? name}
              value={selected?.name ?? ''}
              ref={ref}
              name={name}
              type="text"
              required
              className="select-none truncate border-0 p-0 outline-0 first-letter:capitalize focus:border-0 focus:outline-0 focus:ring-0"
              {...props}
            />
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </Listbox.Button>
          {error && (
            <div className="mt-2 text-sm text-red-600" id={`${name}-error`}>
              {error}
            </div>
          )}
        </div>
        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {priority.map((item, itemIdx) => (
              <Listbox.Option
                key={itemIdx}
                className={({ active }) =>
                  `relative cursor-default select-none px-4 py-2 ${active ? 'bg-blue-500 text-white' : 'text-gray-900'}`
                }
                value={item}>
                {({ selected }) => (
                  <>
                    <span className={`block truncate first-letter:capitalize ${selected ? 'font-medium' : 'font-normal'}`}>
                      {item.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  )
})
Select.displayName = 'Select'
export default Select
