import { useAtom } from 'jotai/react'
import { atomWithStorage } from 'jotai/utils'
import { useEffect } from 'react'

const userAtom = atomWithStorage<User | null>('user', null)

export type User = {
  email: string
  expiresAt: string
}

export const useUser = () => {
  const state = useAtom(userAtom)

  const [user] = state

  return state
}
