'use server'

import { ActionResponse } from '@/app/types/actions'
import { collections } from '@/collections'
import { env } from '@/lib/env'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const getListOfYears = async (): Promise<ActionResponse<string[]>> => {
  try {
    const jwt = cookies().get('jwt')

    if (!jwt) throw new Error('unathorised')

    const decoded = jsonwebtoken.verify(jwt.value, env.JWT_SECRET)
    const email: string = (decoded as JwtPayload).email

    const userDoc = await collections.users.db.findOne({ email })

    if (!userDoc) throw new Error('User not found')

    const years = Object.keys(userDoc.income)

    return { data: years }
  } catch (error) {
    if (error instanceof Error) {
      return { data: null, errors: [error.message] }
    }

    return { data: null, errors: ['Unknown error'] }
  }
}
