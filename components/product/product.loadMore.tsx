'use client'

import { useTranslations } from 'next-intl'

import { useListings } from '@/hooks/useListings'
import type { IGetListingResponse } from '@/types/listing.types'

import { Button } from '../ui/button'
import { ProductGrid } from './product.grid'

export function ProductLoadMore({
	initialData,
	type,
}: {
	initialData: IGetListingResponse
	type: 'latest' | 'all'
}) {
	const t = useTranslations('Product')
	const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useListings(
		type,
		initialData,
	)
	const listings = data.pages.flatMap((listing) => listing.data.listings)

	return (
		<section>
			<ProductGrid listings={listings} />
			<div className="my-6 flex w-full items-center justify-center">
				{hasNextPage && !isFetchingNextPage && (
					<Button
						className="cursor-pointer bg-[#1D828E] text-base font-normal transition-colors hover:bg-[#24a3b1]"
						size={'lg'}
						onClick={() => fetchNextPage()}
						disabled={isFetchingNextPage}
					>
						{t('loadMore')}
					</Button>
				)}
			</div>
		</section>
	)
}
