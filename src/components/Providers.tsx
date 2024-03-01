'use client'

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useState } from 'react'

export function Providers({ children }: PropsWithChildren) {
  const router = useRouter()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnMount: false,
            staleTime: 1000 * 60 * 5,
            queryFn: async ({ queryKey }) => {
              const route = queryKey[0] as string
              const response = await fetch(route)

              const data = await response.json()

              if (response.ok) return data

              throw new Error(data.error)
            },
          },
        },
        queryCache: new QueryCache({
          onError: (error) => {
            if (error.message === 'unathorised') {
              router.push('/login')
            }
          },
        }),
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
