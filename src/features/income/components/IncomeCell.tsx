'use client'

import { UserSchema } from '@/collections/users'
import { getMonthNameByIndex } from '@/utils/getMonthNameByIndex'
import { TrashIcon, PlusIcon } from 'lucide-react'
import { useState } from 'react'
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
  taxRate: UserSchema['taxRate']
  onIncomeChange: (arg: {
    monthIndex: number
    recordIndex: number
    value: number
  }) => void
}

export const IncomeCell = ({
  monthIncome,
  monthIndex,
  taxRate,
  onIncomeChange,
}: IncomeCellProps) => {
  const [newAdded, setNewAdded] = useState(false)
  console.log('newAdded:', newAdded)
  const totalIncome = monthIncome.reduce((acc, i) => acc + i, 0)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <td>
          <Button variant='outline'>{totalIncome}</Button>
        </td>
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

            {newAdded && (
              <div className='flex items-center gap-1'>
                <Button
                  size='icon'
                  className='h-8 w-8 shrink-0'
                  variant='outline'
                >
                  <TrashIcon size={16} />
                </Button>

                <ControlledInput
                  value={0}
                  onSubmit={(value) =>
                    onIncomeChange({
                      monthIndex,
                      recordIndex: monthIncome.length + 1,
                      value,
                    })
                  }
                />
              </div>
            )}
          </div>
          <Button size='icon' onChange={() => setNewAdded((v) => !v)}>
            <PlusIcon />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
