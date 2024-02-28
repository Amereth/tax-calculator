'use client'

export default function Error({
  error,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return <div className='grid h-full place-content-center'>{error.message}</div>
}
