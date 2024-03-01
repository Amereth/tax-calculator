import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function Page() {
  const date = new Date()
  const year = date.getFullYear()

  redirect(`/${year}`)
}
