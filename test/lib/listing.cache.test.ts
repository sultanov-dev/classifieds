import { QueryClient, type InfiniteData } from '@tanstack/react-query'
import { beforeEach, describe, expect, it } from 'vitest'

import { applyLikeToCache } from '@/lib/listing.cache'
import { listingKeys } from '@/lib/querykeys/listing'
import {
	buildInfiniteListingRes,
	buildListingItem,
	buildListingRes,
} from '@/test/factories'
import type { IGetListingResponse } from '@/types/listing.types'

let queryClient: QueryClient

beforeEach(() => {
	queryClient = new QueryClient()
})

/** Oddiy (sahifali) ro'yxatdagi { id: isLiked } xaritasi */
const likedMap = (key: unknown[]) =>
	Object.fromEntries(
		queryClient
			.getQueryData<IGetListingResponse>(key)!
			.data.listings.map((l) => [l.id, l.isLiked]),
	)

describe('applyLikeToCache', () => {
	describe('likedIds (Set)', () => {
		const IDS_KEY = [listingKeys.likedIds]

		it("like qo'yilganda id Set'ga qo'shiladi", () => {
			queryClient.setQueryData(IDS_KEY, new Set(['a']))

			applyLikeToCache(queryClient, 'b', true)

			expect(queryClient.getQueryData(IDS_KEY)).toEqual(new Set(['a', 'b']))
		})

		it("like olinganda id Set'dan o'chiriladi", () => {
			queryClient.setQueryData(IDS_KEY, new Set(['a', 'b']))

			applyLikeToCache(queryClient, 'a', false)

			expect(queryClient.getQueryData(IDS_KEY)).toEqual(new Set(['b']))
		})

		it("eski Set'ni o'zgartirmaydi, yangi Set yaratadi", () => {
			const original = new Set(['a'])
			queryClient.setQueryData(IDS_KEY, original)

			applyLikeToCache(queryClient, 'b', true)

			expect(original).toEqual(new Set(['a']))
		})

		it("Set cache'da bo'lmasa uni yaratmaydi", () => {
			applyLikeToCache(queryClient, 'a', true)

			expect(queryClient.getQueryData(IDS_KEY)).toBeUndefined()
		})
	})

	describe("ro'yxatlardagi isLiked", () => {
		it.each([
			listingKeys.root,
			listingKeys.catalog,
			listingKeys.liked,
			listingKeys.viewed,
		])(
			"'%s' ro'yxatida faqat shu id ning isLiked qiymatini yangilaydi",
			(root) => {
				const key = [root, { page: 1 }]
				queryClient.setQueryData(
					key,
					buildListingRes([
						buildListingItem({ id: 'a', isLiked: false }),
						buildListingItem({ id: 'b', isLiked: false }),
					]),
				)

				applyLikeToCache(queryClient, 'a', true)

				expect(likedMap(key)).toEqual({ a: true, b: false })
			},
		)

		it("infinite query'ning barcha sahifalarida yangilaydi", () => {
			const key = [listingKeys.catalog]
			queryClient.setQueryData(
				key,
				buildInfiniteListingRes([
					[buildListingItem({ id: 'a', isLiked: true })],
					[buildListingItem({ id: 'b' }), buildListingItem({ id: 'a' })],
				]),
			)

			applyLikeToCache(queryClient, 'a', false)

			const data =
				queryClient.getQueryData<InfiniteData<IGetListingResponse>>(key)!
			const flat = data.pages.flatMap((p) =>
				p.data.listings.map((l) => [l.id, l.isLiked]),
			)
			expect(flat).toEqual([
				['a', false],
				['b', false],
				['a', false],
			])
			expect(data.pageParams).toEqual([1, 2])
		})

		it("predicate'ga kirmaydigan ro'yxatlarga (masalan my-listings) tegmaydi", () => {
			const key = [listingKeys.myListings]
			const res = buildListingRes([buildListingItem({ id: 'a' })])
			queryClient.setQueryData(key, res)

			applyLikeToCache(queryClient, 'a', true)

			expect(queryClient.getQueryData(key)).toBe(res)
		})

		it("data.listings bo'lmagan javobni o'zgarishsiz qoldiradi", () => {
			const key = [listingKeys.root]
			const broken = { success: false, message: 'err', data: null }
			queryClient.setQueryData(key, broken)

			applyLikeToCache(queryClient, 'a', true)

			expect(queryClient.getQueryData(key)).toBe(broken)
		})
	})

	describe("liked ro'yxati", () => {
		const LIKED_KEY = [listingKeys.liked]

		it("like olinganda e'lon liked ro'yxatidan o'chiriladi", () => {
			queryClient.setQueryData(
				LIKED_KEY,
				buildListingRes([
					buildListingItem({ id: 'a', isLiked: true }),
					buildListingItem({ id: 'b', isLiked: true }),
				]),
			)

			applyLikeToCache(queryClient, 'a', false)

			expect(likedMap(LIKED_KEY)).toEqual({ b: true })
		})

		it("like qo'yilganda liked ro'yxatiga yangi e'lon qo'shilmaydi", () => {
			queryClient.setQueryData(
				LIKED_KEY,
				buildListingRes([buildListingItem({ id: 'b', isLiked: true })]),
			)

			applyLikeToCache(queryClient, 'a', true)

			expect(likedMap(LIKED_KEY)).toEqual({ b: true })
		})
	})
})
