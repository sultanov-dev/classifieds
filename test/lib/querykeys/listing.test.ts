import { describe, expect, it } from 'vitest'

import {
	listingCachePredicate,
	listingKeys,
	listingListPredicate,
} from '@/lib/querykeys/listing'

/** Predicate faqat query.queryKey ni o'qiydi */
const query = (...queryKey: unknown[]) => ({ queryKey })

describe('listingCachePredicate', () => {
	it.each([
		listingKeys.root,
		listingKeys.catalog,
		listingKeys.liked,
		listingKeys.viewed,
	])("'%s' bilan boshlanadigan key uchun true", (root) => {
		expect(listingCachePredicate(query(root, { page: 1 }))).toBe(true)
	})

	it.each([
		listingKeys.myListings,
		listingKeys.serchListings,
		listingKeys.likedIds,
		'comments',
	])("'%s' bilan boshlanadigan key uchun false", (root) => {
		expect(listingCachePredicate(query(root))).toBe(false)
	})

	it("root key'ning birinchi elementida bo'lmasa false", () => {
		expect(listingCachePredicate(query('other', listingKeys.root))).toBe(false)
	})

	it("detail key (['listing', 'detail', id]) uchun false", () => {
		expect(listingCachePredicate(query(...listingKeys.detail('1')))).toBe(false)
	})
})

describe('listingListPredicate', () => {
	it.each([listingKeys.root, listingKeys.catalog, listingKeys.myListings])(
		"'%s' uchun true",
		(root) => {
			expect(listingListPredicate(query(root))).toBe(true)
		},
	)

	it.each([listingKeys.liked, listingKeys.viewed, listingKeys.likedIds])(
		"'%s' uchun false",
		(root) => {
			expect(listingListPredicate(query(root))).toBe(false)
		},
	)
})
