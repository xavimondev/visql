import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getSession } from '@/services/auth-server'
import { UserNavbar } from '@/components/user-navbar'

export default async function Dashboard() {
  const {
    data: { session }
  } = await getSession()
  if (!session) {
    return redirect('/login')
  }

  const {
    user: { user_metadata }
  } = session
  const { avatar_url, full_name, user_name } = user_metadata

  return (
    <>
      <header className='px-4 border-b'>
        <div className='flex h-12 items-center'>
          <Link
            href='/'
            className='font-semibold sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-700 dark:from-blue-300 dark:to-violet-400'
          >
            dbac
          </Link>
          <div className='ml-auto flex items-center space-x-4'>
            <UserNavbar
              avatar_url={avatar_url}
              full_name={full_name}
              user_name={user_name}
            />
          </div>
        </div>
      </header>
      <h1>Welcome my friend !</h1>
    </>
  )
}
