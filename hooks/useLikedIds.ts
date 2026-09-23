import { useQuery } from '@tanstack/react-query'

import { listingKeys } from '@/lib/querykeys/listing'
import { getAccesToken } from '@/services/auth/auth.helper'
import { listingService } from '@/services/listing/listing.service'

export const useLikedIds = () => {
	const { data } = useQuery({
		queryKey: [listingKeys.likedIds],
		queryFn: async () => {
			const res = await listingService.getLikedListings()
			return new Set(res.data.listings.map((l) => l.id))
		},
		enabled: Boolean(getAccesToken()),
		staleTime: 5 * 60_000,
	})

	return data
}
