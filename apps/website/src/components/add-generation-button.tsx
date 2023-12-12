'use client'
import { PlusIcon } from 'lucide-react'
import { useStore } from '@/store'
import { Button } from '@/components/ui/button'

export function AddGenerationButton() {
  const setGenerationData = useStore((state) => state.setGenerationData)
  return (
    <Button
      className='w-full h-8 p-2'
      onClick={() => {
        setGenerationData(undefined)
      }}
    >
      <PlusIcon className='mr- w-5 h-5' />
      New Generation
    </Button>
  )
}
