import { DbCollection } from '@/classes/DbCollection'
import { createEsvBoilerplate } from '@/utils/createEsvBoilerplate'
import { isNumeric } from 'validator'
import { z } from 'zod'

export const name = 'esv'

const schema = z.record(
  z.string().length(4).refine(isNumeric),
  z.array(z.number()).length(12),
)

export type EsvSchema = z.infer<typeof schema>

const createUser = (year: string): EsvSchema => ({
  [year]: createEsvBoilerplate(),
})

export const collection = new DbCollection<EsvSchema, typeof createUser>(
  name,
  schema,
  createUser,
)
