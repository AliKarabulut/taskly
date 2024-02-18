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
import FormContainer from '@/components/form-container'
import Seperator from '@/components/seperator'

const RegisterForm = () => {
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
    setError('')
    setSuccess('')
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
    <FormContainer title="Register">
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
            <Button href="/login" label="Do you have an account? &nbsp;" variant="ghost" className="w-fit leading-6" />
          </div>
        </div>
        <div>
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
          <Button label="Register" disabled={isPending} />
        </div>
      </form>
      <Seperator text="Or continue with" />
      <LoginProvider isPending={isPending} />
    </FormContainer>
  )
}

export default RegisterForm
