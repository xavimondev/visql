import { API_GENERATIONS_URL } from '@/constants.js'

export const getSql = async ({
  generationCode
}: {
  generationCode: string
}) => {
  const response = await fetch(`${API_GENERATIONS_URL}${generationCode}`)
  const dataApi = await response.json()
  return dataApi.data
}
