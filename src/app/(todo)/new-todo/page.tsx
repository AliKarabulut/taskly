'use client'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'

import { TodoSchema } from '@/schemas'
import Button from '@/components/button'
import Input from '@/components/input'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import { newTodo } from '@/actions/new-todo'
import { useCurrentUser } from '@/services/get-user-client'
import Select from '@/components/select'

const NewTodo = () => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>('')
  const [success, setSuccess] = useState<string | null>('')
  const user = useCurrentUser()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'low',
    },
  })

  const onSubmit = (values: z.infer<typeof TodoSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      newTodo(values, user!.id).then(data => {
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
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create new todo</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <Input label="Name" {...register('title')} error={errors.title?.message} />
              <Input label="Description" {...register('description')} error={errors.description?.message} />
              <Select label="Priority" name="priority" setValue={setValue} error={errors.priority?.message} />
              <div>
                {error && <FormError message={error} />}
                {success && (
                  <>
                    <FormSuccess message={success} />
                    <Button
                      label="Back to Todos"
                      href="/todo"
                      disabled={isPending}
                      className="mb-1.5  hover:bg-indigo-500 focus-visible:outline-indigo-600"
                    />
                  </>
                )}
                <Button label="Create New Todo" disabled={isPending} className="hover:bg-indigo-500  focus-visible:outline-indigo-600" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NewTodo