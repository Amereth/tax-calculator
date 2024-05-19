'use server'

import { ActionResponse } from '@/app/types/actions'
import { collections } from '@/collections'
import { env } from '@/lib/env'
import { createYearIncomeBoilerplate } from '@/utils/createYearIncomeBoilerplate'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { addYearFormModel } from '../models/addYearFormModel'

export const addYear = async (
  body: string,
): Promise<ActionResponse<{ success: true }>> => {
  try {
    const { year } = addYearFormModel.parse({ year: body })

    const jwt = cookies().get('jwt')
    if (!jwt) throw new Error('unathorised')

    const decoded = jsonwebtoken.verify(jwt.value, env.JWT_SECRET)

    const email: string = (decoded as JwtPayload).email

    await collections.users.db.updateOne(
      { email },
      {
        $set: {
          [`income.${year}`]: createYearIncomeBoilerplate(),
        },
      },
    )

    return { data: { success: true } }
  } catch (error) {
    if (error instanceof Error) {
      return { errors: [error.message] }
    }

    return { errors: ['Unknown error'] }
  }
}
