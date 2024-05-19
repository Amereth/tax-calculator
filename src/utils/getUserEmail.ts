import { env } from '@/lib/env'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const getUserEmail = (): string => {
  const jwt = cookies().get('jwt')

  if (!jwt) {
    throw new Error('unathorised')
  }

  const decoded = jsonwebtoken.verify(jwt.value, env.JWT_SECRET)
  const email = (decoded as JwtPayload).email

  return email
}
