import { useState } from 'react'
import ShortUniqueId from 'short-unique-id'
import { useCompletion } from 'ai/react'

export const useGeneration = () => {
  const [generationId, setGenerationId] = useState<string | undefined>(
    undefined
  )
  const { complete, completion } = useCompletion({
    api: 'api/code-generation',
    onFinish: async (_, completion) => {
      const uid = new ShortUniqueId({ length: 10 })
      const id = uid.rnd()
      const generation = {
        code: id,
        sql_table: completion
      }
      setGenerationId(id)
      console.log(generation)
    },
    onError: (err) => {
      console.log(err)
    }
  })

  return {
    generationId,
    complete,
    completion
  }
}
