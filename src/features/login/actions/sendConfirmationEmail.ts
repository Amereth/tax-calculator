'use server'

import { ActionResponse } from '@/app/types/actions'
import { collections } from '@/collections'
import { env } from '@/lib/env'
import { Resend } from 'resend'
import { ZodError } from 'zod'
import { loginFormModel } from '../models/loginFormModel'

export const sendConfirmationEmail = async (
  email: string,
): Promise<ActionResponse<{ id: string }>> => {
  try {
    loginFormModel.parse({ email })

    const resend = new Resend(env.RESEND_API_KEY)

    const verificationCode = collections.verificationCodes.createOne(email)

    await collections.verificationCodes.db.insertOne(verificationCode)

    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Підтердження входу',
      html: `<div><p>Перейдіть по лінку щоб залогинитись</p><div>${verificationCode.key}</div></div>`,
    })

    if (response.error) {
      throw new Error(response.error.message)
    }

    if (!response.data?.id) {
      throw new Error('Unknown error')
    }

    return { data: { id: response.data.id } }
  } catch (error) {
    if (error instanceof ZodError) {
      return { errors: error.issues.map((i) => i.message) }
    }

    if (error instanceof Error) {
      return { errors: [error.message] }
    }

    return { errors: ['Unknown error'] }
  }
}
