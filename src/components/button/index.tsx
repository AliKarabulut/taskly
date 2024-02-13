import Link from 'next/link'

import cn from '@/utils/cn'

type ButtonProps = {
  href?: string
  label: string
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  children?: React.ReactNode
  disabled?: boolean
}

const Button = ({ href, label, type = 'submit', onClick, className, children, disabled, ...props }: ButtonProps) => {
  const buttonClass = cn(
    'flex w-full justify-center transition-all gap-3 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    { 'opacity-50': disabled },
    className,
  )

  return href ? (
    <Link href={href} className={buttonClass} {...props}>
      {children}
      {label}
    </Link>
  ) : (
    <button type={type} onClick={onClick} className={buttonClass} disabled={disabled} {...props}>
      {children}
      {label}
    </button>
  )
}

export default Button
