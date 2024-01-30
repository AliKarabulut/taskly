'use client'
import { useSession } from 'next-auth/react'

const SignOut = () => {
  const session = useSession()
  return (
    <div>
      {JSON.stringify(session)}
      <form>
        <button type="submit" className="text-2xl font-semibold">
          Signout
        </button>
      </form>
    </div>
  )
}

export default SignOut
