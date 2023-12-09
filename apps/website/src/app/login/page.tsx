import { UserAuthForm } from '@/components/user-auth-form'

export default function Login() {
  return (
    <div className='max-w-lg mx-auto min-h-screen grid place-items-center'>
      <div className='w-full flex flex-col gap-4 border border-gray-600/10 rounded-lg p-10'>
        <div className='flex flex-col space-y-2 text-center'>
          <h1 className='text-2xl font-semibold tracking-tight'>
            Create an account
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email below to create your account
          </p>
        </div>
        <UserAuthForm />
      </div>
    </div>
  )
}
