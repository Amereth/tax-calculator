'use server'

import { Resend, ErrorResponse } from 'resend'
import { ZodError } from 'zod'
import { loginFormModel } from '../models/loginFormModel'

type Response =
  | {
      data: null
      error: string[]
    }
  | {
      data: string
      error: null
    }

export const sendConfirmationEmail = async (
  email: string,
): Promise<Response> => {
  try {
    loginFormModel.parse({ email })

    const resend = new Resend(process.env.RESEND_API_KEY)

    const response = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Login confirmation',
      html: '<p>Congrats on sending your <strong>first email</strong>!</p>',
    })

    if (response.error) {
      throw new Error(response.error.message)
    }

    if (!response.data?.id) {
      throw new Error('Unknown error')
    }

    return { data: response.data.id, error: null }
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
