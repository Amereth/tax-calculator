import { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return <main className='grid h-full place-content-center'>{children}</main>
}
