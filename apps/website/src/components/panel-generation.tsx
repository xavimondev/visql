'use client'
import { useStore } from '@/store'
import { useGeneration } from '@/hooks/useGeneration'
import { CodeEditor } from '@/components/code-editor'
import { Dropzone } from '@/components/dropzone'
import { CommandBox } from '@/components/command-box'
import { PreviewImage } from '@/components/preview-image'

export function PanelGeneration() {
  const { generationCode, complete, completion, fileUploaded } = useGeneration()
  const generationData = useStore((state) => state.generationData)
  const { cmd_code, diagram_url, sql_code } = generationData ?? {}

  return (
    <div className='flex flex-col gap-2 w-full h-full'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-3 w-full h-full'>
        {diagram_url ? (
          <PreviewImage diagram_url={diagram_url} />
        ) : (
          <Dropzone complete={complete} fileUploaded={fileUploaded} />
        )}
        <div className='flex flex-col gap-2 w-full h-full'>
          <CommandBox generationCode={cmd_code ?? generationCode} />
          <CodeEditor code={sql_code ?? completion} />
        </div>
      </div>
    </div>
  )
}
