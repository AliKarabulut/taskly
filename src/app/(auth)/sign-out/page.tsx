import { signOut, auth } from '@/auth'

const SignOut = async () => {
  const session = await auth()
  return (
    <div>
      {JSON.stringify(session)}
      <form
        action={async () => {
          'use server'
          console.log('signing out')
          await signOut()
        }}>
        <button type="submit" className="text-2xl font-semibold">
          Signout
        </button>
      </form>
    </div>
  )
}

export default SignOut
