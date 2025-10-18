import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AppLayout } from '@/components/layout/AppLayout'
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog'
import { GlobalLoader } from '@/components/common/GlobalLoader'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Next.js Shadcn Template',
  description: 'A production-ready Next.js template with Shadcn UI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AppLayout>{children}</AppLayout>
          <GlobalLoader />
          <ConfirmationDialog />
        </ThemeProvider>
      </body>
    </html>
  )
}

