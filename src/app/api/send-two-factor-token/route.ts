import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

type RequestBodyProps = {
  email: string
  token: string
}

export const POST = async (request: NextRequest) => {
  try {
    const body = (await request.json()) as RequestBodyProps

    if (!body.email || !body.token) {
      return NextResponse.json({ message: 'Missing Email or Token' }, { status: 400 })
    }

    const { email, token } = body

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    })

    const mailOption = {
      from: process.env.USER_EMAIL,
      to: email,
      subject: '2FA Code',
      html: `
        <h1>Your 2FA Code</h1>
        <p>${token}</p>
      `,
    }

    await transporter.sendMail(mailOption)

    return NextResponse.json({ message: '2FA code has been sent to your email' }, { status: 200 })
  } catch (err: unknown) {
    return NextResponse.json({ message: 'An error occurred while attempting to send the 2FA code. Please try again' }, { status: 500 })
  }
}

export const dynamic = 'force-dynamic'
