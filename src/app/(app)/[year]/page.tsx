import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { IncomeCell } from '@/features/income/components/IncomeCell'
import { getUserData } from '@/features/income/queries/getUserData'
import { getIncomeByQuarter } from '@/features/income/utils/incomeByQuarter'
import { getIncomeForPeriod } from '@/features/income/utils/incomeForPeriod'
import { arraySum } from '@/utils/arraySum'
import { formatCurrency } from '@/utils/formatCurrency'
import { getMonthNameByIndex } from '@/utils/getMonthNameByIndex'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'

type Props = {
  params: { year: string }
}

export default async function Home({ params: { year } }: Props) {
  const { income, esv, taxRate } = await getUserData()

  if (!income[year]) notFound()

  const incomeByQuarter = getIncomeByQuarter(income[year])

  return (
    <div className='flex h-full flex-col'>
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
                      year={year}
                      monthIncome={monthIncome}
                      monthIndex={quarterIndex * 3 + monthIndex}
                    />

                    <TableCell />

                    <TableCell className='text-center'>
                      {formatCurrency(arraySum(monthIncome) * taxRate)}
                    </TableCell>

                    <TableCell />

                    <TableCell className='text-right'>
                      {formatCurrency(esv[year][quarterIndex * 3 + monthIndex])}
                    </TableCell>
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

                  <TableCell>
                    {formatCurrency(
                      getIncomeForPeriod(income[year], quarterIndex) * taxRate,
                    )}
                  </TableCell>

                  <TableCell colSpan={6} className='text-right'>
                    {formatCurrency(
                      arraySum(
                        esv[year].slice(quarterIndex * 3, quarterIndex * 3 + 3),
                      ),
                    )}
                  </TableCell>
                </TableRow>
              </Fragment>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
