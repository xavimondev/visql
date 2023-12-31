'use client'
import { useEffect, useState } from 'react'
import { Check, Terminal } from 'lucide-react'
import { copyToClipboard } from '@/helpers'
import { ADD_COMMAND } from '@/constants'
import { CommandCode } from '@/components/command-code'

type CommandBoxProps = {
  commandCode: string | undefined
  hasEffect?: boolean
}

export function CommandBox({ commandCode, hasEffect }: CommandBoxProps) {
  const [isCopied, setIsCopied] = useState(false)
  const commandNpx = `${ADD_COMMAND} ${commandCode}`

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    if (isCopied) {
      timeout = setTimeout(() => setIsCopied(false), 2000)
    }

    return () => {
      timeout && clearTimeout(timeout)
    }
  }, [isCopied])

  return (
    <button
      className='shrink-0 
      justify-center 
      text-sm 
      font-medium 
      transition-colors 
      hover:bg-white/90 
      dark:hover:bg-white/5 
      h-8 
      flex 
      items-center 
      text-zinc-600
      dark:text-zinc-50 
      shadow-none 
      bg-white
      dark:bg-zinc-950 
      w-full 
      px-3 
      py-1.5 
      rounded-lg 
      border 
      border-zinc-700'
      onClick={async () => {
        if (commandCode) {
          setIsCopied(!isCopied)
          await copyToClipboard(commandNpx)
        }
      }}
    >
      <div className='flex items-center flex-1 gap-2 font-mono text-xs sm:text-sm'>
        {isCopied ? (
          <Check className='w-4 h-4' />
        ) : (
          <Terminal className='w-4 h-4' />
        )}
        npx visql add{' '}
        {commandCode ? (
          <CommandCode commandCode={commandCode} hasEffect={hasEffect} />
        ) : (
          <div className='w-28 h-5 blur-sm bg-gray-300 dark:bg-gray-600 rounded-sm'></div>
        )}
      </div>
      <span className='sr-only'>Copy cli command</span>
    </button>
  )
}
