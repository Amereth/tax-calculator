import { UserSchema } from '@/collections/users'

export const getIncomeByQuarter = (
  income: UserSchema['income'][number],
): number[][][] =>
  income.reduce<number[][][]>((acc, monthIncome, index) => {
    const quarter = Math.floor(index / 3)

    if (!acc[quarter]) acc[quarter] = []

    acc[quarter].push(monthIncome)

    return acc
  }, [])
