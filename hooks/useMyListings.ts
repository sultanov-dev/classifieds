import { useQuery } from '@tanstack/react-query'
import { useLocale } from 'next-intl'

import { listingKeys } from '@/lib/querykeys/listing'
import { listingService } from '@/services/listing/listing.service'
import type { IGetListingResponse } from '@/types/listing.types'

export const useMyListings = (initialData: IGetListingResponse) => {
	const locale = useLocale()

	const { data, isFetching, isLoading } = useQuery({
		queryKey: [listingKeys.myListings, locale],
		queryFn: () => listingService.getMylistings(),
		select: (data) => data.data,
		initialData: initialData,
		staleTime: 60 * 1000,
	})

	const isListingLoad = isFetching || isLoading

	return { data, isListingLoad }
}
