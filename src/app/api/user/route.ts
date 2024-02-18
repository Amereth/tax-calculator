import { env } from '@/lib/env'
import jsonwebtoken from 'jsonwebtoken'
import { redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
  const jwt = request.cookies.get('jwt')

  if (!jwt) {
    redirect('/login')
  }

  //   jsonwebtoken.verify(jwt, env.JWT_SECRET)
}
