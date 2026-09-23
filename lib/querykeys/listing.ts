import type { QueryKey } from '@tanstack/react-query'

export const listingKeys = {
	root: 'listings',
	catalog: 'catalog-explorer',
	liked: 'liked-my-listings',
	viewed: 'viewed-listings',
	myListings: 'my-listings',
	serchListings: 'search-listings',
	detail: (id: string) => ['listing', id] as const,
} as const

export const LISTING_ROOTS: string[] = [
	listingKeys.root,
	listingKeys.catalog,
	listingKeys.liked,
	listingKeys.viewed,
]

export const listingCachePredicate = (q: { queryKey: QueryKey }) =>
	LISTING_ROOTS.includes(q.queryKey[0] as string)
