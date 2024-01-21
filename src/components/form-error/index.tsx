type FormErrorProps = {
  message: string
}

const FormError = ({ message }: FormErrorProps) => {
  return <div>{message}</div>
}

export default FormError
