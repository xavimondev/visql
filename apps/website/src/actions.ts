'use server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { signInWithEmail } from '@/services/auth-server'
import { addGeneration } from '@/services/generation'

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

export const saveGenerationServer = async ({
  generation
}: {
  generation: any
}) => {
  const result = await addGeneration(generation)
  revalidatePath('/dashboard')
  return result
}
