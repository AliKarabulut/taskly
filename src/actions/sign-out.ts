'use server'

import { signOut as sOut } from '@/auth'

export const signOut = async () => {
  await sOut()
}
