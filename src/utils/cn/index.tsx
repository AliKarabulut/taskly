import classNames, { Argument } from 'classnames'
import { twMerge } from 'tailwind-merge'

const cn = (...args: Argument[]) => {
  return twMerge(classNames(args))
}
export default cn
