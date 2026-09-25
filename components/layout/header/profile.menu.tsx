import {
	HeartIcon,
	ScrollTextIcon,
	SearchIcon,
	UserCogIcon,
	UserIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

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
import { Link } from '@/i18n/navigation'

import { LogOutBtn } from './logOut'

export default function ProfileMenu() {
	const t = useTranslations('Header')

	return (
		<DropdownMenu>
			<DropdownMenuTrigger render={<Button variant={'ghost'} />}>
				<UserIcon className="h-4 w-4" />
				<span className="text-base font-normal capitalize">{t('profile')}</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-[256px]">
				<DropdownMenuGroup className="space-y-2">
					<Link href={protectPages.ADS}>
						<DropdownMenuItem>
							<ScrollTextIcon className="size-5" />
							<span className="text-base font-normal text-black capitalize">
								{t('myAds')}
							</span>
						</DropdownMenuItem>
					</Link>
					<Link href={protectPages.LIKED}>
						<DropdownMenuItem>
							<HeartIcon className="size-5" />
							<span className="text-base font-normal text-black capitalize">
								{t('saved')}
							</span>
						</DropdownMenuItem>
					</Link>
					<Link href={protectPages.HISTORY}>
						<DropdownMenuItem>
							<SearchIcon className="size-5" />
							<span className="text-base font-normal text-black capitalize">
								{t('history')}
							</span>
						</DropdownMenuItem>
					</Link>
					<Link href={protectPages.SETTINGS}>
						<DropdownMenuItem>
							<UserCogIcon className="size-5" />
							<span className="text-base font-normal text-black capitalize">
								{t('settings')}
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
