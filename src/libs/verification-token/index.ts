import { client } from '@/libs/prismadb'

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await client.verificationToken.findUnique({
      where: {
        token,
      },
    })

    return verificationToken
  } catch (error) {
    return null
  }
}
export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await client.verificationToken.findFirst({
      where: {
        email,
      },
    })

    return verificationToken
  } catch (error) {
    return null
  }
}
