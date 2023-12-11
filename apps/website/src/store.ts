import { create } from 'zustand'

type GenerationData = {
  diagram_url: string
  cmd_code: string
  sql_code: string
}

type State = {
  generationData: GenerationData | undefined
  setGenerationData: (generationData: GenerationData | undefined) => void
}

export const useStore = create<State>()((set) => ({
  generationData: undefined,
  setGenerationData: (generationData) => set({ generationData: generationData })
}))
