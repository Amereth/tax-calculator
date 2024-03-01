import { collections } from '@/collections'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const getUserData = async (email: string) => {
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
}
