import { faker } from '@faker-js/faker'
import ShortUniqueId from 'short-unique-id'

export const toBase64 = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export const copyToClipboard = async (content: string) => {
  if (navigator.clipboard) navigator.clipboard.writeText(content)
}

export const getRandomUser = () => {
  return {
    full_name: faker.internet.displayName(),
    user_name: faker.internet.userName(),
    avatar_url: faker.image.avatar()
  }
}

export const generateCommandCode = () => {
  const uid = new ShortUniqueId({ length: 10 })
  return uid.rnd()
}
