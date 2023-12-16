import { redirect } from 'next/navigation'
import { GalleryVertical, ScrollText } from 'lucide-react'
import { createSupabaseServerClient } from '@/db/supabase-server'
import { cn } from '@/lib/utils'
import { getSession } from '@/services/auth-server'
import { getRemaining } from '@/actions'
import { UserNavbar } from '@/components/user-navbar'
import { PanelGeneration } from '@/components/panel-generation'
import { ListGenerations } from '@/components/list-generations'
import { AddGenerationButton } from '@/components/add-generation-button'
import { Logo } from '@/components/logo'
import { Remaining } from '@/components/remaining'
import { inter } from '../fonts'

export default async function Dashboard() {
  const {
    data: { session }
  } = await getSession()
  if (!session) {
    return redirect('/login')
  }

  const {
    user: { user_metadata }
  } = session
  const { avatar_url, full_name, user_name } = user_metadata

  const supabase = await createSupabaseServerClient()
  const { data, error } = await supabase
    .from('generations')
    .select('id,cmd_code,sql_code,diagram_url')
    .order('created_at', { ascending: false })

  const remaining = await getRemaining()

  return (
    <>
      <div
        className={cn(inter.className, 'flex flex-col px-3 2xl:px-4 h-screen')}
      >
        <header className='border-b'>
          <div className='flex h-12 items-center justify-between'>
            <Logo />
            <div className='flex gap-2 items-center'>
              <Remaining remaining={remaining ?? 0} />
              <AddGenerationButton />
              <div className='ml-auto flex items-center space-x-4'>
                <UserNavbar
                  avatar_url={avatar_url}
                  full_name={full_name}
                  user_name={user_name}
                />
              </div>
            </div>
          </div>
        </header>
        <div className='w-full h-full flex flex-col md:flex-row'>
          <aside className='w-40 overflow-auto hidden md:block'>
            <nav className='h-full flex flex-col gap-4'>
              <div className='flex gap-2 items-center text-zinc-500 dark:text-gray-300 py-2'>
                <GalleryVertical className='w-4 h-4' />
                <h2 className='font-semibold'>Generations</h2>
              </div>
              {data?.length === 0 || error ? (
                <div className='w-full h-full flex flex-col items-center justify-center text-center'>
                  <ScrollText className='w-12 h-12' />
                  <h3 className='mt-4 text-lg font-semibold'>
                    No generations added
                  </h3>
                  <p className='mb-4 mt-2 text-sm text-muted-foreground'>
                    You have not added any generations.
                  </p>
                </div>
              ) : (
                <ListGenerations data={data} />
              )}
            </nav>
          </aside>
          <main className='w-full h-full p-2 overflow-auto'>
            <PanelGeneration />
          </main>
        </div>
      </div>
    </>
  )
}
