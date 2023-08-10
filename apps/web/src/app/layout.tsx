import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700', '400'],
  display: 'swap',
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Mindfulyze',
  description:
    'Mindfulyze is a web application for tracking emotions and thoughts. The application was created with the goal of helping you reflect on your emotions and thoughts, and keep a record of them in a simple and organized way.Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
