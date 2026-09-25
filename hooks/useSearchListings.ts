import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'

import { listingKeys } from '@/lib/querykeys/listing'
import { listingService } from '@/services/listing/listing.service'

export const useSearchListings = (searchTerm: string) => {
	const locale = useLocale()

	return useQuery({
		queryKey: [listingKeys.serchListings, searchTerm, locale],
		queryFn: () => listingService.getLisings({ q: searchTerm }),
		select: (data) => data.data,
		enabled: !!searchTerm,
	})
}
