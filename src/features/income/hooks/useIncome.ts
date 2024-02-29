import { UserSchema } from '@/collections/users'
import { useQuery } from '@tanstack/react-query'
import { WithId } from 'mongodb'

export const useUserQueryKey = ['/api/income'] as const

export const useIncome = () =>
  useQuery<WithId<UserSchema>, { errors: string[] }>({
    queryKey: useUserQueryKey,
  })
