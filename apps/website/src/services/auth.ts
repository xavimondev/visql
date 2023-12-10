import { supabase } from '@/db'
import { getRandomUser } from '@/helpers'

export const signInWithEmail = async ({ email }: { email: string }) => {
  const userData = getRandomUser()
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      data: userData
    }
  })

  if (error) return null
  return data
}

export const signInWithGithub = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github'
  })

  if (error) return null
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return error
}
