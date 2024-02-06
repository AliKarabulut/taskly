import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(8, {
    message: 'Minimum 8 characters required',
  }),
  rememberMe: z.optional(z.boolean()),
  code: z.optional(z.string()),
})

export const RegisterSchema = z
  .object({
    email: z.string().email({
      message: 'Email is required',
    }),
    password: z
      .string()
      .min(8, {
        message: 'Minimum 8 characters required',
      })
      .refine(value => /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value), {
        message: 'Password must contain at least one uppercase letter, one lowercase letter and one digit',
      }),
    confirmPassword: z.string(),
    name: z.string().min(2, {
      message: 'Name is required',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const EmailVerifyScheme = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
})

export const NewPasswordScheme = z
  .object({
    password: z
      .string()
      .min(8, {
        message: 'Minimum 8 characters required',
      })
      .refine(value => /[a-z]/.test(value) && /[A-Z]/.test(value) && /[0-9]/.test(value), {
        message: 'Password must contain at least one uppercase letter, one lowercase letter and one digit',
      }),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

export const TodoSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required',
  }),
  description: z.string().min(1, {
    message: 'Description is required',
  }),
  priority: z.enum(['low', 'medium', 'high']),
})
