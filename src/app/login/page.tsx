'use client'

import { Button } from '@/components/ui/button'
import {
  FormField,
  FormItem,
  FormControl,
  FormDescription,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { sendConfirmationEmail } from '../../features/login/actions/sendConfirmationEmail'
import {
  LoginFormModel,
  loginFormModel,
} from '../../features/login/models/loginFormModel'

export default function Login() {
  const form = useForm<LoginFormModel>({
    resolver: zodResolver(loginFormModel),
    defaultValues: { email: '' },
  })

  const onSubmit = form.handleSubmit(async ({ email }) => {
    const response = await sendConfirmationEmail(email)
    console.log(response)
  })

  return (
    <FormProvider {...form}>
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
          <Button type='submit' className='mt-8'>
            отримати листа
          </Button>
        </form>
      </div>
    </FormProvider>
  )
}
