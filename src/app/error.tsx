'use client'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <div className='center flex'>{error.message}</div>
}
