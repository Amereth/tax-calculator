'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { redirect } from 'next/navigation'
import { PropsWithChildren, useState } from 'react'

export function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            throwOnError: true,
            refetchOnMount: false,
            staleTime: 1000 * 60 * 5,
            queryFn: async ({ queryKey }) => {
              const route = queryKey[0] as string
              const response = await fetch(route)
              const data = await response.json()

              if (response.ok) return data

              if (response.status === 401) {
                return redirect('/login')
              }
              throw new Error(data.error)
            },
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
