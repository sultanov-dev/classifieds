import Link from 'next/link'

import { MenuIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { categoryData } from '@/data/category.data'

export default function CategoryMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="cursor-pointer bg-[#1D828E] text-white"
        render={
          <Button
            className={'transition hover:text-[#1D828E] aria-expanded:text-[#1D828E]'}
            variant={'ghost'}
          />
        }
      >
        <MenuIcon className="size-4" />
        <span className="hidden text-base font-normal capitalize md:block">Kategoriya</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-3xs">
        <DropdownMenuGroup>
          {categoryData.map((category) => (
            <DropdownMenuSub key={category.label}>
              <DropdownMenuSubTrigger className={'font-normal capitalize'}>
                {category.Icon ? <category.Icon className="size-6" /> : null}
                {category.label}
              </DropdownMenuSubTrigger>

              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {category.category.map((item) => (
                    <DropdownMenuItem key={item.id}>
                      <Link className="font-normal capitalize" href={item.slug}>
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
