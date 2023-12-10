'use client'
import { useGeneration } from '@/hooks/useGeneration'
import { CodeEditor } from '@/components/code-editor'
import { Dropzone } from '@/components/dropzone'
import { CommandBox } from '@/components/command-box'

export function PanelGeneration() {
  const { generationId, complete, completion } = useGeneration()

  return (
    <div className='flex flex-col gap-2 w-full h-full'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 w-full h-full'>
        <Dropzone complete={complete} />
        <div className='flex flex-col gap-2 w-full h-full'>
          <CommandBox generationId={generationId} />
          <CodeEditor code={completion} />
        </div>
      </div>
    </div>
  )
}
