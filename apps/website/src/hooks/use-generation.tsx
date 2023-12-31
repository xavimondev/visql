import { useRef } from 'react'
import { useCompletion } from 'ai/react'
import { toast } from 'sonner'
import { saveGenerationServer } from '@/actions'
import { uploadFile } from '@/services/storage'
import { useStore } from '@/store'
import { generateCommandCode } from '@/helpers'

export const useGeneration = () => {
  const setGenerationData = useStore((state) => state.setGenerationData)
  const setIsSavingGeneration = useStore((state) => state.setIsSavingGeneration)
  const fileUploaded = useRef<File | undefined>(undefined)
  const { complete, completion, setCompletion } = useCompletion({
    id: 'visql',
    api: 'api/code-generation',
    onFinish: async (_, completion) => {
      saveGeneration({ completion })
    },
    onError: (err) => {
      const error = JSON.parse(err.message)
      toast.error(error.message)
    }
  })

  const saveGeneration = async ({ completion }: { completion: string }) => {
    setIsSavingGeneration(true)
    const cmd_code = generateCommandCode()
    const file = fileUploaded.current
    const filePath = `${cmd_code}${file?.name.replaceAll(' ', '').trim()}`
    // Uploading file
    const path = await uploadFile({
      filePath,
      file: file as File
    })

    if (!path) {
      toast.error('An error has ocurred while uploading file.')
      return
    }
    const sql_code = completion
      .split('--TABLE\n')
      .filter((table: string) => table !== '')
      .join('\n')
      .trim()
    // Saving in db the generation
    const generation = {
      cmd_code,
      sql_code,
      diagram_url: path
    }
    toast.promise(saveGenerationServer({ generation }), {
      loading: 'Saving Generation...',
      success: () => {
        setIsSavingGeneration(false)
        return `Generation saved successfully.`
      },
      error: 'An error has ocurred while saving data.'
    })
    setGenerationData(generation)
    setCompletion('')
  }

  return {
    complete,
    completion,
    fileUploaded
  }
}
