import { useQuery } from '@tanstack/react-query'

export const useYearsQueryKey = ['/api/income/years'] as const

export const useYears = () =>
  useQuery<{ years: string[] }, { errors: string[] }>({
    queryKey: useYearsQueryKey,
  })
