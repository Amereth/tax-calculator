import { isNumeric } from 'validator'
import { z } from 'zod'

export const addYearFormModel = z.object({
  year: z
    .string()
    .length(4, 'рік має бути 4 символи')
    .refine(isNumeric, 'рік має бути числом'),
})
