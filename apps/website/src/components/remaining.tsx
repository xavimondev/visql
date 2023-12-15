export function Remaining({ remaining }: { remaining: number }) {
  return (
    <div className='w-full flex rounded-md bg-orange-200 dark:bg-orange-900/30 px-4 py-1'>
      <p className='w-full flex items-center text-sm font-bold text-orange-900 dark:text-orange-500'>
        {`${remaining} ${remaining > 1 ? 'generations' : 'generation'} left`}
      </p>
    </div>
  )
}
