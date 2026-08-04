import { HeartIcon, ScrollTextIcon, SearchIcon, UserCogIcon, UserIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function ProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant={'ghost'} />}>
        <UserIcon className="h-4 w-4" />
        <span className="text-base font-normal capitalize">profile</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[256px]">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <ScrollTextIcon className="size-5" />
            <span className="text-base font-normal text-black capitalize">Mening elonlarim</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <HeartIcon className="size-5" />
            <span className="text-base font-normal text-black capitalize">saqlanganlar</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SearchIcon className="size-5" />
            <span className="text-base font-normal text-black capitalize">qidiruvlar</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserCogIcon className="size-5" />
            <span className="text-base font-normal text-black capitalize">sozlamalar</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
