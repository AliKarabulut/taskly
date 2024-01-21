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
    const confirmLink = `${process.env.SITE_URL}/new-verification?token=${token}`

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
      subject: 'Email Confirmation',
      html: `
        <h1>Confirm your email</h1>
        <p>Click the link below to confirm your email address.</p>
        <a href="${confirmLink}">Confirm email</a>
      `,
    }

    await transporter.sendMail(mailOption, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log(info)
      }
    })

    return NextResponse.json({ message: 'Confirmation Email Sent' }, { status: 200 })
  } catch (err: unknown) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 })
  }
}
