'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useCompletion } from 'ai/react'
import { Github } from 'lucide-react'
import ShortUniqueId from 'short-unique-id'
import { ModeToggle } from '@/components/mode-toggle'
import { CodeEditor } from '@/components/code-editor'
import { Dropzone } from '@/components/dropzone'
import { CommandBox } from '@/components/command-box'

export default function Home() {
  const [generationId, setGenerationId] = useState<string | undefined>(
    undefined
  )
  const { complete, completion } = useCompletion({
    api: 'api/code-generation',
    onFinish: async (_, completion) => {
      const uid = new ShortUniqueId({ length: 10 })
      const id = uid.rnd()
      const generation = {
        code: id,
        sql_table: completion
      }
      setGenerationId(id)
      console.log(generation)
    },
    onError: (err) => {
      console.log(err)
    }
  })

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
      <main className='w-full p-2'>
        <div className='flex flex-col gap-2 w-full'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 w-full'>
            <Dropzone complete={complete} />
            <div className='flex flex-col gap-2 w-full'>
              <CommandBox generationId={generationId} />
              <CodeEditor code={completion} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
