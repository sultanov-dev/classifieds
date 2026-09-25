import type { QueryKey } from '@tanstack/react-query'

export const listingKeys = {
	root: 'listings',
	catalog: 'catalog-explorer',
	liked: 'liked-my-listings',
	viewed: 'viewed-listings',
	myListings: 'my-listings',
	serchListings: 'search-listings',
	likedIds: 'listing-ids',
	detail: (id: string) => ['listing', 'detail', id] as const,
} as const

const byRoot = (roots: readonly string[]) => (query: { queryKey: QueryKey }) =>
	roots.includes(query.queryKey[0] as string)

export const LISTING_ROOTS = [
	listingKeys.root,
	listingKeys.catalog,
	listingKeys.liked,
	listingKeys.viewed,
] as const

export const listingCachePredicate = byRoot(LISTING_ROOTS)

export const LISTING_LIST_ROOTS = [
	listingKeys.root,
	listingKeys.catalog,
	listingKeys.myListings,
] as const

export const listingListPredicate = byRoot(LISTING_LIST_ROOTS)
