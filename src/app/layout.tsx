import { Header } from '@/components/Header'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'простий калькулятор податків',
  description: 'зроблений для себе',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn(inter.className, 'flex h-screen flex-col')}>
        <Header />
        <Toaster richColors />

        <main className='grow overflow-auto px-4'>{children}</main>
      </body>
    </html>
  )
}
