import { z } from 'zod'

const schema = z.object({
  MONGO_URI: z.string(),
  RESEND_API_KEY: z.string(),
  JWT_SECRET: z.string(),
  API_URL: z.string(),
})

export const env = schema.parse(process.env)
