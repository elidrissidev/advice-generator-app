import { useQuery } from 'react-query'

import { getAdvice } from '@/api'
import { Advice } from '@/types'

function useAdvice() {
  return useQuery<Advice, Error>('advice', {
    queryFn: getAdvice,
    staleTime: Infinity, // Advice is never stale (i.e. never refetch unless done by the user)
    onError: err => alert(`Error encountered: ${err.message}`),
  })
}

export default useAdvice
