import { UserSchema } from '@/collections/users'

const DEFAULT_TAX_RATE = 0.05

export const createDefaultUser = (email: string): UserSchema => ({
  email,
  income: Array(12).fill(0),
  taxRate: DEFAULT_TAX_RATE,
})
