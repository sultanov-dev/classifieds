import { useInfiniteQuery } from '@tanstack/react-query'

import { listingService } from '@/services/listing.service'

export const useInifinityListings = () => {
	const { hasNextPage, isFetchingNextPage, fetchNextPage, data, isLoading } =
		useInfiniteQuery({
			queryKey: ['viewed-listings'],
			queryFn: ({ pageParam }) =>
				listingService.getUserViewed({ cursor: pageParam, limit: 10 }),
			initialPageParam: null as string | null,
			getNextPageParam: (lastPage) => {
				return lastPage.data.nextCursor ?? undefined
			},
		})

	return { hasNextPage, isFetchingNextPage, data, fetchNextPage, isLoading }
}
