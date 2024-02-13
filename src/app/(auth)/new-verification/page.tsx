'use client'
import { useSearchParams } from 'next/navigation'
import BeatLoader from 'react-spinners/BeatLoader'
import { useEffect, useState, useCallback } from 'react'

import Button from '@/components/button'
import { newVerification } from '@/actions/new-verification'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'

const NewVerification = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const onSubmit = useCallback(async () => {
    if (error || success) return
    if (!token) {
      setError('No token provided')
      return
    }

    const response = await newVerification(token)
    if (response.error) {
      setError(response.error)
      setSuccess('')
      return
    } else if (response.success) {
      setSuccess(response.success)
      setError('')
      return
    }
  }, [token, error, success])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <section>
      <div className="mt-8 flex min-h-full  flex-1 flex-col items-center justify-center gap-6 bg-white px-6 py-12 shadow sm:mx-auto sm:w-full sm:max-w-[480px] sm:rounded-lg lg:px-8">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Confirming Your Verification</h2>
        <div className="flex items-center justify-center">
          {!error && !success && <BeatLoader />}
          {error && <FormError message={error} />}
          {success && <FormSuccess message={success} />}
        </div>
        <Button label="Back to login" href="/login" className="mt-2 w-fit sm:mt-4" />
      </div>
    </section>
  )
}

export default NewVerification
