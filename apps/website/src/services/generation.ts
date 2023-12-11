import { createSupabaseBrowserClient } from '@/db/supabase-client'
import { TablesInsert } from '@/types/supabase'

let GenerationInsert: TablesInsert<'generations'>

export const addGeneration = async (generation: typeof GenerationInsert) => {
  const supabase = await createSupabaseBrowserClient()
  const { data, error } = await supabase.from('generations').insert(generation)

  if (error) return null
  return data
}
