import Link from 'next/link'

import {
	HeartIcon,
	ScrollTextIcon,
	SearchIcon,
	UserCogIcon,
	UserIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { protectPages } from '@/config/pages.config'

import { LogOutBtn } from './logOut'

export default function ProfileMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant={'ghost'} />}>
				<UserIcon className="h-4 w-4" />
				<span className="text-base font-normal capitalize">profile</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[256px]">
				<DropdownMenuGroup className="space-y-2">
					<Link href={protectPages.ADS}>
						<DropdownMenuItem>
							<ScrollTextIcon className="size-5" />
							<span className="text-base font-normal text-black capitalize">
								Mening elonlarim
							</span>
						</DropdownMenuItem>
					</Link>
					<Link href={protectPages.LIKED}>
						<DropdownMenuItem>
							<HeartIcon className="size-5" />
							<span className="text-base font-normal text-black capitalize">
								saqlanganlar
							</span>
						</DropdownMenuItem>
					</Link>
					<Link href={protectPages.SEARCH}>
						<DropdownMenuItem>
							<SearchIcon className="size-5" />
							<span className="text-base font-normal text-black capitalize">
								qidiruvlar
							</span>
						</DropdownMenuItem>
					</Link>
					<Link href={protectPages.SETTINGS}>
						<DropdownMenuItem>
							<UserCogIcon className="size-5" />
							<span className="text-base font-normal text-black capitalize">
								sozlamalar
							</span>
						</DropdownMenuItem>
					</Link>
					<DropdownMenuSeparator />
					<LogOutBtn />
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
