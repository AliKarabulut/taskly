'use client'
import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { UseFormSetValue } from 'react-hook-form'

type FormValues = {
  title: string
  description: string
  priority: 'low' | 'medium' | 'high'
}

type SelectProps = {
  id?: string
  name: string
  error?: string
  label: string
  value?: 'low' | 'medium' | 'high'
  setValue: UseFormSetValue<FormValues>
}

export type PriorityProps = {
  name: 'low' | 'medium' | 'hight'
}

const priority = [{ name: 'low' }, { name: 'medium' }, { name: 'high' }]

const Select = ({ error, label, name, setValue, value }: SelectProps) => {
  const [selected, setSelected] = useState<PriorityProps | undefined>(
    value ? (priority.find(e => e.name === value) as PriorityProps) : (priority[0] as PriorityProps),
  )

  const handleOnChange = (value: PriorityProps) => {
    setSelected(value)
    setValue(name as 'title' | 'description' | 'priority', value.name)
  }

  return (
    <Listbox value={selected} onChange={handleOnChange}>
      <div className="relative mt-1">
        <div>
          <label htmlFor={name} className="block text-sm font-medium leading-6 text-gray-900 dark:text-darkModeNeutral-100">
            {label}
          </label>
          <Listbox.Button className="relative block w-full cursor-default rounded-md border-0 bg-white px-4 py-1.5 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 dark:bg-darkModeNeutral-200 dark:text-darkModeNeutral-50 sm:text-sm sm:leading-6">
            <span className="block truncate first-letter:capitalize">{selected?.name}</span>
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
          <Listbox.Options className="dark:tbgext-darkModeNeutral-100 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none dark:bg-darkModeNeutral-100 sm:text-sm">
            {priority.map((item, itemIdx) => (
              <Listbox.Option
                key={itemIdx}
                className={({ active }) =>
                  `relative cursor-default select-none px-4 py-2 ${
                    active ? 'bg-blue-500 text-white dark:bg-darkModeNeutral-200 dark:text-darkModeNeutral-50' : 'text-gray-900'
                  }`
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
}
export default Select
