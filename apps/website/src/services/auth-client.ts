import { createSupabaseBrowserClient } from '@/db/supabase-client'

export const signInWithGithub = async () => {
  const supabase = await createSupabaseBrowserClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${location.origin}/auth/callback`
    }
  })

  if (error) return null
  return data
}
