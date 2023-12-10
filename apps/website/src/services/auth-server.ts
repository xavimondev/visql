'use server'
import { getRandomUser } from '@/helpers'
import { createSupabaseServerClient } from '@/db/supabase-server'

export const signOut = async () => {
  const supabase = await createSupabaseServerClient()
  const { error } = await supabase.auth.signOut()
  return error
}

export const getSession = async () => {
  const supabase = await createSupabaseServerClient()
  return supabase.auth.getSession()
}

export const signInWithEmail = async ({ email }: { email: string }) => {
  const userData = getRandomUser()
  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      data: userData
    }
  })

  if (error) return null
  return data
}
