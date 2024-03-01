import { collections } from '@/collections'
import { EsvSchema } from '@/collections/esv'
import { UserSchema } from '@/collections/users'
import { getUserData } from '@/features/income/queries/getUserData'
import { apiErrorHandler } from '@/utils/apiErrorHandler'
import { getUserEmail } from '@/utils/getUserEmail'
import { WithId } from 'mongodb'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export type GetResponse = WithId<UserSchema> & { esv: EsvSchema }

export const GET = async (): Promise<
  NextResponse<GetResponse | { error: string }>
> => {
  try {
    const email = await getUserEmail()

    return getUserData(email)
  } catch (error) {
    return apiErrorHandler(error)
  }
}

export type PostBody = {
  year: string
  monthIndex: number
  recordIndex: number
  value: number
}

export const POST = async (
  request: NextRequest,
): Promise<NextResponse<WithId<UserSchema> | { error: string }>> => {
  try {
    const email = await getUserEmail()

    const body = (await request.json()) as PostBody
    const { year, monthIndex, recordIndex, value } = body

    const document = await collections.users.db.findOne({ email })

    if (!document) {
      cookies().delete('jwt')
      throw new Error('user not found')
    }

    await collections.users.db.updateOne(
      { email },
      {
        $set: {
          [`income.${year}.${monthIndex}.${recordIndex}`]: value,
        },
      },
    )

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

    return getUserData(email)
  } catch (error) {
    return apiErrorHandler(error)
  }
}
