import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import { SessionProvider } from 'next-auth/react'

import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { sharedTitle, sharedDescription } from '@/app/shared-metadata'
import { ThemeProvider } from '@/store/theme-provider'
import { auth } from '@/auth'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const theme = cookies().get('theme')
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en" className={theme?.value ? theme.value : 'light'} suppressHydrationWarning>
        <ThemeProvider theme={theme?.value ? theme.value : 'light'}>
          <body className={inter.className}>
            <Header />
            {children}
            <Footer />
          </body>
        </ThemeProvider>
      </html>
    </SessionProvider>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000/'),
  robots: {
    index: true,
    follow: true,
  },
  title: {
    template: `%s — ${sharedTitle}`,
    default: sharedTitle,
  },
  description: sharedDescription,
  openGraph: {
    title: {
      template: `%s — ${sharedTitle}`,
      default: sharedTitle,
    },
    description: sharedDescription,
    images: [
      {
        url: 'http://localhost:3000/favicon.png',
        width: 1200,
        height: 630,
        alt: 'Description of the image',
      },
    ],
    type: 'website',
    url: '/',
    siteName: sharedTitle,
    locale: 'en_US',
  },
}

export const viewport = {
  themeColor: 'white',
  colorScheme: 'only light',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}
