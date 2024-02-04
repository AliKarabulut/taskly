'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { useSearchParams } from 'next/navigation'

import { EmailVerifyScheme } from '@/schemas'
import Button from '@/components/button'
import Input from '@/components/input'
import { newEmail } from '@/actions/new-email'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'

const NewEmail = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>('')
  const [success, setSuccess] = useState<string | null>('')

  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof EmailVerifyScheme>>({
    resolver: zodResolver(EmailVerifyScheme),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (value: z.infer<typeof EmailVerifyScheme>) => {
    console.log(value)
    startTransition(() => {
      newEmail(value, token).then(data => {
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
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">New Password</h2>
        </div>
        <div className="mt-8 bg-white px-6 py-12 shadow sm:mx-auto sm:w-full sm:max-w-[480px] sm:rounded-lg sm:px-12">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Email" type="email" {...register('email')} error={errors.email?.message} />
            <div>
              {error && <FormError message={error} />}
              {success && <FormSuccess message={success} />}
              <Button label="Change Email" disabled={isPending} className="hover:bg-indigo-500  focus-visible:outline-indigo-600" />
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default NewEmail
