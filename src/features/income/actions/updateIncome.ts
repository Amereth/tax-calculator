'use server'

import { collections } from '@/collections'
import { getUserEmail } from '@/utils/getUserEmail'
import { cookies } from 'next/headers'

export type Body = {
  year: string
  monthIndex: number
  recordIndex: number
  value: number
}

export const updateIncome = async ({
  year,
  monthIndex,
  recordIndex,
  value,
}: Body) => {
  console.log({ year, monthIndex, recordIndex, value })
  try {
    const email = getUserEmail()

    const document = await collections.users.db.findOne({ email })

    if (!document) {
      cookies().delete('jwt')
      throw new Error('user not found')
    }

    if (value === 0) {
      await collections.users.db.updateOne(
        { email },
        {
          $unset: {
            [`income.${year}.${monthIndex}.${recordIndex}`]: '',
          },
        },
      )
      await collections.users.db.updateOne(
        { email },
        {
          $pull: {
            [`income.${year}.${monthIndex}`]: null,
          },
        },
      )
    } else {
      await collections.users.db.updateOne(
        { email },
        {
          $set: {
            [`income.${year}.${monthIndex}.${recordIndex}`]: value,
          },
        },
      )
    }

    if (document.income[year][monthIndex].length - 1 === recordIndex) {
      await collections.users.db.updateOne(
        { email },
        {
          $push: {
            [`income.${year}.${monthIndex}`]: 0,
          },
        },
      )
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: (error as Error).message }
  }
}
