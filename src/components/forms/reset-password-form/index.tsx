'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'

import { EmailSchema } from '@/schemas'
import Button from '@/components/button'
import Input from '@/components/input'
import { resetPassword } from '@/actions/reset-password'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import FormContainer from '@/components/form-container'

const ResetPasswordForm = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>('')
  const [success, setSuccess] = useState<string | null>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (values: z.infer<typeof EmailSchema>) => {
    setError('')
    setSuccess('')
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
    <FormContainer title="Forgot Your Password">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Email address" type="email" {...register('email')} error={errors.email?.message} />
        <div>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button label="Send Reset Email" disabled={isPending} />
        </div>
      </form>
    </FormContainer>
  )
}

export default ResetPasswordForm
