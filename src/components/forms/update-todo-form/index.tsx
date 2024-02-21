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
import { updateTodo } from '@/actions/update-todo'
import Select from '@/components/select'
import FormContainer from '@/components/form-container'

type UpdateTodoFormProps = {
  existingTodo: {
    id: string
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
  }
}

const UpdateTodoForm = ({ existingTodo }: UpdateTodoFormProps) => {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof TodoSchema>>({
    resolver: zodResolver(TodoSchema),
    defaultValues: {
      title: existingTodo.title,
      description: existingTodo.description,
      priority: existingTodo.priority,
    },
  })

  const onSubmit = (values: z.infer<typeof TodoSchema>) => {
    setError('')
    setSuccess('')
    startTransition(() => {
      updateTodo(values, existingTodo.id).then(data => {
        if (data?.error) {
          setError(data.error)
        } else if (data?.success) {
          setSuccess(data.success)
        }
      })
    })
  }

  return (
    <FormContainer title="Update Todo">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Input label="Name" {...register('title')} error={errors.title?.message} />
        <Input label="Description" {...register('description')} error={errors.description?.message} />
        <Select label="Priority" name="priority" value={existingTodo.priority} setValue={setValue} error={errors.priority?.message} />
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
          <Button label="Update Todo" disabled={isPending} />
        </div>
      </form>
    </FormContainer>
  )
}

export default UpdateTodoForm
