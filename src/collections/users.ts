import { DbCollection } from '@/classes/DbCollection'
import { isNumeric } from 'validator'
import { z } from 'zod'

const DEFAULT_TAX_RATE = 0.05

export const name = 'users'

const schema = z.object({
  email: z.string().email(),
  income: z.record(
    z.string().length(4).refine(isNumeric),
    z.array(z.array(z.number())).length(12),
  ),
  taxRate: z.number(),
})

export type UserSchema = z.infer<typeof schema>

const createUser = (email: string): UserSchema => ({
  email,
  income: {
    2023: Array(12).fill([0]),
  },
  taxRate: DEFAULT_TAX_RATE,
})

export const collection = new DbCollection<UserSchema, typeof createUser>(
  'users',
  schema,
  createUser,
)
