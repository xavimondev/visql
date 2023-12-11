import { createSupabaseServerClient } from '@/db/supabase-server'
import { TablesInsert } from '@/types/supabase'

let GenerationInsert: TablesInsert<'generations'>

export const addGeneration = async (generation: typeof GenerationInsert) => {
  const supabase = await createSupabaseServerClient()
  return supabase.from('generations').insert(generation)
}
