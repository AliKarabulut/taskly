import React from 'react'

type SeperatorProps = {
  text: string
}

const Seperator = ({ text }: SeperatorProps) => {
  return (
    <div className="relative mt-10 flex items-center justify-center">
      <hr className="absolute h-px w-full bg-gray-200" aria-hidden="true" />
      <span className="relative bg-white px-6 text-sm font-medium leading-6 text-gray-900">{text}</span>
    </div>
  )
}

export default Seperator
