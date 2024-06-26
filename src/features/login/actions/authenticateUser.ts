'use server'

import { ActionResponse } from '@/app/types/actions'
import { collections } from '@/collections'
import { env } from '@/lib/env'
import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { RedirectType, redirect } from 'next/navigation'

const EXPIRATION_TIME = 1000 * 60 * 60 * 24 // 24 hours

export const authenticateUser = async (
  key: string,
): Promise<ActionResponse<undefined>> => {
  const dbResponse = await collections.verificationCodes.db.findOne({ key })

  if (!dbResponse) redirect('/error?message=tryAgain')

  if (new Date(dbResponse.expiresAt) < new Date()) {
    redirect('/error?message=timeout')
  }

  const existingDoc = await collections.users.db.findOne({
    email: dbResponse.email,
  })

  if (!existingDoc) {
    collections.users.db.insertOne(
      collections.users.createOne(dbResponse.email),
    )
  }

  const jwt = jsonwebtoken.sign({ email: dbResponse.email }, env.JWT_SECRET, {
    expiresIn: '1d',
  })

  cookies().set({
    name: 'jwt',
    value: jwt,
    expires: new Date(Date.now() + EXPIRATION_TIME),
    httpOnly: true,
  })

  console.log('before redirect')

  redirect('/2024', RedirectType.replace)
}
