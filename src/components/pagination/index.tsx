'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import cn from '@/utils/cn'

type PaginationProps = {
  totalPages: number
  activePage: number
  className?: string
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, activePage, className }) => {
  const [page, setPage] = useState<number>(activePage)
  const router = useRouter()

  const arrayGenerator = (total: number): (number | string)[] => {
    let array: (number | string)[] = [1]
    if (total > 7 && activePage < 4) {
      for (let i = 2; i < 6; i++) {
        array.push(i)
      }
      array.push('...', total)
    } else if (total > 7 && 4 <= activePage && activePage < totalPages - 3) {
      array.push('...')
      for (let i = activePage - 1; i <= activePage + 1; i++) {
        array.push(i)
      }
      array.push('...', total)
    } else if (total > 7 && activePage >= totalPages - 3) {
      array.push('...')
      for (let i = totalPages - 4; i <= totalPages; i++) {
        array.push(i)
      }
    } else {
      for (let i = 2; i <= total; i++) {
        array.push(i)
      }
    }
    return array
  }

  const clickHandler = (value: number): void => {
    if (page + value > 0 && page + value <= totalPages) {
      router.push(`todo/?page=${page + value}`)
      setPage(page + value)
    }
  }

  const pageHandler = (value: number | string): void => {
    if (value === '...') {
      return
    } else {
      router.push(`todo/?page=${value}`)
      setPage(value as number)
    }
  }

  return (
    <div className={cn('flex rounded-md shadow-sm', className)}>
      <button
        onClick={() => clickHandler(-1)}
        className={cn(
          'relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-darkModeNeutral-300 dark:hover:bg-darkModeNeutral-600',
          {
            'opacity-50': page === 1,
          },
        )}>
        <ChevronLeftIcon className="h-5 w-5" />
      </button>

      {arrayGenerator(totalPages).map((item, index) => {
        return (
          <button
            onClick={() => pageHandler(item)}
            key={index}
            className={cn(
              'relative inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 dark:ring-darkModeNeutral-300',
              {
                'z-10 bg-indigo-600 text-white ring-0 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-darkModeNeutral-500 dark:text-darkModeNeutral-50':
                  item === page,
                'text-gray-900 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:text-darkModeNeutral-50 dark:hover:bg-darkModeNeutral-600':
                  item !== '...' && item !== page,
                ' text-gray-700 focus:outline-offset-0': item === '...',
              },
            )}>
            {item}
          </button>
        )
      })}

      <button
        onClick={() => clickHandler(1)}
        className={cn(
          'relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 dark:ring-darkModeNeutral-300 dark:hover:bg-darkModeNeutral-600',
          {
            'opacity-50': page === totalPages,
          },
        )}>
        <ChevronRightIcon className="h-5 w-5" />
      </button>
    </div>
  )
}

export default Pagination
