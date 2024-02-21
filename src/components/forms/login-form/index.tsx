'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'

import { LoginSchema } from '@/schemas'
import Button from '@/components/button'
import Input from '@/components/input'
// import Checkbox from '@/components/checkbox'
import { login } from '@/actions/login'
import LoginProvider from '@/components/login-providers'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import FormContainer from '@/components/form-container'
import Seperator from '@/components/seperator'

const LoginForm = () => {
  const params = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(params.get('error') ? 'User has signed in with another provider' : null)
  const [success, setSuccess] = useState<string | null>(null)
  const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      code: '',
      rememberMe: false,
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      login(values).then(data => {
        if (data?.error) {
          setError(data.error)
        } else if (data?.success) {
          setSuccess(data.success)
        } else if (data?.twoFactor) {
          setShowTwoFactor(true)
        }
      })
    })
  }
  return (
    <FormContainer title="Sign In To Your Account">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        {showTwoFactor ? (
          <Input label="Two Factor Code" type="number" {...register('code')} error={errors.code?.message} />
        ) : (
          <>
            <Input label="Email address" type="email" {...register('email')} error={errors.email?.message} />
            <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
            <div className="flex items-center justify-end">
              {/* <Checkbox label="Remember me" {...register('rememberMe')} /> */}
              <Button href="/reset-password" label="Forgot password" variant="ghost" className="w-fit leading-6" />
            </div>
          </>
        )}
        <div>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button label={showTwoFactor ? 'Confirm' : 'Log in'} disabled={isPending} />
        </div>
      </form>
      <Seperator text="Or continue with" />
      <LoginProvider isPending={isPending} />
    </FormContainer>
  )
}

export default LoginForm
