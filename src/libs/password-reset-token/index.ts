import { client } from '@/libs/prismadb'

export const getPassordResetTokenByToken = async (token: string) => {
  try {
    const passwordToken = await client.passwordResetToken.findUnique({
      where: {
        token,
      },
    })

    return passwordToken
  } catch (error) {
    return null
  }
}

export const getPassordResetTokenByEmail = async (email: string) => {
  try {
    const passwordToken = await client.passwordResetToken.findFirst({
      where: {
        email,
      },
    })

    return passwordToken
  } catch (error) {
    return null
  }
}
