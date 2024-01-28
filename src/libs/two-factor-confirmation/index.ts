import { client } from '@/libs/prismadb'

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await client.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    })

    return twoFactorConfirmation
  } catch (error) {
    return null
  }
}
