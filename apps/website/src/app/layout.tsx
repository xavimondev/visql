import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { APP_URL } from '@/constants'
import { ThemeProvider } from '@/components/theme-provider'
import { Toast } from '@/components/toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const title = 'viSQL - Build Databases from Designs using AI'
const description = `Eliminate the complexities of the development process and receive not 
only generated SQL code but also a command line 
script for immediate local execution.`

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title,
  description,
  keywords: ['postgress', 'ai', 'sql', 'command'],
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'Visql.com',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/banner.webp',
        width: 1835,
        height: 1000,
        type: 'image/jpeg'
      }
    ]
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toast />
      </body>
    </html>
  )
}
