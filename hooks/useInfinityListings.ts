import { useInfiniteQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'

import { listingKeys } from '@/lib/querykeys/listing'
import { listingService } from '@/services/listing/listing.service'

export const useInifinityListings = () => {
	const locale = useLocale()

	const { hasNextPage, isFetchingNextPage, fetchNextPage, data, isLoading } =
		useInfiniteQuery({
			queryKey: [listingKeys.viewed, locale],
			queryFn: ({ pageParam }) =>
				listingService.getUserViewed({ cursor: pageParam, limit: 10 }),
			initialPageParam: null as string | null,
			getNextPageParam: (lastPage) => {
				return lastPage.data.nextCursor ?? undefined
			},
		})

	return { hasNextPage, isFetchingNextPage, data, fetchNextPage, isLoading }
}
