'use client'

import { useContext } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

import { ThemeContext } from '@/store/theme-provider'
import cn from '@/utils/cn'

type ThemeToggleProps = {
  size?: number
  className?: string
}

type Theme = 'light' | 'dark'

export const ThemeToggle = ({ size = 18, className }: ThemeToggleProps) => {
  const { setTheme } = useContext(ThemeContext)

  const themeHandler = (theme: Theme) => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    document.cookie = `theme=${theme}`
    setTheme(theme)
  }

  return (
    <button id="dark-mode-toggle" aria-hidden="true" className={cn('flex items-center text-gray-800 dark:text-white', className)}>
      <SunIcon width={size} height={size} className="hidden text-lg dark:block" onClick={() => themeHandler('light')} />
      <MoonIcon width={size} height={size} className="block text-lg dark:hidden" onClick={() => themeHandler('dark')} />
    </button>
  )
}

export default ThemeToggle
