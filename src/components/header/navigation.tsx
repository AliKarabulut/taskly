'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

import { navigation } from '@/constants/header'
import cn from '@/utils/cn'

const Navigation = () => {
  const pathname = usePathname()
  return (
    <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
      {navigation.map(item => (
        <Link
          href={item.path}
          key={item.name}
          className={cn('inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium', {
            'border-indigo-500 text-gray-900 dark:border-darkModeNeutral-50 dark:text-darkModeNeutral-100': pathname === item.path,
            'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:border-darkModeNeutral-200 dark:text-darkModeNeutral-200 dark:hover:border-darkModeNeutral-100 dark:hover:text-darkModeNeutral-100':
              pathname !== item.path,
          })}>
          {item.name}
        </Link>
      ))}
    </div>
  )
}

export default Navigation
