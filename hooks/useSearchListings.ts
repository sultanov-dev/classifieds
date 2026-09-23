import { useQuery } from '@tanstack/react-query'

import { listingKeys } from '@/lib/querykeys/listing'
import { listingService } from '@/services/listing/listing.service'

export const useSearchListings = (searchTerm: string) => {
	return useQuery({
		queryKey: [listingKeys.serchListings, searchTerm],
		queryFn: () => listingService.getLisings({ q: searchTerm }),
		select: (data) => data.data,
		enabled: !!searchTerm,
	})
}
