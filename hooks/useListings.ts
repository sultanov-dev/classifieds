import { useQuery } from '@tanstack/react-query'

import { listingService } from '@/services/listing.service'

export const useListings = () => {
	return useQuery({
		queryKey: ['listings'],
		queryFn: () => listingService.getLisings(),
		select: (data) => data.data,
	})
}
