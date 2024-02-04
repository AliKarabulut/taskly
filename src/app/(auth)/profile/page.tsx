'use client'
import { useTransition } from 'react'
import toast from 'react-hot-toast'

import { changeEmail } from '@/actions/change-email'
import Button from '@/components/button'
// import UserInformationList from '@/components/user-information-list'
import { useCurrentUser } from '@/services/get-user-client'
import SwitchComponent from '@/components/switch'

const Profile = () => {
  const [isPending, startTransition] = useTransition()
  const user = useCurrentUser()
  console.log(user)
  const emailChangeHandler = (email: string) => {
    startTransition(() => {
      changeEmail({ email }).then(data => {
        if (data?.error) {
          toast.error(data.error)
        } else {
          toast.success(data.success)
        }
      })
    })
  }

  return (
    <section id="profile">
      <ul className="mx-auto flex max-w-lg flex-col gap-2 rounded-lg px-8 py-10 shadow">
        {/* {user && Object.entries(user).map(([key, value]) => <UserInformationList key={key} name={key} value={value} />)} */}
        {user ? (
          <>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 ">
              <span className="font-medium first-letter:capitalize dark:text-white">Id:</span>
              <span className=" inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700  ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                {user.id}
              </span>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 ">
              <span className="font-medium first-letter:capitalize dark:text-white">Name:</span>
              <span className=" inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700  ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                {user.name}
              </span>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 ">
              <span className="font-medium first-letter:capitalize dark:text-white">Email:</span>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700  ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                  {user.email}
                </span>
                <Button label="Edit" disabled={isPending} className="w-fit" onClick={() => emailChangeHandler(user?.email ?? '')}></Button>
              </div>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 ">
              <span className="font-medium first-letter:capitalize dark:text-white">Image:</span>
              <span className=" inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700  ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                {user.image ? 'Set' : 'Not set'}
              </span>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 ">
              <span className="font-medium first-letter:capitalize dark:text-white">Role:</span>
              <span className=" inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700  ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                {user.role}
              </span>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 ">
              <span className="font-medium first-letter:capitalize dark:text-white">IsTwoFactorEnabled:</span>
              <div className="flex items-center gap-2">
                <span className=" inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700  ring-1 ring-inset ring-purple-700/10 dark:bg-purple-400/10 dark:text-purple-400 dark:ring-purple-400/30">
                  {user.isTwoFactorEnabled ? 'On' : 'Off'}
                </span>
                <SwitchComponent />
              </div>
            </li>
          </>
        ) : (
          <div>User Data Not Found</div>
        )}
      </ul>
    </section>
  )
}

export default Profile
