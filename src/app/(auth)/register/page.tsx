'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import Link from 'next/link'

import { RegisterSchema } from '@/schemas'
import Button from '@/components/button'
import Input from '@/components/input'
import { register as registerAction } from '@/actions/register'
import LoginProvider from '@/components/login-providers'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'

const Register = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>('')
  const [success, setSuccess] = useState<string | null>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
    },
  })

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      registerAction(values).then(data => {
        if (data?.error) {
          setError(data.error)
        } else if (data?.success) {
          setSuccess(data.success)
        }
      })
    })
  }

  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col items-center justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input label="Name" type="text" {...register('name')} error={errors.name?.message} />
              <Input label="Email address" type="email" {...register('email')} error={errors.email?.message} />
              <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
              <Input
                label="Repeat Password"
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
              />
              <div className="flex items-center justify-between">
                <div className="text-sm leading-6">
                  <Link href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Do you have an account? &nbsp;
                  </Link>
                </div>
              </div>
              <div>
                {error && <FormError message={error} />}
                {success && <FormSuccess message={success} />}
                <Button label="Register" disabled={isPending} className="hover:bg-indigo-500  focus-visible:outline-indigo-600" />
              </div>
            </form>

            <div>
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
      </div>
    </section>
  )
}

export default Register
