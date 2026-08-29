'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { KeyIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { useProfile } from '@/hooks/useProfile'
import { authPages } from '@/config/pages.config'
import Container from '@/shared/container'
import { Loader } from '@/shared/loader'
import RegionSelect from '@/shared/region.select'

import AddButton from './add.button'
import CategoryMenu from './category.menu'
import LangDropMenu from './lang.dropMenu'
import ProfileMenu from './profile.menu'
import SearchInput from './search/searchInput'

export default function Header() {
	const searchParams = useSearchParams()
	const regionSearch = searchParams.get('region')

	const { isLoading } = useProfile()
	const { isAuthenticated } = useAuth()

	const [region, setRegion] = useState<string | null>(
		regionSearch || 'toshkent',
	)

	return (
		<header className="w-full">
			<Container>
				<div className="mb-6 flex items-center justify-end gap-x-5 border-b py-4">
					<LangDropMenu />
					{!isAuthenticated && !isLoading ? (
						<Button
							variant={'ghost'}
							className="text-base font-normal capitalize"
						>
							<Link
								href={authPages.REGISTER}
								className="flex items-center gap-x-1"
							>
								<KeyIcon className="h-4 w-4" />
								register
							</Link>
						</Button>
					) : isLoading ? (
						<Loader />
					) : (
						<ProfileMenu />
					)}
				</div>
			</Container>
			<Container>
				<div className="flex flex-wrap items-center justify-center gap-x-7 sm:flex-wrap lg:flex-nowrap">
					<CategoryMenu />
					<RegionSelect
						value={String(region)}
						onValueChange={(value) => setRegion(value)}
					/>
					<AddButton />
					<div className="order-3 mt-4 w-full md:order-2 md:w-auto md:min-w-0 md:flex-1 lg:mt-0 lg:max-w-135">
						<SearchInput />
					</div>
				</div>
			</Container>
		</header>
	)
}
