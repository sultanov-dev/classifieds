import { useInfiniteQuery } from '@tanstack/react-query'

import { listingService } from '@/services/listing.service'
import type { IGetListingResponse } from '@/types/listing.types'

export const useListings = (
	type: 'latest' | 'all',
	initialData: IGetListingResponse,
) => {
	const { hasNextPage, isFetchingNextPage, fetchNextPage, data } =
		useInfiniteQuery({
			queryKey: ['listings', type],
			queryFn: ({ pageParam }) =>
				listingService.getLisings({ page: pageParam, type, limit: 10 }),
			initialPageParam: 1,
			initialData: {
				pages: [initialData],
				pageParams: [1],
			},
			getNextPageParam: (lastPage, allPages) => {
				if (lastPage.data.listings.length < 10) return undefined

				return allPages.length + 1
			},
		})

	return { hasNextPage, isFetchingNextPage, data, fetchNextPage }
}
