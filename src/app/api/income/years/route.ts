import { collections } from '@/collections'
import { env } from '@/lib/env'
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const GET = async (): Promise<
  NextResponse<{ years: string[] } | { error: string }>
> => {
  try {
    const jwt = cookies().get('jwt')
    if (!jwt) {
      return NextResponse.json({ error: 'unathorised' }, { status: 401 })
    }

    const decoded = jsonwebtoken.verify(jwt.value, env.JWT_SECRET)
    const email = (decoded as JwtPayload).email

    const userDoc = await collections.users.db.findOne({ email })

    if (!userDoc) throw new Error('User not found')

    const years = Object.keys(userDoc.income)

    return NextResponse.json({ years }, { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ error: 'unknown error' }, { status: 500 })
  }
}
