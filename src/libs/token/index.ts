import crypto from 'crypto'

import { v4 as uuid } from 'uuid'

import { client } from '@/libs/prismadb'
import { getVerificationTokenByEmail } from '@/libs/verification-token'
import { getPassordResetTokenByEmail } from '@/libs/password-reset-token'
import { getTwoFactorTokenByEmail } from '@/libs/two-factor-token/'
import { getEmailChangeTokenByEmail } from '@/libs/email-change-token'

export const generateVerificationToken = async (email: string, oldEmail?: string) => {
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
        oldEmail: oldEmail ? oldEmail : null,
        token,
        expires,
      },
    })

    return verificationToken
  } catch (error) {
    return null
  }
}

export const generatePasswordResetToken = async (email: string) => {
  try {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

    const existingToken = await getPassordResetTokenByEmail(email)

    if (existingToken) {
      await client.passwordResetToken.delete({
        where: {
          id: existingToken.id,
        },
      })
    }

    const passwordResetToken = await client.passwordResetToken.create({
      data: {
        email,
        token,
        expires,
      },
    })

    return passwordResetToken
  } catch (error) {
    return null
  }
}

export const generateEmailChangeToken = async (email: string) => {
  try {
    const token = uuid()
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000)

    const existingToken = await getEmailChangeTokenByEmail(email)

    if (existingToken) {
      await client.emailChangeToken.delete({
        where: {
          id: existingToken.id,
        },
      })
    }

    const emailChangeToken = await client.emailChangeToken.create({
      data: {
        email,
        token,
        expires,
      },
    })

    return emailChangeToken
  } catch (error) {
    return null
  }
}

export const generateTwoFactorToken = async (email: string) => {
  try {
    const token = crypto.randomInt(100000, 1000000).toString()
    const expires = new Date(new Date().getTime() + 5 * 60 * 1000)
    const existingToken = await getTwoFactorTokenByEmail(email)

    if (existingToken) {
      await client.twoFactorToken.delete({
        where: {
          id: existingToken.id,
        },
      })
    }

    const twoFactorToken = await client.twoFactorToken.create({
      data: {
        email,
        token,
        expires,
      },
    })

    return twoFactorToken
  } catch (error) {
    return null
  }
}
