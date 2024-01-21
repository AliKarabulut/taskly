'use client'
import { set, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import toast from 'react-hot-toast'

import { ResetPasswordSchema } from '@/schemas'
import Button from '@/components/button'
import Input from '@/components/input'
import { resetPassword } from '@/actions/reset-password'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'

const Login = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>('')
  const [success, setSuccess] = useState<string | null>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof ResetPasswordSchema>) => {
    startTransition(() => {
      resetPassword(values).then(data => {
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
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Your Password?</h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input label="Email address" type="email" {...register('email')} error={errors.email?.message} />
              <div>
                {error && <FormError message={error} />}
                {success && <FormSuccess message={success} />}
                <Button label="Send Reset Email" disabled={isPending} className="hover:bg-indigo-500  focus-visible:outline-indigo-600" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
