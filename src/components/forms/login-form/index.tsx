'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import Link from 'next/link'

import { LoginSchema } from '@/schemas'
import Button from '@/components/button'
import Input from '@/components/input'
import Checkbox from '@/components/checkbox'
import { login } from '@/actions/login'
import LoginProvider from '@/components/login-providers'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import FormContainer from '@/components/form-container'
import Seperator from '@/components/seperator'

const LoginForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>('')
  const [success, setSuccess] = useState<string | null>('')
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
            <div className="flex items-center justify-between">
              <Checkbox label="Remember me" {...register('rememberMe')} />
              <div className="text-sm leading-6">
                <Link href="/reset-password" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>
          </>
        )}
        <div>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button
            label={showTwoFactor ? 'Confirm' : 'Login'}
            disabled={isPending}
            className="hover:bg-indigo-500  focus-visible:outline-indigo-600"
          />
        </div>
      </form>
      <Seperator text="Or continue with" />
      <LoginProvider isPending={isPending} />
    </FormContainer>
  )
}

export default LoginForm
