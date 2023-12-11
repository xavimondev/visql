import Link from 'next/link'
import Image from 'next/image'
import { GalleryVertical, ScrollText } from 'lucide-react'
import { redirect } from 'next/navigation'
import { createSupabaseServerClient } from '@/db/supabase-server'
import { getSession } from '@/services/auth-server'
import { UserNavbar } from '@/components/user-navbar'
import { PanelGeneration } from '@/components/panel-generation'

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

  return (
    <>
      <div className='flex flex-col px-3 2xl:px-4 min-h-screen'>
        <header className='border-b'>
          <div className='flex h-12 items-center'>
            <Link
              href='/'
              className='font-semibold sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-700 dark:from-blue-300 dark:to-violet-400'
            >
              dbac
            </Link>
            <div className='ml-auto flex items-center space-x-4'>
              <UserNavbar
                avatar_url={avatar_url}
                full_name={full_name}
                user_name={user_name}
              />
            </div>
          </div>
        </header>
        <div className='w-full flex overflow-hidden h-[calc(100vh-50px)]'>
          <aside className='w-64 border-r border-zinc-200 dark:border-zinc-800 overflow-auto'>
            <nav className='h-full flex flex-col gap-4'>
              <div className='flex gap-2 items-center text-zinc-500 dark:text-gray-300 py-2'>
                <GalleryVertical className='w-5 h-5' />
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
                <div className='flex flex-col gap-3'>
                  {data?.map((generation) => {
                    return (
                      <button
                        key={generation.id}
                        className='flex w-full h-full z-10 cursor-pointer relative outline-none focus-visible:ring-1 focus:ring-gray-700 rounded-md min-h-[25px] min-w-[30px]'
                      >
                        <div className='w-full rounded-md border border-black dark:border-gray-500 overflow-hidden'>
                          <div className='w-full h-full hover:opacity-100 opacity-80 transition-opacity duration-300 ease-in-out'>
                            <Image
                              alt='Thumbnail database diagram'
                              loading='lazy'
                              width='300'
                              height='180'
                              className='object-cover aspect-video'
                              src={generation.diagram_url}
                            />
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
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
