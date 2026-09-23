import type { InfiniteData, QueryClient } from '@tanstack/react-query'

import type {
	IGetListingResponse,
	TListingRemoveUser,
} from '@/types/listing.types'

import { listingCachePredicate, listingKeys } from './querykeys/listing'

type TListingCache =
	IGetListingResponse | InfiniteData<IGetListingResponse> | undefined

const isInfinite = (
	d: NonNullable<TListingCache>,
): d is InfiniteData<IGetListingResponse> =>
	'pages' in d && Array.isArray(d.pages)

const mapListing = (
	old: TListingCache,
	fn: (list: TListingRemoveUser[]) => TListingRemoveUser[],
): TListingCache => {
	if (!old) return old

	if (isInfinite(old)) {
		return {
			...old,
			pages: old.pages.map((p) => mapListing(p, fn) as IGetListingResponse),
		}
	}

	if (!old.data.listings) return old

	return { ...old, data: { ...old.data, listings: fn(old.data.listings) } }
}

export const applyLikeToCache = (
	queryClient: QueryClient,
	id: string,
	liked: boolean,
) => {
	queryClient.setQueriesData<TListingCache>(
		{ predicate: listingCachePredicate },
		(old) =>
			mapListing(old, (list) =>
				list.map((i) => (i.id === id ? { ...i, isLiked: liked } : i)),
			),
	)

	if (!liked) {
		queryClient.setQueriesData<TListingCache>(
			{ queryKey: [listingKeys.liked] },
			(old) => mapListing(old, (list) => list.filter((i) => i.id !== id)),
		)
	}
}
