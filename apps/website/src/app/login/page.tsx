import { redirect } from 'next/navigation'
import { cn } from '@/lib/utils'
import { getSession } from '@/services/auth-server'
import { LoginForm } from '@/components/login-form'
import { inter } from '../fonts'

export default async function Login() {
  const {
    data: { session }
  } = await getSession()
  if (session) {
    return redirect('/dashboard')
  }

  return (
    <div
      className={cn(
        inter.className,
        `max-w-lg mx-auto min-h-screen grid place-items-center`
      )}
    >
      <div className='w-full flex flex-col gap-4 border border-gray-600/30 rounded-md p-10'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Create an account
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email below to create your account
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
