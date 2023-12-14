import Link from 'next/link'

export function Logo() {
  return (
    <Link
      href='/'
      className='font-bold text-xl lg:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-600 dark:from-yellow-300 dark:to-orange-500'
    >
      viSQL
    </Link>
  )
}
