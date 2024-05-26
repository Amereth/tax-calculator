import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='ua'>
      <body className={cn(inter.className, 'flex h-screen flex-col')}>
        <main className='grid h-full place-content-center'>{children}</main>
      </body>
    </html>
  )
}
