import Check from '@/components/icons/check'

type FormSuccessProps = {
  message: string
}

const FormSuccess = ({ message }: FormSuccessProps) => {
  return (
    <div className="mb-1.5 inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-green-100 px-1.5 py-1 text-sm font-medium text-green-700 dark:bg-green-950">
      <Check />
      {message}
    </div>
  )
}

export default FormSuccess
