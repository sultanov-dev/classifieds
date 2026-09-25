import { MenuIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'

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
import { publicPages } from '@/config/pages.config'
import { categoryData } from '@/data/category.data'
import { Link } from '@/i18n/navigation'

export default function CategoryMenu() {
	const t = useTranslations('Header')
	const tCategory = useTranslations('Categories')

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className="cursor-pointer bg-[#1D828E] text-white"
				render={
					<Button
						className={
							'transition hover:text-[#1D828E] aria-expanded:text-[#1D828E]'
						}
						variant={'ghost'}
					/>
				}
			>
				<MenuIcon className="size-4" />
				<span className="hidden text-base font-normal capitalize md:block">
					{t('category')}
				</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-3xs">
				<DropdownMenuGroup>
					{categoryData.map((category) => (
						<DropdownMenuSub key={category.key}>
							<DropdownMenuSubTrigger className={'font-normal capitalize'}>
								{category.icon} {tCategory(category.key)}
							</DropdownMenuSubTrigger>

							<DropdownMenuPortal>
								<DropdownMenuSubContent>
									{category.subCategory.map((item) => (
										<DropdownMenuItem key={item.id}>
											<Link
												className="font-normal capitalize"
												href={`${publicPages.CATALOG}?category=${item.slug}`}
											>
												{tCategory(item.slug)}
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
