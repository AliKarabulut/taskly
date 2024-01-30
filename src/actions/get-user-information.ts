'use server'

import { auth } from '@/auth'

const getUserInformation = async () => {
  const session = await auth()

  return session?.user
}

export default getUserInformation
