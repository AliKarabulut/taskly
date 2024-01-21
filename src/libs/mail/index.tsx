import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${process.env.SITE_URL}/new-verification?token=${token}`

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Confirm your email',
      html: `
        <h1>Confirm your email</h1>
        <p>Click the link below to confirm your email address.</p>
        <a href="${confirmLink}">Confirm email</a>
      `,
    })

    return true
  } catch (error) {
    return null
  }
}

export default sendVerificationEmail
