import { redirect } from 'next/navigation'

export default function Page() {
  const date = new Date()
  const year = date.getFullYear()

  redirect(`/${year}`)
}
