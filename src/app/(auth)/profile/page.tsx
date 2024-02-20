'use client'
import { useTransition } from 'react'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'

import { changeEmail } from '@/actions/change-email'
import Button from '@/components/button'
// import UserInformationList from '@/components/user-information-list'
import { useCurrentUser } from '@/services/get-user-client'
import SwitchComponent from '@/components/switch'
import { toggleTwoFactor } from '@/actions/toggle-two-factor'

export const dynamic = 'force-dynamic'

const Profile = () => {
  const [isPending, startTransition] = useTransition()
  const user = useCurrentUser()
  const { update } = useSession()
  const emailChangeHandler = (email: string) => {
    startTransition(() => {
      changeEmail({ email }).then(data => {
        if (data.error) {
          toast.error(data.error)
        } else {
          toast.success(data.success)
        }
      })
    })
  }

  const twoFactorChangeHandler = (value: boolean) => {
    startTransition(() => {
      toggleTwoFactor({ value }).then(data => {
        if (data.error) {
          toast.error(data.error)
        } else if (data.success) {
          console.log(data)
          update()
          toast.success(data.success)
        }
      })
    })
  }

  return (
    <section id="profile">
      <ul className="mx-auto flex w-11/12 flex-col gap-2 rounded-lg px-8 py-10 shadow dark:text-darkModeNeutral-200 sm:max-w-lg">
        {/* {user && Object.entries(user).map(([key, value]) => <UserInformationList key={key} name={key} value={value} />)} */}
        {user ? (
          <>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 ">
              <span className="font-medium first-letter:capitalize ">Id:</span>
              <span className=" inline-flex items-center truncate rounded-md bg-purple-50 px-2 py-1 text-xs font-medium  text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-darkModeNeutral-600 dark:text-darkModeNeutral-50 dark:ring-purple-400/30">
                {user.id}
              </span>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 ">
              <span className="font-medium first-letter:capitalize ">Name:</span>
              <span className=" inline-flex items-center truncate rounded-md bg-purple-50 px-2 py-1 text-xs font-medium  text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-darkModeNeutral-600 dark:text-darkModeNeutral-50 dark:ring-purple-400/30">
                {user.name}
              </span>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 ">
              <span className="font-medium first-letter:capitalize ">Email:</span>
              <div className="flex flex-wrap items-center justify-end gap-2">
                <span className="inline-flex items-center truncate rounded-md bg-purple-50 px-2 py-1 text-xs font-medium  text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-darkModeNeutral-600 dark:text-darkModeNeutral-50 dark:ring-purple-400/30">
                  {user.email}
                </span>
                <Button
                  label="Change Email"
                  disabled={isPending}
                  className="w-fit"
                  onClick={() => emailChangeHandler(user?.email ?? '')}></Button>
              </div>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 ">
              <span className="font-medium first-letter:capitalize ">Password:</span>
              <Button href="/change-password" label="Change Password" disabled={isPending} className="w-fit" />
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 ">
              <span className="font-medium first-letter:capitalize ">Image:</span>
              <span className=" inline-flex items-center truncate rounded-md bg-purple-50 px-2 py-1 text-xs font-medium  text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-darkModeNeutral-600 dark:text-darkModeNeutral-50 dark:ring-purple-400/30">
                {user.image ? 'Set' : 'Not set'}
              </span>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 ">
              <span className="font-medium first-letter:capitalize ">Role:</span>
              <span className=" inline-flex items-center truncate rounded-md bg-purple-50 px-2 py-1 text-xs font-medium  text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-darkModeNeutral-600 dark:text-darkModeNeutral-50 dark:ring-purple-400/30">
                {user.role}
              </span>
            </li>
            <li className="flex items-center justify-between gap-6 border-b border-gray-100 py-1.5 ">
              <span className="font-medium first-letter:capitalize ">IsTwoFactorEnabled:</span>
              <div className="flex items-center gap-2">
                {/* <span className=" inline-flex items-center truncate rounded-md bg-purple-50 px-2 py-1 text-xs font-medium  text-purple-700 ring-1 ring-inset ring-purple-700/10 dark:bg-darkModeNeutral-600 dark:text-darkModeNeutral-50 dark:ring-purple-400/30">
                  {user.isTwoFactorEnabled ? 'On' : 'Off'}
                </span> */}
                <SwitchComponent onChange={twoFactorChangeHandler} initialValue={user.isTwoFactorEnabled} />
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
