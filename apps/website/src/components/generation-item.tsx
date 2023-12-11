'use client'
import Image from 'next/image'
import { useStore } from '@/store'

type GenerationProps = {
  id: string
  diagram_url: string
  cmd_code: string
  sql_code: string
}

export function GenerationItem({
  id,
  diagram_url,
  cmd_code,
  sql_code
}: GenerationProps) {
  const setGenerationData = useStore((state) => state.setGenerationData)

  return (
    <button
      key={id}
      className='flex w-full h-full z-10 cursor-pointer relative outline-none focus-visible:ring-1 focus:ring-gray-700 rounded-md min-h-[25px] min-w-[30px]'
      onClick={() => {
        setGenerationData({
          diagram_url,
          cmd_code,
          sql_code
        })
      }}
    >
      <div className='w-full rounded-md border border-black dark:border-gray-500 overflow-hidden'>
        <div className='w-full h-full hover:opacity-100 opacity-80 transition-opacity duration-300 ease-in-out'>
          <Image
            alt='Thumbnail database diagram'
            loading='lazy'
            width='300'
            height='180'
            className='object-cover aspect-video'
            src={diagram_url}
          />
        </div>
      </div>
    </button>
  )
}
