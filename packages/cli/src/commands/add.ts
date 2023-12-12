import path, { resolve } from 'node:path'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import { execa } from 'execa'
import prompts from 'prompts'
import * as z from 'zod'
import { logger } from '@/helpers/logger.js'
import { getSql } from '@/helpers/get-sql.js'

const addArgumentsSchema = z.object({
  generationId: z.string()
})

const promptSchema = z.object({
  supabasePath: z.string()
})

// .option('-y, --yes', 'skip confirmation prompt.', false)
export const add = new Command()
  .name('add')
  .arguments('<generationId>')
  .description('initialize your supabase project and add migrations')
  .action(async (generationId) => {
    try {
      console.log(`Getting diagram from ${generationId} `)
      addArgumentsSchema.parse({ generationId })
      const cwd = path.resolve(process.cwd())
      const config = await promptForConfig(cwd)

      const supabasePath = path.join(
        cwd,
        config.supabasePath === 'supabase' ? '' : config.supabasePath
      )
      if (!existsSync(supabasePath)) {
        mkdirSync(supabasePath, {
          recursive: true
        })
      }
      const spinner = ora(`Initializing Supabase project...`).start()
      // 1. Initialize supabase project
      await execa('npx', ['supabase', 'init'], {
        cwd: supabasePath
      })
      spinner.succeed()

      const migrationSpinner = ora(`Adding migrations...`).start()
      // 2. Create a folder migration
      const migrationPath = path.join(supabasePath, 'supabase', 'migrations')
      if (!existsSync(migrationPath)) {
        mkdirSync(migrationPath, {
          recursive: true
        })
      }

      // 3. Reading tables from database
      const tables = await getSql(generationId)
      // 4. Add tables sql to migration file
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

export const promptForConfig = async (cwd: string, skip = false) => {
  const highlight = (text: string) => chalk.cyan(text)

  const options = await prompts([
    {
      type: 'text',
      name: 'supabasePath',
      message: `Configure the path for ${highlight(
        'supabase configuration'
      )} ?`,
      initial: 'supabase' ?? 'supabase'
    }
  ])
  const config = promptSchema.parse(options)
  return config
}
