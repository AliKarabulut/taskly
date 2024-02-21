'use client'
import { useSearchParams } from 'next/navigation'
import BeatLoader from 'react-spinners/BeatLoader'
import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

import Button from '@/components/button'
import { newVerification } from '@/actions/new-verification'
import FormError from '@/components/form-error'
import FormSuccess from '@/components/form-success'
import FormContainer from '@/components/form-container'

const NewVerification = () => {
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const router = useRouter()

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
      router.push('/login')
      return
    }
  }, [token, error, success])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <FormContainer title="Confirming Your Verification">
      <div className="flex items-center justify-center">
        {!error && !success && <BeatLoader />}
        {error && <FormError message={error} />}
        {success && <FormSuccess message={success} />}
      </div>
      <Button label="Back to login" href="/login" className="mt-2 sm:mt-4" />
    </FormContainer>
  )
}

export default NewVerification
