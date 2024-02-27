'use client'

import { Form } from '@/components/ui/form'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IncomeCell } from '@/features/income/components/IncomeCell'
import { useUpdateIncome } from '@/features/income/hooks/useUpdateIncome'
import { useUser } from '@/features/income/hooks/useUser'
import { getMonthNameByIndex } from '@/utils/getMonthNameByIndex'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { RotatingLines } from 'react-loader-spinner'

export default function Home() {
  const { data, isLoading } = useUser()
  const { mutate } = useUpdateIncome()
  const router = useRouter()

  if (isLoading) {
    return (
      <div className='grid h-full place-content-center'>
        <RotatingLines
          visible={true}
          width='96'
          strokeWidth='5'
          animationDuration='0.75'
          ariaLabel='rotating-lines-loading'
        />
      </div>
    )
  }

  if (!data) {
    router.replace('/error')
    return null
  }

  const { income, taxRate } = data

  const incomeByQuarter = income.reduce<number[][][]>(
    (acc, monthIncome, index) => {
      const quarter = Math.floor(index / 3)
      if (!acc[quarter]) acc[quarter] = []
      acc[quarter].push(monthIncome)
      return acc
    },
    [],
  )

  return (
    <main className='flex h-full flex-col'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>місяць</TableHead>
            <TableHead>доход</TableHead>
            <TableHead></TableHead>
            <TableHead>єп</TableHead>
            <TableHead></TableHead>
            <TableHead className='text-right'>єсв</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomeByQuarter?.map((quarterIncome, quarterIndex) => (
            <Fragment key={quarterIndex}>
              {quarterIncome.map((monthIncome, monthIndex) => (
                <TableRow key={quarterIndex + monthIndex}>
                  <TableHead>
                    {getMonthNameByIndex(quarterIndex * 3 + monthIndex)}
                  </TableHead>

                  <IncomeCell
                    monthIncome={monthIncome}
                    monthIndex={quarterIndex * 3 + monthIndex}
                    taxRate={taxRate}
                    onIncomeChange={mutate}
                  />
                  {
                    <TableCell className='font-medium'>
                      {/* {index === 2
                        ? quarterIncome.reduce((acc, i) => acc + i, 0)
                        : null} */}
                    </TableCell>
                  }
                  <TableCell>{/* {monthIncome * taxRate} */}</TableCell>
                  <TableCell>
                    {' '}
                    {/* {index === 2
                      ? quarterIncome.reduce((acc, i) => acc + i * taxRate, 0)
                      : null} */}
                  </TableCell>
                  <TableCell className='text-right'>esv</TableCell>
                </TableRow>
              ))}
              <TableRow className='border-b-2 border-black'>
                <TableCell></TableCell>
                <TableCell className='text-right'></TableCell>
                {/* <TableCell colSpan={5}></TableCell> */}
                <TableCell colSpan={6} className='text-right'></TableCell>
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>
    </main>
  )
}
