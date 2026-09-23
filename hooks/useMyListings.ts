import { useQuery } from '@tanstack/react-query'

import { listingKeys } from '@/lib/querykeys/listing'
import { listingService } from '@/services/listing.service'
import type { IGetListingResponse } from '@/types/listing.types'

export const useMyListings = (initialData: IGetListingResponse) => {
	const { data, isFetching, isLoading } = useQuery({
		queryKey: [listingKeys.myListings],
		queryFn: () => listingService.getMylistings(),
		select: (data) => data.data,
		initialData: initialData,
		staleTime: 60 * 1000,
	})

	const isListingLoad = isFetching || isLoading

	return { data, isListingLoad }
}
