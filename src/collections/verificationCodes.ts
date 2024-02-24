import { DbCollection } from '@/classes/DbCollection'
import crypto from 'crypto'
import { z } from 'zod'

const EXPIRATION_TIME = 1000 * 60 * 60 * 24 // 24 hours

export const name = 'verificationCodes'

const schema = z.object({
  email: z.string().email(),
  key: z.string().length(16),
  expiresAt: z.string().datetime(),
})

export type VerificationCodeSchema = z.infer<typeof schema>

const createVerificationCode = (
  email: VerificationCodeSchema['email'],
): VerificationCodeSchema => ({
  email,
  expiresAt: new Date(Date.now() + EXPIRATION_TIME).toISOString(),
  key: crypto.randomBytes(16).toString('hex'),
})

export const collection = new DbCollection<
  VerificationCodeSchema,
  typeof createVerificationCode
>(name, schema, createVerificationCode)
