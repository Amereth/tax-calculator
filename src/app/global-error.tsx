'use client'

import { Button } from '@/components/ui/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang='ua'>
      <body>
        <main className='grid h-full place-content-center'>
          {error.message}

          <Button onClick={reset}>назад</Button>
        </main>
      </body>
    </html>
  )
}
