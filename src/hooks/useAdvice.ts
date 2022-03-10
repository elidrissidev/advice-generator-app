import { useQuery } from 'react-query'

import { getAdvice } from '@/api'
import { Advice } from '@/types'

function useAdvice() {
  return useQuery<Advice, Error>('advice', {
    queryFn: getAdvice,
    staleTime: Infinity, // Advice is never stale (i.e. never refetch unless done by the user)
    initialData: () => {
      const currentAdvice = window.localStorage.getItem('currentAdvice')

      if (currentAdvice) {
        return JSON.parse(currentAdvice) as Advice
      }
    },
    onSuccess: advice => {
      window.localStorage.setItem('currentAdvice', JSON.stringify(advice))
    },
  })
}

export default useAdvice
