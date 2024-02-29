'use client'

import { Button } from '@/components/ui/button'
import { addYear } from '@/features/income/actions/addYear'
import { useUserQueryKey } from '@/features/income/hooks/useIncome'
import { useQueryClient } from '@tanstack/react-query'
import { Loader2Icon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function NotFound() {
  const queryClient = useQueryClient()
  const [isLoading, setLoading] = useState(false)
  const pathname = usePathname()

  const year = pathname.split('/')[1]

  const onClick = async () => {
    setLoading(true)
    const response = await addYear(year)
    setLoading(false)

    if (!response?.data?.success) return

    setLoading(true)
    await queryClient.refetchQueries({ queryKey: useUserQueryKey })
    window.location.reload()
  }

  return (
    <main className='grid h-full place-content-center'>
      <div>дохід за цей рік відсутній</div>

      <Button className='mt-4' onClick={onClick}>
        {isLoading ? (
          <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />
        ) : (
          'добавити рік'
        )}
      </Button>
    </main>
  )
}
