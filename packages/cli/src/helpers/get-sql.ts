import { API_GENERATIONS_URL, DOMAIN } from '@/constants.js'

export const getSql = async ({
  generationCode
}: {
  generationCode: string
}) => {
  const response = await fetch(
    `${DOMAIN}${API_GENERATIONS_URL}${generationCode}`
  )
  const dataApi = await response.json()
  return dataApi.data
}
