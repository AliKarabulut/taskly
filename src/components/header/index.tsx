'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import User from '@/components/header/user'
import MobileMenu from '@/components/header/mobile-menu'
import { navigation } from '@/constants/header'
import cn from '@/utils/cn'

const Header = () => {
  const pathname = usePathname()

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-2 sm:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex px-2 sm:px-0">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <Image className="h-8 w-auto" src="/favicon.png" width={29} height={32} alt="Your Company" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map(item => (
                <Link
                  href={item.path}
                  key={item.name}
                  className={cn('inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium', {
                    'border-indigo-500 text-gray-900': pathname === item.path,
                    'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700': pathname !== item.path,
                  })}>
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="mr-2 flex flex-1 items-center justify-end gap-x-6">
            <Link href="/login" className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900">
              Log in
            </Link>
            <Link
              href="/register"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              Sign up
            </Link>
          </div>
          <MobileMenu />
          <User />
        </div>
      </div>
    </header>
  )
}

export default Header
