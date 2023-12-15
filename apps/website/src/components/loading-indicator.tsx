import { Loader2 } from 'lucide-react'

export function LoadingIndicator() {
  return (
    <div className='bg-gray-200 dark:bg-white w-full h-20 cursor-wait rounded-md flex items-center justify-center animate-bounceIn'>
      <Loader2 className='w-7 h-7 text-gray-600 dark:text-gray-400 animate-spin' />
    </div>
  )
}
