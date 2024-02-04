import { client } from '@/libs/prismadb'

export const getTwoFactorTokenByToken = async (token: string) => {
  try {
    const twoFactorToken = await client.twoFactorToken.findUnique({
      where: {
        token,
      },
    })

    return twoFactorToken
  } catch (error) {
    return null
  }
}

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await client.twoFactorToken.findFirst({
      where: {
        email,
      },
    })

    return twoFactorToken
  } catch (error) {
    return null
  }
}
