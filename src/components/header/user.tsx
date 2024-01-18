'use client'
import { Menu, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment } from 'react'

import cn from '@/utils/cn'
import { user } from '@/constants/header'
import Notification from '@/components/header/notification'

const NavigationMenu = () => {
  return (
    <div className="hidden sm:ml-4 sm:flex sm:items-center">
      <Notification />

      <Menu as="div" className="relative ml-4 flex-shrink-0">
        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white">AK</div>
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95">
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {user.map(item => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <Link href={item.path} className={cn(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}>
                    {item.name}
                  </Link>
                )}
              </Menu.Item>
            ))}
            <Menu.Item>
              <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default NavigationMenu