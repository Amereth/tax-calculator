import { NextResponse } from 'next/server'

export const apiErrorHandler = (error: unknown) => {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  if (error === 'unathorised') {
    return NextResponse.json({ error }, { status: 401 })
  }

  return NextResponse.json({ error: 'unknown error' }, { status: 500 })
}
