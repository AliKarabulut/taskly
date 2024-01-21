import { v4 as uuid } from 'uuid'

import { getVerificationTokenByEmail } from '@/libs/verification-token'
import { client } from '@/libs/prismadb'

export const generateVerificationToken = async (email: string) => {
  try {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

    const existingToken = await getVerificationTokenByEmail(email)

    if (existingToken) {
      await client.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      })
    }

    const verificationToken = await client.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    })

    return verificationToken
  } catch (error) {
    return null
  }
}
