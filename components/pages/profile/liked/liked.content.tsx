'use client'

import { useQuery } from '@tanstack/react-query'

import { ProductGrid } from '@/components/product/product.grid'
import { listingKeys } from '@/lib/querykeys/listing'
import { listingService } from '@/services/listing/listing.service'
import { GridSkeleton } from '@/shared/grid.loader'
import { HasNoResult } from '@/shared/hasNoResult'
import type { TListingRemoveUser } from '@/types/listing.types'

export function LikedContent() {
	const { data, isFetching, isLoading } = useQuery({
		queryKey: [listingKeys.liked],
		queryFn: () => listingService.getLikedListings(),
		select: (data) => data.data,
		staleTime: 60 * 1000,
	})

	const listings = data?.listings as TListingRemoveUser[]
	const isLikedLoading = isFetching || isLoading
	const hasNoResult = !isLikedLoading && listings.length === 0

	return (
		<section className="mt-10">
			{isLikedLoading ? (
				<GridSkeleton />
			) : hasNoResult ? (
				<HasNoResult text={'Yoqtirilganlar mavjud emas'} />
			) : (
				<ProductGrid listings={listings} />
			)}
		</section>
	)
}
