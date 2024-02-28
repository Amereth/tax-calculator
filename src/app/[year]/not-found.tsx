import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <main className='grid h-full place-content-center'>
      <div>дохід за цей рік відсутній</div>

      <Button className='mt-4'>добавити рік</Button>
    </main>
  )
}
