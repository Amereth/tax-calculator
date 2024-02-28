import { collections } from '@/collections'
import { UserSchema } from '@/collections/users'
import { env } from '@/lib/env'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { WithId } from 'mongodb'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (): Promise<
  NextResponse<WithId<UserSchema> | { error: string }>
> => {
  try {
    const jwt = cookies().get('jwt')
    if (!jwt) {
      return NextResponse.json({ error: 'unathorised' }, { status: 401 })
    }

    const decoded = jsonwebtoken.verify(jwt.value, env.JWT_SECRET)
    const email = (decoded as JwtPayload).email

    const userData = await collections.users.db.findOne({ email })

    if (!userData) {
      cookies().delete('jwt')
      throw new Error('user not found')
    }

    return NextResponse.json(userData, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'unknown error' }, { status: 500 })
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
    const jwt = cookies().get('jwt')

    if (!jwt) {
      return NextResponse.json({ error: 'unathorised' }, { status: 401 })
    }

    const decoded = jsonwebtoken.verify(jwt.value, env.JWT_SECRET)
    const email: string = (decoded as JwtPayload).email

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
          [`${year}.income.${monthIndex}.${recordIndex}`]: value,
        },
      },
    )

    if (document.income[year][monthIndex].length - 1 === recordIndex) {
      await collections.users.db.updateOne(
        { email },
        {
          $push: {
            [`${year}.income.${monthIndex}`]: 0,
          },
        },
      )
    }

    const updatedDoc = await collections.users.db.findOne({ email })

    if (!updatedDoc) {
      cookies().delete('jwt')
      throw new Error('user not found')
    }

    return NextResponse.json(updatedDoc, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'unknown error' }, { status: 500 })
  }
}
