type FormContainerProps = {
  title: string
  children: React.ReactNode
}

const FormContainer = ({ title, children }: FormContainerProps) => {
  return (
    <section>
      <div className="flex min-h-full flex-1 flex-col items-center justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">{title}</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">{children}</div>
        </div>
      </div>
    </section>
  )
}

export default FormContainer
