'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { authenticateUser } from '@/features/login/actions/authenticateUser'
import { zodResolver } from '@hookform/resolvers/zod'
import { Check } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const schema = z.object({
  code: z.string().length(32),
})

type FormValues = z.infer<typeof schema>

export default function ConfirmPage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { code: '' },
  })

  const onSubmit = form.handleSubmit(async ({ code }) => {
    console.log('onSubmit ~ code:', code)
    const response = await authenticateUser(code)
    console.log('onSubmit ~ response:', response)

    if (response?.errors) {
      console.log(response.errors)
    }

    // redirect('/2024')
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='flex gap-4'>
        <div className='text-center'>
          листа відправлено
          <br /> перевірте почтову скриньку
        </div>

        <FormField
          control={form.control}
          name='code'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type='submit' size='icon'>
          <Check />
        </Button>
      </form>
    </Form>
  )
}
