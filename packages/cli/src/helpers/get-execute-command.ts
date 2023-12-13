import { detect } from '@antfu/ni'

type CommandExecute = 'yarn dlx' | 'pnpm dlx' | 'bunx' | 'npx'

export const getExecuteCommand = async ({
  targetDir
}: {
  targetDir: string
}): Promise<CommandExecute> => {
  const packageManager = await detect({ programmatic: true, cwd: targetDir })

  if (packageManager === 'yarn@berry') return 'yarn dlx'
  if (packageManager === 'pnpm@6') return 'pnpm dlx'
  if (packageManager === 'bun') return 'bunx'

  return 'npx'
}
