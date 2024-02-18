'use server'

import { collections } from '@/collections'
import { env } from '@/lib/env'
import crypto from 'crypto'
import { Resend } from 'resend'
import { ZodError } from 'zod'
import { loginFormModel } from '../models/loginFormModel'

type Response =
  | {
      data: null
      error: string[]
    }
  | {
      data: { id: string }
      error: null
    }

const EXPIRATION_TIME = 1000 * 60 * 60 * 24 // 24 hours

export const sendConfirmationEmail = async (
  email: string,
): Promise<Response> => {
  try {
    loginFormModel.parse({ email })

    const resend = new Resend(env.RESEND_API_KEY)

    const key = crypto.randomBytes(16).toString('hex')

    await collections.verificationCodes.db.insertOne({
      email,
      key,
      expiresAt: new Date(Date.now() + EXPIRATION_TIME).toISOString(),
    })

    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Підтердження входу',
      html: `<div><p>Перейдіть по лінку щоб залогинитись</p><div><a href="http://localhost:3000/login/confirm?code=${key}">написніть сюди</a></div></div>`,
    })

    if (response.error) {
      throw new Error(response.error.message)
    }

    if (!response.data?.id) {
      throw new Error('Unknown error')
    }

    return { data: { id: response.data.id }, error: null }
  } catch (error) {
    if (error instanceof ZodError) {
      return { data: null, error: error.issues.map((i) => i.message) }
    }

    if (error instanceof Error) {
      return { data: null, error: [error.message] }
    }

    return { data: null, error: ['Unknown error'] }
  }
}
