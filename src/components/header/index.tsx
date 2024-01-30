import Image from 'next/image'
import Link from 'next/link'

import User from '@/components/header/user'
import MobileMenu from '@/components/header/mobile-menu'
import Navigation from '@/components/header/navigation'
import ThemeToggle from '@/components/theme-toggle'
import getUserInformation from '@/actions/get-user-information'

const Header = async () => {
  const user = await getUserInformation()

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-2 sm:px-8">
        <div className="flex h-16 justify-between gap-x-3 sm:gap-x-4">
          <div className="flex px-2 sm:px-0">
            <Link href="/" className="flex flex-shrink-0 items-center">
              <Image className="h-8 w-auto" src="/favicon.png" width={29} height={32} alt="Your Company" />
            </Link>
            <Navigation />
          </div>
          <ThemeToggle className="ml-auto" />
          {!user && (
            <div className="mr-2 flex items-center justify-end gap-x-6">
              <Link href="/login" className="hidden lg:block lg:text-sm lg:font-semibold lg:leading-6 lg:text-gray-900">
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Sign up
              </Link>
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
