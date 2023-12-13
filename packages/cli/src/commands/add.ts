import path, { resolve } from 'node:path'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import { execa } from 'execa'
import prompts from 'prompts'
import * as z from 'zod'
import { glob } from 'glob'
import { logger } from '@/helpers/logger.js'
import { getSql } from '@/helpers/get-sql.js'
import { getExecuteCommand } from '@/helpers/get-execute-command.js'

const addArgumentsSchema = z.object({
  generation: z.string().optional()
})

const promptSchema = z.object({
  path: z.string().trim().min(1)
})

export const add = new Command()
  .name('add')
  .arguments('[generation]')
  .description('initialize your supabase project and add migrations')
  .action(async (generation) => {
    try {
      const options = addArgumentsSchema.parse({ generation })
      let generationCode = options.generation
      if (!options.generation) {
        const { generation } = await prompts([
          {
            type: 'text',
            name: 'generation',
            message: 'Enter your generation code'
          }
        ])
        generationCode = generation
      }
      if (!generationCode) {
        logger.warn('No generation code provided. Exiting.')
        process.exit(0)
      }

      // Checking whether code is valid or not
      const tables = await getSql({ generationCode })
      if (!tables) {
        logger.error('The given generation code is wrong. Exiting.')
        process.exit(0)
      }
      const cwd = path.resolve(process.cwd())
      let defaultDirectory = `${cwd}/supabase`

      const search = path.join(cwd, '**/supabase/config.toml')
      const result = await glob(search)
      const pathFound = result.at(0)
      if (pathFound) {
        defaultDirectory = path.dirname(pathFound)
      }
      const relativePath = path.relative(cwd, defaultDirectory)
      const config = await promptForConfig(relativePath)
      const pickedPath = config.path ?? relativePath

      if (!existsSync(pickedPath) && pickedPath !== 'supabase') {
        mkdirSync(pickedPath, {
          recursive: true
        })
      }

      if (!pathFound) {
        const spinner = ora(`Initializing Supabase project...`).start()
        // 1. Initialize supabase project
        const executeCommand = await getExecuteCommand({ targetDir: cwd })
        await execa(executeCommand, ['supabase', 'init'], {
          cwd: pickedPath === 'supabase' ? cwd : pickedPath
        })
        spinner.succeed()
      }

      const migrationSpinner = ora(`Adding migrations...`).start()
      // 2. Create a folder migration...TODO: Find a better way to do this
      const migrationPath = path.join(
        `${
          pickedPath === 'supabase'
            ? `${cwd}/supabase`
            : pathFound
              ? pickedPath
              : `${pickedPath}/supabase`
        }`,
        'migrations'
      )

      if (!existsSync(migrationPath)) {
        mkdirSync(migrationPath, {
          recursive: true
        })
      }

      // 3. Add tables sql to migration file
      const now = new Date()
      const formattedTimestamp = now
        .toISOString()
        .replace(/\D/g, '')
        .slice(0, 14)
      const fileMigrationName = `${formattedTimestamp}_initial_state_schema.sql`
      writeFileSync(
        path.join(migrationPath, fileMigrationName),
        tables ?? '',
        'utf-8'
      )
      migrationSpinner.succeed()
      logger.info(`${chalk.green('Success!')} Migrations added successfully.`)
    } catch (error) {
      console.error(error)
    }
  })

export const promptForConfig = async (defaultDirectory: string) => {
  const highlight = (text: string) => chalk.cyan(text)
  const options = await prompts([
    {
      type: 'text',
      name: 'path',
      message: `Where would you like to add your ${highlight('migrations')} ?`,
      initial: defaultDirectory
    }
  ])
  const config = promptSchema.parse(options)
  return config
}
