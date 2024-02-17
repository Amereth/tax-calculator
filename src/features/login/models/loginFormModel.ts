import { z } from 'zod'

export const loginFormModel = z.object({
  email: z.string().trim().email(),
})

export type LoginFormModel = z.infer<typeof loginFormModel>
