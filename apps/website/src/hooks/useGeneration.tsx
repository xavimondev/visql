import { useRef } from 'react'
import { useCompletion } from 'ai/react'
import { toast } from 'sonner'
import { saveGenerationServer } from '@/actions'
import { uploadFile } from '@/services/storage'
import { useStore } from '@/store'
import { generateCommandCode } from '@/helpers'

export const useGeneration = () => {
  const setGenerationData = useStore((state) => state.setGenerationData)
  const fileUploaded = useRef<File | undefined>(undefined)
  const { complete, completion, setCompletion } = useCompletion({
    api: 'api/code-generation',
    onFinish: async (_, completion) => {
      saveGeneration({ completion })
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const saveGeneration = async ({ completion }: { completion: string }) => {
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

    // Saving in db the generation
    const generation = {
      cmd_code,
      sql_code: completion,
      diagram_url: path
    }
    toast.promise(saveGenerationServer({ generation }), {
      loading: 'Saving Generation...',
      success: () => {
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
