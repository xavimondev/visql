import { useState, useRef } from 'react'
import { useCompletion } from 'ai/react'
import { toast } from 'sonner'
import ShortUniqueId from 'short-unique-id'
import { saveGenerationServer } from '@/actions'
import { uploadFile } from '@/services/storage'

export const useGeneration = () => {
  const [generationId, setGenerationId] = useState<string | undefined>(
    undefined
  )
  const fileUploaded = useRef<File | undefined>(undefined)
  const { complete, completion } = useCompletion({
    api: 'api/code-generation',
    onFinish: async (_, completion) => {
      saveGeneration({ completion })
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const saveGeneration = async ({ completion }: { completion: string }) => {
    const file = fileUploaded.current
    // Uploading file
    const path = await uploadFile({
      file: file as File
    })

    if (!path) {
      toast.error('An error has ocurred while uploading file.')
      return
    }

    // Saving in db the generation
    const uid = new ShortUniqueId({ length: 10 })
    const id = uid.rnd()
    const generation = {
      cmd_code: id,
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
    setGenerationId(id)
  }

  return {
    generationId,
    complete,
    completion,
    fileUploaded
  }
}
