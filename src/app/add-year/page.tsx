'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { addYear } from '@/features/income/actions/addYear'
import { useYearsQueryKey } from '@/features/income/hooks/useYears'
import { addYearFormModel } from '@/features/income/models/addYearFormModel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export default function Page() {
  const router = useRouter()
  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(addYearFormModel),
    defaultValues: { year: '' },
  })

  const onSubmit = form.handleSubmit(async ({ year }) => {
    const response = await addYear(year)

    if (response?.data?.success) {
      queryClient.invalidateQueries({ queryKey: useYearsQueryKey })
      router.push(`/${year}`)
      return
    }

    form.setError('year', {
      type: 'manual',
      message: response?.errors?.[0],
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className='grid h-full place-content-center'>
        <FormField
          control={form.control}
          name='year'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                введіть рік, за який ви хочете внести дані
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='mt-8' type='submit'>
          добавити
        </Button>
      </form>
    </Form>
  )
}
