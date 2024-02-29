import { UserSchema } from '@/collections/users'
import { arraySum } from '@/utils/arraySum'
import { getIncomeByQuarter } from './incomeByQuarter'

export const getIncomeForPeriod = (
  income: UserSchema['income'][number],
  quarterIndex: number,
): number => {
  const incomeByQuarter = getIncomeByQuarter(income)

  const incomeBySelectedQuarter = incomeByQuarter.slice(0, quarterIndex + 1)

  const totalIncomeByQuarter = arraySum(
    incomeBySelectedQuarter.map((q) => q.flat()).flat(),
  )

  return totalIncomeByQuarter
}
