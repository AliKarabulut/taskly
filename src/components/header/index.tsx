import Link from 'next/link'

import User from '@/components/header/user'
import MobileMenu from '@/components/header/mobile-menu'
import Navigation from '@/components/header/navigation'
import ThemeToggle from '@/components/theme-toggle'
import getUserInformation from '@/actions/get-user-information'
import Button from '@/components/button'
import AuthIcon from '@/components/icons/auth'

const Header = async () => {
  const user = await getUserInformation()
  return (
    <header className="bg-white shadow dark:bg-darkModeNeutral-900">
      <div className="container mx-auto px-2 sm:px-8">
        <div className="flex h-16 justify-between gap-x-3 sm:gap-x-4">
          <div className="flex px-2 sm:px-0">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <AuthIcon className="fill-black/90 dark:fill-darkModeNeutral-50" size={38} />
            </Link>
            <Navigation />
          </div>
          <ThemeToggle className="ml-auto" />
          {!user && (
            <div className="mr-2 flex items-center justify-end gap-x-4">
              <Button href="/login" label="Log in" variant="ghost" className="text-gray-500"></Button>
              <Button href="/register" label="Sign up" className="whitespace-nowrap"></Button>
            </div>
          )}
          {user && (
            <>
              <MobileMenu name={user.name as string} src={user.image as string} email={user.email as string} />
              <User name={user.name as string} src={user.image as string} />
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
