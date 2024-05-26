import { env } from '@/lib/env'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const getUserEmail = () => {
  console.log(cookies().get('jwt'))
  const jwt = cookies().get('jwt')

  if (!jwt) {
    console.log('No JWT cookie found')
    redirect('/login')
  }

  const decoded = jsonwebtoken.verify(jwt.value, env.JWT_SECRET)
  const email = (decoded as JwtPayload).email

  return email
}
