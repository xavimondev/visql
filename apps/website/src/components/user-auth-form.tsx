'use client'
import { Github } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function UserAuthForm() {
  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
  }

  return (
    <div className='w-full flex flex-col gap-6'>
      <form className='flex flex-col gap-4' onSubmit={onSubmit}>
        <div className='grid gap-2 w-full'>
          <div className='grid gap-1'>
            <Label className='sr-only' htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              placeholder='name@example.com'
              type='email'
              autoCapitalize='none'
              autoComplete='email'
              autoCorrect='off'
            />
          </div>
          <Button>Sign In with Email</Button>
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
      <Button className='w-full' variant='outline' type='button'>
        <Github className='mr-2 h-5 w-5' />
        Github
      </Button>
    </div>
  )
}
