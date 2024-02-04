import { client } from '@/libs/prismadb'

export const getEmailChangeTokenByToken = async (token: string) => {
  try {
    const emailChangeToken = await client.emailChangeToken.findUnique({
      where: {
        token,
      },
    })

    return emailChangeToken
  } catch (error) {
    return null
  }
}

export const getEmailChangeTokenByEmail = async (email: string) => {
  try {
    const emailChangeToken = await client.emailChangeToken.findFirst({
      where: {
        email,
      },
    })

    return emailChangeToken
  } catch (error) {
    return null
  }
}
