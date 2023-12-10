'use client'
import { useEffect } from 'react'
import { useFormStatus, useFormState } from 'react-dom'
import { toast } from 'sonner'
import { Github, LoaderIcon } from 'lucide-react'
import { signInWithGithub } from '@/services/auth'
import { sentEmail } from '@/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const initialState = {
  message: null,
  errors: null
}

export function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' aria-disabled={pending} disabled={pending}>
      {pending ? (
        <LoaderIcon className='animate-spin w-5 h-5' />
      ) : (
        'Sign In with Email'
      )}
    </Button>
  )
}

export function GithubAuthButton() {
  return (
    <Button
      className='w-full'
      variant='outline'
      type='button'
      onClick={signInWithGithub}
    >
      <Github className='mr-2 h-5 w-5' />
      Github
    </Button>
  )
}

export function UserAuthForm() {
  const [state, formAction] = useFormState(sentEmail, initialState)

  useEffect(() => {
    if (state && state.message) {
      toast.success(state.message, {
        duration: 5000
      })
    }
  }, [state])

  return (
    <div className='w-full flex flex-col gap-6'>
      <form className='flex flex-col gap-4' action={formAction}>
        <div className='grid gap-2 w-full'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <Input
              name='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
              required
            />
          </div>
          <SubmitButton />
          <p aria-live='polite' className='sr-only' role='status'>
            {state?.message}
          </p>
        </div>
      </form>
      <div className='relative w-full'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs uppercase'>
          <span className='bg-background px-2 text-muted-foreground'>
            Or continue with
          </span>
        </div>
      </div>
      <GithubAuthButton />
    </div>
  )
}
