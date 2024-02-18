import Exclamation from '@/components/icons/exclamation'
type FormErrorProps = {
  message: string
}

const FormError = ({ message }: FormErrorProps) => {
  return (
    <div className="mb-1.5 inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-red-100 px-1.5 py-1 text-sm font-medium text-red-700 dark:bg-red-950">
      <Exclamation />
      {message}
    </div>
  )
}

export default FormError
