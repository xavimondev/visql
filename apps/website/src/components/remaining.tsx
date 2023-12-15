'use client'
import { Loader2 } from 'lucide-react'
import { useRemaining } from '@/hooks/use-remaining'
import { RATE_LIMIT } from '@/constants'

export function Remaining() {
  const { data, isLoading } = useRemaining()

  return (
    <div className='w-full flex rounded-md bg-orange-200 dark:bg-orange-900/30 px-4 py-1'>
      <p className='w-full flex items-center font-bold text-orange-900 dark:text-orange-500'>
        {isLoading ? (
          <Loader2 className='w-5 h-5 animate-spin' />
        ) : (
          `${data.remaining}`
        )}
        {` / ${RATE_LIMIT} Gens`}
      </p>
    </div>
  )
}
