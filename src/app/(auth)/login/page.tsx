'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import toast from 'react-hot-toast'

import { LoginSchema } from '@/schemas'
import Button from '@/components/button'
import GitHubIcon from '@/components/icons/github'
import GoogleIcon from '@/components/icons/google'
import Input from '@/components/input'
import Checkbox from '@/components/checkbox'
import { login } from '@/actions/login'

const Login = () => {
  const [isPending, startTransition] = useTransition()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then(data => {
        if (data.error) {
          toast.error('Invalid credentials!')
        } else {
          toast.success('Logged in successfully!')
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
              <Input label="Email address" type="email" {...register('email')} error={errors.email?.message} />
              <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
              <div className="flex items-center justify-between">
                <Checkbox label="Remember me" {...register('rememberMe')} />
                <div className="text-sm leading-6">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div>
                <Button label="Sign In" disabled={isPending} className="hover:bg-indigo-500  focus-visible:outline-indigo-600" />
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

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button label="Google" disabled={isPending} className="bg-[#1D9BF0] focus-visible:outline-[#1D9BF0]">
                  <GoogleIcon />
                </Button>
                <Button label="GitHub" disabled={isPending} className="bg-[#24292F] focus-visible:outline-[#24292F]">
                  <GitHubIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
