'use client'

import { UserSchema } from '@/collections/users'
import { TableCell } from '@/components/ui/table'
import { formatCurrency } from '@/utils/formatCurrency'
import { getMonthNameByIndex } from '@/utils/getMonthNameByIndex'
import { useMutation } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '../../../components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover'
import { updateIncome } from '../actions/updateIncome'
import { ControlledInput } from './ControlledInput'

type IncomeCellProps = {
  year: string
  monthIncome: UserSchema['income'][number][number]
  monthIndex: number
}

export const IncomeCell = ({
  year,
  monthIncome,
  monthIndex,
}: IncomeCellProps) => {
  const router = useRouter()

  const totalIncome = formatCurrency(monthIncome.reduce((acc, i) => acc + i, 0))

  const { mutateAsync } = useMutation({
    mutationFn: updateIncome,
  })

  const onUpdateEntry = async (data: {
    recordIndex: number
    value: number
  }) => {
    await mutateAsync({ year, monthIndex, ...data })
    router.refresh()
  }

  const onDeleteEntry = async (data: { recordIndex: number }) => {
    await mutateAsync({ year, monthIndex, value: 0, ...data })
    router.refresh()
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TableCell className='w-full'>
          <Button className='h-6 w-full '>{totalIncome}</Button>
        </TableCell>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-2 align-top'>
            <h4 className='text-center font-medium leading-none'>
              дохід за {getMonthNameByIndex(monthIndex)}
            </h4>
          </div>

          <div className='grid gap-2'>
            {monthIncome.map((income, recordIndex) => (
              <div key={recordIndex} className='flex items-center gap-1'>
                <Button
                  size='icon'
                  className='h-8 w-8 shrink-0'
                  variant='outline'
                  onClick={() => onDeleteEntry({ recordIndex })}
                >
                  <TrashIcon size={16} />
                </Button>

                <ControlledInput
                  value={income}
                  onSubmit={(value) => onUpdateEntry({ recordIndex, value })}
                />
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
