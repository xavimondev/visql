import Link from 'next/link'
import Image from 'next/image'
import { GalleryVertical, ScrollText } from 'lucide-react'
import { redirect } from 'next/navigation'
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

  return (
    <>
      <header className='px-4 border-b'>
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
      <div className='flex flex-1 overflow-hidden'>
        <aside className='w-64 border-r border-zinc-200 dark:border-zinc-800 overflow-auto'>
          <nav className='h-full flex flex-col gap-4 p-4'>
            <div className='flex gap-2 items-center text-zinc-500 dark:text-gray-300'>
              <GalleryVertical className='w-5 h-5' />
              <h2 className='font-semibold'>Generations</h2>
            </div>
            {true ? (
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
              <div className='flex-1 flex flex-col-reverse overflow-auto no-scrollbar'>
                <div className='flex flex-col gap-3'>
                  <button className='flex w-full h-full shrink-0 z-10 cursor-pointer relative outline-none focus-visible:ring-1 focus:ring-gray-700 rounded-md min-h-[25px] min-w-[40px]'>
                    <div className='w-full rounded-md border border-black dark:border-gray-500 overflow-hidden'>
                      <div className='w-full h-full hover:opacity-100 opacity-80 transition-opacity duration-300 ease-in-out'>
                        <Image
                          alt='Thumbnail database diagram'
                          loading='lazy'
                          width='320'
                          height='180'
                          className='object-cover aspect-video'
                          src='/photo.webp'
                        />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </nav>
        </aside>
        <main className='w-full p-2'>
          <PanelGeneration />
        </main>
      </div>
    </>
  )
}
