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
        <Button>Logout</Button>
      </form>
    </>
  )
}
