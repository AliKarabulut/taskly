import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import './globals.css'
import Header from '@/components/header'
import Footer from '@/components/footer'

import { sharedTitle, sharedDescription } from './shared-metadata'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Header />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
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
