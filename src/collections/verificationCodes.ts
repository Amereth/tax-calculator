import { DbCollection } from '@/classes/DbCollection'
import { z } from 'zod'

export const name = 'verificationCodes'

const schema = z.object({
  email: z.string().email(),
  key: z.string().length(16),
  expiresAt: z.string().datetime(),
})

export type VerificationCodeSchema = z.infer<typeof schema>

export const collection = new DbCollection<VerificationCodeSchema>(name, schema)
