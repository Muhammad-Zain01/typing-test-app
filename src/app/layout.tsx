import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { TypingProvider } from '@/context/typing-context'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Typing Test',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
          <TypingProvider>
            {children}
          </TypingProvider>
      </body>
    </html>
  )
}
