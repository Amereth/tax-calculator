import { UserSchema } from '@/collections/users'
import {
  DefaultError,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { WithId } from 'mongodb'
import { useUserQueryKey } from './useIncome'

export type Payload = {
  year: string
  monthIndex: number
  recordIndex: number
  value: number
}

export const useUpdateIncome = () => {
  const queryClient = useQueryClient()

  return useMutation<WithId<UserSchema>, DefaultError, Payload>({
    mutationFn: async (body) => {
      const response = await fetch('/api/income', {
        method: 'POST',
        body: JSON.stringify(body),
      })
      const data = await response.json()
      if (response.ok) return data
      throw new Error(data.error)
    },

    onSuccess(data) {
      queryClient.setQueryData(useUserQueryKey, data)
    },
  })
}
