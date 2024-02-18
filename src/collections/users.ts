import { DbCollection } from '@/classes/DbCollection'
import { z } from 'zod'

export const name = 'users'

const schema = z.object({
  email: z.string().email(),
})

export type UserSchema = z.infer<typeof schema>

export const collection = new DbCollection<UserSchema>('users', schema)
