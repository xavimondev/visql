'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { Redis } from '@upstash/redis'
import { getSession, signInWithEmail } from '@/services/auth-server'
import { addGeneration } from '@/services/generation'
import { RATE_LIMIT } from '@/constants'

const schema = z.object({
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.')
})

export const sentEmail = async (prevState: any, formData: FormData) => {
  try {
    const validatedFields = schema.safeParse({
      email: formData.get('email')
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors
      }
    }
    const email = validatedFields.data.email
    await signInWithEmail({ email })
    return {
      message: `Success! We've sent a magic link to ${email}. Please check your inbox and follow the link to proceed.`
    }
  } catch (error) {
    return { errors: `An error has ocurred while sending email` }
  }
}

// TODO: add types
export const saveGenerationServer = async ({
  generation
}: {
  generation: any
}) => {
  const { cmd_code, sql_code } = generation
  const redis = Redis.fromEnv()
  const res = await redis.set(cmd_code, sql_code)
  if (res === 'OK') {
    const result = await addGeneration(generation)
    revalidatePath('/dashboard')
    return result
  }
  return null
}

export const getRemaining = async () => {
  try {
    const redis = Redis.fromEnv()

    const session = await getSession()
    const sessionData = session.data.session

    const email = sessionData!.user.email
    const windowDuration = 24 * 60 * 60 * 1000
    const bucket = Math.floor(Date.now() / windowDuration)

    const valueRate = await redis.get(`@upstash/ratelimit:${email}:${bucket}`)
    const usedGenerations = valueRate || 0
    const remainingGenerations = RATE_LIMIT - Number(usedGenerations)
    return remainingGenerations
  } catch (error) {
    return null
  }
}
