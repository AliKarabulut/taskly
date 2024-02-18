import { signIn } from 'next-auth/react'

import Button from '@/components/button'
import GitHubIcon from '@/components/icons/github'
import GoogleIcon from '@/components/icons/google'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

type LoginProviderProps = {
  isPending: boolean
}

type ProviderType = 'google' | 'github'

const LoginProvider = ({ isPending }: LoginProviderProps) => {
  const handleClick = (provider: ProviderType) => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT })
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      <Button
        label="Google"
        disabled={isPending}
        className="bg-[#1D9BF0] focus-visible:outline-[#1D9BF0]"
        onClick={() => handleClick('google')}>
        <GoogleIcon />
      </Button>
      <Button
        label="GitHub"
        disabled={isPending}
        className="bg-[#24292F] hover:bg-[#1b1f24] focus-visible:outline-[#24292F]"
        onClick={() => handleClick('github')}>
        <GitHubIcon />
      </Button>
    </div>
  )
}

export default LoginProvider
