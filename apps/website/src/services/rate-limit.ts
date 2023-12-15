export const rateLimit = async () => {
  const response = await fetch('api/rate-limit')
  const data = await response.json()
  return data
}
