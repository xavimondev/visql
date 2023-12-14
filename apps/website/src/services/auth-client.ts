import { createSupabaseBrowserClient } from '@/db/supabase-client'

export const signInWithGithub = async () => {
  const supabase = await createSupabaseBrowserClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${location.origin}/api/auth/callback`
    }
  })

  if (error) return null
  return data
}

export const getUserId = async () => {
  const supabase = await createSupabaseBrowserClient()
  const {
    data: { session },
    error
  } = await supabase.auth.getSession()
  if (!session || error) return null

  return session.user.id
}
