import Link from 'next/link'
import { Github } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { LandingTerminal } from '@/components/landing-terminal'
import { nunitoSans } from './fonts'

export default function Home() {
  return (
    <>
      <div className={cn(nunitoSans.className, 'relative')}>
        <div className='absolute w-full lg:w-[60%] left-0 lg:left-96 h-96 top-64 opacity-40 filter blur-[150px] z-0'>
          <div className='rounded-md h-96 w-full bg-[#f0a272]'></div>
        </div>
        <header className='sticky top-0 sm:mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-6xl mt-4 px-4'>
          <div className='flex items-center justify-between'>
            <Link
              href='/'
              className='font-bold text-2xl lg:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 dark:from-yellow-300 dark:to-orange-500'
            >
              viSQL
            </Link>
            <div className='flex gap-2 items-center'>
              <Link
                href='https://github.com/xavimondev/visql'
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
        <main className='w-full h-full px-5 sm:mx-auto sm:max-w-2xl md:max-w-4xl lg:max-w-6xl xl:max-w-[85rem]'>
          <section className='w-full h-full z-10 flex items-center pt-28 sm:pt-36 md:py-56'>
            <div className='grid md:grid-cols-2 gap-4 md:gap-6 items-center'>
              <div className='flex flex-col gap-4'>
                <h1 className='mt-1 text-3xl font-bold lg:text-5xl balance text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 dark:from-yellow-300 dark:to-orange-500'>
                  Build Databases from Designs: Simplified SQL Generation
                </h1>
                <p className='text-orange-800 dark:text-orange-200 font-medium text-lg'>
                  Eliminate the complexities of the development process and
                  receive not only generated SQL code but also a command line
                  script for immediate local execution.
                </p>
                <div className='mt-4 w-full items-center gap-3 md:flex md:flex-row'>
                  <Link href='/login'>
                    <Button className='w-full'>Get Started</Button>
                  </Link>
                </div>
              </div>
              <div className='z-10 mb-12 flex items-center md:mb-0'>
                <div className='w-full h-full shadow-md'>
                  <LandingTerminal />
                </div>
              </div>
            </div>
          </section>
        </main>
        <footer className='w-full bottom-0'>
          <div className='mx-auto text-center px-6 sm:px-0 mt-14 sm:mt-14'>
            <span className='text-gray-800 dark:text-orange-200 text-base sm:text-lg'>
              Built with 🧡 by
              <a
                href='https://twitter.com/xavimonp'
                rel='noopener'
                target='_blank'
                className='underline underline-offset-4'
              >
                {' '}
                xavimon
              </a>
            </span>
          </div>
        </footer>
      </div>
    </>
  )
}
