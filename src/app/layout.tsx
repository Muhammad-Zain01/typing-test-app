import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { TypingProvider } from '@/context/typing-context'
import { ThemeProvider } from '@/context/theme-context'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Typing Speed Test',
  description: 'Test your typing speed and accuracy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <TypingProvider>
            {children}
          </TypingProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
