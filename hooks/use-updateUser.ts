'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateUser } from '@/lib/api'
import { User } from '@/types/user'

export function useUpdateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, data }: { userId: string; data: Partial<User> }) =>
      updateUser(userId, data),
    onSuccess: (updatedUser, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({
        queryKey: ['users', variables.userId],
      })

      queryClient.setQueryData(
        ['users', variables.userId],
        (old: User | undefined) =>
          old ? { ...old, ...variables.data } : undefined
      )
    },
  })
}
