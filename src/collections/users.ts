import { DbCollection } from '@/classes/DbCollection'
import { z } from 'zod'

export const name = 'users'

const schema = z.object({
  email: z.string().email(),
  income: z.array(z.number()).length(12),
  taxRate: z.number(),
})

export type UserSchema = z.infer<typeof schema>

export const collection = new DbCollection<UserSchema>('users', schema)
