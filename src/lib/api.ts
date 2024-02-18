import { env } from './env'

export const api = (path: string): string => `${env.API_URL}/api/${path}`
