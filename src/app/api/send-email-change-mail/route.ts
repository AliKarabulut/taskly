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
    const confirmLink = `${process.env.SITE_URL}/new-email?token=${token}`

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
      subject: 'Email Change',
      html: `
        <h1>Change Your Email</h1>
        <p>Click the link below to change your email.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <a href="${confirmLink}" target='_blank'>Change Email</a>
      `,
    }

    await transporter.sendMail(mailOption)

    return NextResponse.json({ message: 'Email replacement email sent' }, { status: 200 })
  } catch (err: unknown) {
    return NextResponse.json(
      { error: 'An error occurred while attempting to send the email replacement email. Please try again' },
      { status: 500 },
    )
  }
}

export const dynamic = 'force-dynamic'
