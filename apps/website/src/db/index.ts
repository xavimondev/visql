import { Database } from '@/types/supabase'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://cbdnetsyewzcxvcwiihw.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiZG5ldHN5ZXd6Y3h2Y3dpaWh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIxNTg5NTIsImV4cCI6MjAxNzczNDk1Mn0.GnH7k0miWTmSrMt7iur405KPhs7fxaYsj5H3Nky_2Mw'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)
