'use server'

import { collections } from '@/collections'
import { env } from '@/lib/env'
import jsonwebtoken from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { RedirectType, redirect } from 'next/navigation'
import { ActionResponse } from './types'

const EXPIRATION_TIME = 1000 * 60 * 60 * 24 // 24 hours

export const authenticateUser = async (
  key: string,
): Promise<ActionResponse> => {
  const dbResponse = await collections.verificationCodes.db.findOne({ key })

  if (!dbResponse) return { errors: ['неправильний код'] }

  if (new Date(dbResponse.expiresAt) < new Date()) {
    return { errors: ['час вийшов'] }
  }

  const existingDoc = await collections.users.db.findOne({
    email: dbResponse.email,
  })

  if (!existingDoc) {
    collections.users.db.insertOne({
      email: dbResponse.email,
    })
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

  redirect('/', RedirectType.replace)
}
