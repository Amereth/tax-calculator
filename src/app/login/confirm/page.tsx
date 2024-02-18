'use client'

import { authenticateUser } from '@/features/login/actions/authenticateUser'
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { toast } from 'sonner'

export default function ConfirmPage() {
  const router = useRouter()
  const verificationCode = useSearchParams().get('code')

  useEffect(() => {
    if (!verificationCode) {
      toast.error('Код підтвердження не знайдено', {
        id: 'no-verification-code',
      })
      router.push('/login')
      return
    }

    const validate = async () => {
      const response = await authenticateUser(verificationCode)

      if (response?.errors) {
        response.errors.forEach((e) => toast.error(e, { id: e }))
        router.push('/login')
      }
    }

    validate()
  }, [verificationCode, router])

  return (
    <RotatingLines
      visible={true}
      width='96'
      strokeWidth='5'
      animationDuration='0.75'
      ariaLabel='rotating-lines-loading'
    />
  )
}
