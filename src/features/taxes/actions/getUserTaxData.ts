'use server'

import { ActionResponse } from '@/app/types/actions'
import { collections } from '@/collections'
import { env } from '@/lib/env'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const getUserTaxData = async (): Promise<ActionResponse> => {
  const jwt = cookies().get('jwt')

  if (!jwt) return redirect('/login')

  try {
    const decoded = jsonwebtoken.verify(jwt.value, env.JWT_SECRET)

    const email = (decoded as JwtPayload).email

    const userData = await collections.users.db.findOne({ email })

    if (!userData) return redirect('/login')

    return { data: userData }
  } catch (error) {
    return redirect('/login')
  }
}
