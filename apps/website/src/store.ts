import { create } from 'zustand'

type GenerationData = {
  diagram_url: string
  cmd_code: string
  sql_code: string
}

type State = {
  generationData: GenerationData | undefined
  setGenerationData: (generationData: GenerationData | undefined) => void
  commandCode: string | undefined
  setCommandCode: (commandCode: string | undefined) => void
}

export const useStore = create<State>()((set) => ({
  generationData: undefined,
  setGenerationData: (generationData) =>
    set({ generationData: generationData }),
  commandCode: undefined,
  setCommandCode: (commandCode) => set({ commandCode })
}))
