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

export const getLines = () => {
  return [
    {
      text: `npx visql add w31c0m3`,
      cmd: true,
      delay: 1000
    },
    {
      text: 'Where would you like to add your migrations ? › supabase',
      cmd: false,
      delay: 1000
    },
    {
      text: 'Initializing Supabase project...',
      cmd: false,
      delay: 600,
      isLoading: true
    },
    {
      text: 'Adding migrations...',
      cmd: false,
      delay: 800,
      isLoading: true
    },
    {
      text: 'Success! Migrations added successfully.',
      delay: 1000,
      cmd: false
    },
    {
      text: '',
      cmd: false
    },
    {
      text: `Next Steps:`,
      cmd: false
    },
    {
      text: `supabase login`,
      cmd: false
    },
    {
      text: `supabase link --project-ref YOUR_PROJECT_ID`,
      cmd: false
    },
    {
      text: `supabase db push --linked`,
      cmd: false
    }
  ]
}

export const sleep = async ({ delay = 110 }: { delay?: number }) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}
