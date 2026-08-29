import { useQuery } from '@tanstack/react-query'

import { listingService } from '@/services/listing.service'

export const useSearchListings = (searchTerm: string) => {
	return useQuery({
		queryKey: ['search-listings', searchTerm],
		queryFn: () => listingService.getLisings({ q: searchTerm }),
		select: (data) => data.data,
		enabled: !!searchTerm,
	})
}
