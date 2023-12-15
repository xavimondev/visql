'use client'
import { useCompletion } from 'ai/react'
import Image from 'next/image'
import { useStore } from '@/store'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger
} from '@/components/ui/hover-card'
import { CommandBox } from '@/components/command-box'
import { LoadingIndicator } from '@/components/loading-indicator'
import { GenerationInsert } from '@/types'

type GenerationProps = {
  id?: string
  diagram_url: string
  cmd_code: string
  sql_code: string
}

function GenerationItem({
  id,
  diagram_url,
  cmd_code,
  sql_code
}: GenerationProps) {
  const setGenerationData = useStore((state) => state.setGenerationData)

  return (
    <HoverCard openDelay={300} closeDelay={0}>
      <HoverCardTrigger asChild>
        <button
          key={id}
          className='flex 
          w-full 
          h-full 
          cursor-pointer 
          relative 
          outline-none 
          rounded-md 
          min-h-[25px] 
          min-w-[30px] 
          border 
          border-orange-200 
          dark:border-orange-300 
          hover:border-orange-400 
          hover:dark:border-orange-600'
          onClick={() => {
            setGenerationData({
              diagram_url,
              cmd_code,
              sql_code
            })
          }}
        >
          <div className='w-full rounded-md overflow-hidden'>
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
      </HoverCardTrigger>
      <HoverCardContent
        className='w-80 
        h-full 
        p-3 
        bg-black 
        border-0 
        dark:border 
        dark:border-orange-300/30'
        align='center'
        side='right'
      >
        <div className='flex flex-col gap-2'>
          <Image
            src={diagram_url}
            alt='A database diagram'
            width={400}
            height={400}
            className='object-cover aspect-video w-full h-full'
          />
          <CommandBox commandCode={cmd_code} />
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export function ListGenerations({
  data
}: {
  data: (typeof GenerationInsert)[]
}) {
  const { isLoading } = useCompletion({
    id: 'visql'
  })
  const isSavingGeneration = useStore((state) => state.isSavingGeneration)
  return (
    <>
      {(isLoading || isSavingGeneration) && <LoadingIndicator />}
      <div className='flex flex-col gap-3'>
        {data?.map((generation: typeof GenerationInsert) => (
          <GenerationItem key={generation.id} {...generation} />
        ))}
      </div>
    </>
  )
}
