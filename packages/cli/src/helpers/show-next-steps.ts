import { logger } from './logger.js'

export const showNextSteps = ({
  projectExists
}: {
  projectExists: boolean
}) => {
  logger.info('Next Steps:')
  if (!projectExists) {
    console.log('supabase login')
    console.log('supabase link --project-ref YOUR_PROJECT_ID')
  }
  // In case the user already has a Supabase project set up, they only need to push the migration
  console.log('supabase db push --linked')
}
