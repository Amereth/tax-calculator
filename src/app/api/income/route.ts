import { collections } from '@/collections'
import { EsvSchema } from '@/collections/esv'
import { UserSchema } from '@/collections/users'
import { env } from '@/lib/env'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { WithId } from 'mongodb'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export type GetResponse = WithId<UserSchema> & { esv: EsvSchema }

export const GET = async (): Promise<
  NextResponse<GetResponse | { error: string }>
> => {
  try {
    const jwt = cookies().get('jwt')
    if (!jwt) {
      return NextResponse.json({ error: 'unathorised' }, { status: 401 })
    }

    const decoded = jsonwebtoken.verify(jwt.value, env.JWT_SECRET)
    const email = (decoded as JwtPayload).email

    const data = await Promise.all([
      collections.users.db.findOne({ email }),
      collections.esv.db.find().toArray(),
    ])

    if (!data) {
      cookies().delete('jwt')
      throw new Error('user not found')
    }

    const [userData, esv] = data

    if (!userData) {
      cookies().delete('jwt')
      throw new Error('user not found')
    }

    if (!esv) {
      throw new Error('esv not found')
    }

    return NextResponse.json({ ...userData, esv: esv[0] }, { status: 200 })
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
