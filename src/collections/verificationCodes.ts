import { DbCollection } from '@/classes/DbCollection'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  key: z.string().length(16),
  expiresAt: z.string().datetime(),
})

export type VerificationCodeSchema = z.infer<typeof schema>

export const verificationCodesCollection =
  new DbCollection<VerificationCodeSchema>('verificationCodes', schema)
