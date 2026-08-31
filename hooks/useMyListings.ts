import { useQuery } from '@tanstack/react-query'

import { listingService } from '@/services/listing.service'

export const useMyListings = () => {
	const { data, isFetching, isLoading } = useQuery({
		queryKey: ['my-listings'],
		queryFn: () => listingService.getMylistings(),
		select: (data) => data,
	})

	const isListingLoad = isFetching || isLoading

	return { data, isListingLoad }
}
