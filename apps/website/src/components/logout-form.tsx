import { LogOut } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { signOut } from '@/services/auth-server'

export function LogoutForm() {
  const logout = async () => {
    'use server'
    await signOut()
    redirect('/login')
  }
  return (
    <>
      <form action={logout}>
        <Button variant='ghost' className='p-0 m-0 w-auto h-auto'>
          <LogOut className='mr-2 h-4 w-4' />
          <span>Log out</span>
        </Button>
      </form>
    </>
  )
}
