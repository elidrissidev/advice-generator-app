import apiClient from '@/lib/axios'
import { Advice } from '@/types'

type AdviceResponse = {
  slip: Advice
}

export async function getAdvice(): Promise<Advice> {
  const res = await apiClient.get<AdviceResponse>('/advice')
  return res.data.slip
}
