import { GetResponse } from '@/app/api/income/route'
import { useQuery } from '@tanstack/react-query'

export const useUserQueryKey = ['/api/income'] as const

export const useIncome = () =>
  useQuery<GetResponse, { errors: string[] }>({
    queryKey: useUserQueryKey,
  })
