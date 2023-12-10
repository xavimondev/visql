import Link from 'next/link'
import { Github } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'

export default function Home() {
  return (
    <>
      <header className='sticky top-0 px-5 md:px-32 backdrop-blur-md border-b border-gray-700 border-opacity-50 dark:border-opacity-20 z-20'>
        <div className='flex h-14 items-center justify-between'>
          <Link
            href='/'
            className='font-semibold sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-700 dark:from-blue-300 dark:to-violet-400'
          >
            dbac
          </Link>
          <div className='flex gap-2 items-center'>
            <Link
              href='https://github.com/xavimondev/dbac'
              aria-label='Go to Repository'
              target='_blank'
              rel='noreferrer'
              className='rounded-md p-2.5 hover:bg-accent transition-colors ease-out'
            >
              <Github className='h-[1.2rem] w-[1.2rem] text-black dark:text-white' />
            </Link>
            <ModeToggle />
          </div>
        </div>
      </header>
      <main className='w-full p-2'>my Home page</main>
    </>
  )
}
