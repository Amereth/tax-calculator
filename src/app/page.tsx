'use client'

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
import { arraySum } from '@/utils/arraySum'
import { getMonthNameByIndex } from '@/utils/getMonthNameByIndex'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'
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
            <TableHead></TableHead>
            <TableHead>дохід</TableHead>
            <TableHead></TableHead>
            <TableHead>єп</TableHead>
            <TableHead></TableHead>
            <TableHead className='text-right'>єсв</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incomeByQuarter?.map((quarterIncome, quarterIndex) => {
            const quarterTotal = arraySum(quarterIncome.map(arraySum))
            return (
              <Fragment key={quarterIndex}>
                {quarterIncome.map((monthIncome, monthIndex) => (
                  <TableRow key={quarterIndex + monthIndex}>
                    <TableHead>
                      {getMonthNameByIndex(quarterIndex * 3 + monthIndex)}
                    </TableHead>

                    <IncomeCell
                      monthIncome={monthIncome}
                      monthIndex={quarterIndex * 3 + monthIndex}
                      onIncomeChange={mutate}
                    />

                    <TableCell></TableCell>
                    <TableCell>{arraySum(monthIncome) * taxRate}</TableCell>

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
                  <TableCell className='font-medium'>{quarterTotal}</TableCell>
                  <TableCell></TableCell>

                  <TableCell>{quarterTotal * taxRate}</TableCell>

                  <TableCell colSpan={6} className='text-right'></TableCell>
                </TableRow>
              </Fragment>
            )
          })}
        </TableBody>
      </Table>
    </main>
  )
}
