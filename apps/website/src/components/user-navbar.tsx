import Link from 'next/link'
import { Github, Home } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { LogoutForm } from '@/components/logout-form'

type UserNavbarProps = {
  avatar_url: string
  full_name: string
  user_name: string
}

export function UserNavbar({
  avatar_url,
  full_name,
  user_name
}: UserNavbarProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
          <Avatar className='h-8 w-8'>
            <AvatarImage src={avatar_url} alt={user_name} />
            <AvatarFallback>{full_name.substring(0, 2)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm font-medium leading-none'>{user_name}</p>
            <p className='text-xs leading-none text-muted-foreground'>
              {full_name}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href='/' className='flex items-center'>
              <Home className='mr-2 h-4 w-4' />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link
              href='https://github.com/xavimondev/dbac'
              className='flex items-center'
            >
              <Github className='mr-2 h-4 w-4' />
              <span>Github</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutForm />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
