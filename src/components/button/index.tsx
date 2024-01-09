import Link from 'next/link'

import cn from '@/utils/cn'

type ButtonProps = {
  href?: string
  label: string
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  children?: React.ReactNode
}

const Button = ({ href, label, type = 'submit', onClick, className, children }: ButtonProps) => {
  const buttonClass = cn(
    'flex w-full justify-center gap-3 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    className,
  )

  return href ? (
    <Link href={href} className={buttonClass}>
      {children}
      {label}
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={buttonClass}>
      {children}
      {label}
    </button>
  )
}

export default Button
