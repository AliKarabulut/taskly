'use client'
import { Menu, Transition } from '@headlessui/react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { Fragment } from 'react'

import cn from '@/utils/cn'
import { user } from '@/constants/header'
import Notification from '@/components/header/notification'
import Avatar from '@/components/avatar'

type NavigationMenuProps = {
  name: string
  src?: string
}

const NavigationMenu = ({ name, src }: NavigationMenuProps) => {
  const handleSignOut = () => {
    signOut()
  }
  return (
    <div className="hidden gap-x-4 sm:flex sm:items-center">
      <Notification />

      <Menu as="div" className="relative flex-shrink-0">
        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Avatar name={name} src={src} />
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
              <button onClick={() => handleSignOut()} className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
                Sign Out
              </button>
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default NavigationMenu
