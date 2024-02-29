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
import { useIncome } from '@/features/income/hooks/useIncome'
import { useUpdateIncome } from '@/features/income/hooks/useUpdateIncome'
import { getIncomeByQuarter } from '@/features/income/utils/incomeByQuarter'
import { getIncomeForPeriod } from '@/features/income/utils/incomeForPeriod'
import { arraySum } from '@/utils/arraySum'
import { formatCurrency } from '@/utils/formatCurrency'
import { getMonthNameByIndex } from '@/utils/getMonthNameByIndex'
import { notFound, useRouter } from 'next/navigation'
import { Fragment } from 'react'
import { RotatingLines } from 'react-loader-spinner'

type Props = {
  params: { year: string }
}

export default function Home({ params: { year } }: Props) {
  const { data, isLoading } = useIncome()
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

  if (!income[year]) {
    notFound()
  }

  const incomeByQuarter = getIncomeByQuarter(income[year])

  return (
    <main className='flex h-full flex-col'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className='w-60' />
            <TableHead className='w-40 text-center'>дохід</TableHead>
            <TableHead className='w-40 text-center' />
            <TableHead className='w-40 text-center'>єп</TableHead>
            <TableHead className='w-40 text-center' />
            <TableHead className='w-20 text-right'>єсв</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {incomeByQuarter?.map((quarterIncome, quarterIndex) => {
            const quarterTotal = arraySum(quarterIncome.map(arraySum))

            return (
              <Fragment key={quarterIndex}>
                {quarterIncome.map((monthIncome, monthIndex) => (
                  <TableRow key={quarterIndex + monthIndex}>
                    <TableCell>
                      {getMonthNameByIndex(quarterIndex * 3 + monthIndex)}
                    </TableCell>

                    <IncomeCell
                      monthIncome={monthIncome}
                      monthIndex={quarterIndex * 3 + monthIndex}
                      onIncomeChange={(v) => mutate({ year, ...v })}
                    />

                    <TableCell />

                    <TableCell className='text-center'>
                      {formatCurrency(arraySum(monthIncome) * taxRate)}
                    </TableCell>

                    <TableCell />

                    <TableCell className='text-right'>esv</TableCell>
                  </TableRow>
                ))}

                <TableRow className='border-b-2 border-black text-center'>
                  <TableCell />

                  <TableCell className='font-medium'>
                    {formatCurrency(quarterTotal)}
                  </TableCell>

                  <TableCell>
                    {formatCurrency(
                      getIncomeForPeriod(income[year], quarterIndex),
                    )}
                  </TableCell>

                  <TableCell>
                    {formatCurrency(quarterTotal * taxRate)}
                  </TableCell>

                  <TableCell colSpan={6} className='text-right' />
                </TableRow>
              </Fragment>
            )
          })}
        </TableBody>
      </Table>
    </main>
  )
}
