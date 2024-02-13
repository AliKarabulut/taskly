type FormContainerProps = {
  title: string
  children: React.ReactNode
}

const FormContainer = ({ title, children }: FormContainerProps) => {
  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col items-center justify-center sm:px-6 lg:px-8">
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{title}</h2>
        <div className="mt-8 bg-white px-6 py-12 shadow sm:mx-auto sm:w-full sm:max-w-[480px] sm:rounded-lg sm:px-12">{children}</div>
      </div>
    </section>
  )
}

export default FormContainer
