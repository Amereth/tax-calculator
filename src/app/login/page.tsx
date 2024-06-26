'use client'

import { Button } from '@/components/ui/button'
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
  Form,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2Icon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { sendConfirmationEmail } from '../../features/login/actions/sendConfirmationEmail'
import {
  LoginFormModel,
  loginFormModel,
} from '../../features/login/models/loginFormModel'

export default function Login() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // useEffect(() => {
  //   if (!window.document.cookie.includes('jwt')) {
  //     console.log(window.document.cookie)
  //     router.push('/')
  //   }
  // }, [router])

  const form = useForm<LoginFormModel>({
    resolver: zodResolver(loginFormModel),
    defaultValues: { email: '' },
  })

  const onSubmit = form.handleSubmit(async ({ email }) => {
    setIsLoading(true)
    const response = await sendConfirmationEmail(email)

    if (response?.errors) {
      toast.error(response?.errors)
      setIsLoading(false)
      return
    }

    router.push('/login/confirm')
  })

  return (
    <Form {...form}>
      <div className='flex h-full items-center justify-center'>
        <form className='flex flex-col' onSubmit={onSubmit}>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  введіть вашу електронну адресу, щоб ми могли вам відправити
                  листа
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' className='mt-8' disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2Icon className='mr-2 h-4 w-4 animate-spin' />{' '}
                відправляємо листа
              </>
            ) : (
              'отримати листа'
            )}
          </Button>
        </form>
      </div>
    </Form>
  )
}
