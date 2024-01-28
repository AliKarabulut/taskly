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

const Login = () => {
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
    <section>
      <div className="flex min-h-full flex-1 flex-col items-center justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
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

            <div className="relative mt-10">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm font-medium leading-6">
                <span className="bg-white px-6 text-gray-900">Or continue with</span>
              </div>
            </div>
            <LoginProvider isPending={isPending} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
