import './globals.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { cn, constructMetadata } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quill - the SaaS for students',
  description: 'Quill is an open-source software to make chatting to your PDF files easy.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
      {/* <Providers> */}
      <body className={cn('min-h-screen font-sans antialiased grainy', inter.className)}>
        {/* <Toaster /> */}
        {/* <Navbar /> */}
        {children}
      </body>
      {/* </Providers> */}
    </html>
  )
}
