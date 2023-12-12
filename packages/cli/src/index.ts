#!/usr/bin/env node
import { Command } from 'commander'
import { getPackageInfo } from '@/helpers/get-package-info.js'
import { add } from '@/commands/add.js'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

async function main() {
  const packageInfo = getPackageInfo()

  const program = new Command()
    .name('dac')
    .description('Add database migrations to your project')
    .version(
      packageInfo.version || '1.0.0',
      '-v, --version',
      'display the version number'
    )

  program.addCommand(add)
  program.parse()
}

main()
