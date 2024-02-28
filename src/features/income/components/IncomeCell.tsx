'use client'

import { UserSchema } from '@/collections/users'
import { TableCell } from '@/components/ui/table'
import { getMonthNameByIndex } from '@/utils/getMonthNameByIndex'
import { TrashIcon } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../../components/ui/popover'
import { ControlledInput } from './ControlledInput'

type IncomeCellProps = {
  monthIncome: UserSchema['income'][number]
  monthIndex: number
  onIncomeChange: (arg: {
    monthIndex: number
    recordIndex: number
    value: number
  }) => void
}

export const IncomeCell = ({
  monthIncome,
  monthIndex,
  onIncomeChange,
}: IncomeCellProps) => {
  const totalIncome = monthIncome.reduce((acc, i) => acc + i, 0)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TableCell className='w-full'>
          <Button variant='outline' className='w-full'>
            {totalIncome}
          </Button>
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
                >
                  <TrashIcon size={16} />
                </Button>

                <ControlledInput
                  value={income}
                  onSubmit={(value) =>
                    onIncomeChange({
                      monthIndex,
                      recordIndex,
                      value,
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
