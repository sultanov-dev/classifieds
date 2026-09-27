import { act, waitFor } from '@testing-library/react'
import Cookie from 'js-cookie'
import { http, HttpResponse } from 'msw'
import { toast } from 'sonner'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useLiked } from '@/hooks/useLiked'
import { listingKeys } from '@/lib/querykeys/listing'
import { useLikedStore } from '@/store/liked.store'
import { buildListingItem, buildListingRes } from '@/test/factories'
import { server } from '@/test/msw/server'
import { createTestQueryClient, renderHookWithProviders } from '@/test/render'
import { ETokens } from '@/types/auth.types'
import type { IGetListingResponse } from '@/types/listing.types'

vi.mock('sonner', () => ({
	toast: { success: vi.fn(), error: vi.fn() },
}))

const LISTING_ID = 'a'
const CATALOG_KEY = [listingKeys.catalog, { page: 1 }]

beforeEach(() => {
	useLikedStore.setState({ overrides: {} })
})

/** Foydalanuvchi tizimga kirgan holat (useLikedIds shunda yoqiladi) */
const login = () => Cookie.set(ETokens.ACCESSTOKEN, 'token')

/** Server "like qo'yilgan" deb qaytaradigan e'lonlar */
const mockServerLikedIds = (ids: string[]) =>
	server.use(
		http.get('*/listings/liked', () =>
			HttpResponse.json(
				buildListingRes(ids.map((id) => buildListingItem({ id }))),
			),
		),
	)

/**
 * Like so'rovini qo'lda yakunlanadigan qiladi: optimistic holatni server
 * javobi kelmasidan oldin tekshirish uchun.
 */
const holdLikeRequest = () => {
	let release!: (response: Response) => void
	const response = new Promise<Response>((resolve) => (release = resolve))
	const requestedIds: string[] = []

	server.use(
		http.post('*/listings/:id/like', ({ params }) => {
			requestedIds.push(params.id as string)

			return response
		}),
	)

	return { release, requestedIds }
}

const renderLiked = (initialLiked: boolean) => {
	const queryClient = createTestQueryClient()
	queryClient.setQueryData(
		CATALOG_KEY,
		buildListingRes([
			buildListingItem({ id: LISTING_ID, isLiked: initialLiked }),
		]),
	)

	return renderHookWithProviders(() => useLiked(initialLiked, LISTING_ID), {
		queryClient,
	})
}

const cachedIsLiked = (queryClient: ReturnType<typeof createTestQueryClient>) =>
	queryClient.getQueryData<IGetListingResponse>(CATALOG_KEY)?.data.listings[0]
		.isLiked

describe('useLiked', () => {
	describe('isLiked qiymati', () => {
		it.each([true, false])(
			"token yo'q bo'lsa initialLiked (%s) qiymatini qaytaradi",
			(initialLiked) => {
				const { result } = renderLiked(initialLiked)

				expect(result.current.isLiked).toBe(initialLiked)
			},
		)

		it("token bor bo'lsa serverdagi likedIds ro'yxatiga qaraydi", async () => {
			login()
			mockServerLikedIds([LISTING_ID])

			const { result } = renderLiked(false)

			await waitFor(() => expect(result.current.isLiked).toBe(true))
		})

		it("store'dagi override server qiymatidan ustun turadi", async () => {
			login()
			mockServerLikedIds([LISTING_ID])
			useLikedStore.setState({ overrides: { [LISTING_ID]: false } })

			const { result, queryClient } = renderLiked(true)
			await waitFor(() =>
				expect(queryClient.getQueryData([listingKeys.likedIds])).toBeDefined(),
			)

			expect(result.current.isLiked).toBe(false)
		})
	})

	describe('toggle', () => {
		it("server javobini kutmasdan isLiked, store va cache'ni yangilaydi (optimistic)", async () => {
			const { release, requestedIds } = holdLikeRequest()
			const { result, queryClient } = renderLiked(false)

			act(() => result.current.toggle())

			await waitFor(() => expect(result.current.isLiked).toBe(true))
			expect(useLikedStore.getState().overrides[LISTING_ID]).toBe(true)
			expect(cachedIsLiked(queryClient)).toBe(true)
			expect(result.current.isPending).toBe(true)
			expect(requestedIds).toEqual([LISTING_ID])

			release(HttpResponse.json({ ok: true }))
			await waitFor(() => expect(result.current.isPending).toBe(false))
			expect(result.current.isLiked).toBe(true)
		})

		it('like olib tashlash ham xuddi shunday ishlaydi', async () => {
			const { result, queryClient } = renderLiked(true)

			act(() => result.current.toggle())

			await waitFor(() => expect(result.current.isPending).toBe(false))
			expect(result.current.isLiked).toBe(false)
			expect(cachedIsLiked(queryClient)).toBe(false)
		})

		it("server xato qaytarsa isLiked, store va cache'ni oldingi holatga qaytaradi", async () => {
			server.use(
				http.post('*/listings/:id/like', () =>
					HttpResponse.json({}, { status: 500 }),
				),
			)
			const { result, queryClient } = renderLiked(false)

			act(() => result.current.toggle())

			await waitFor(() => expect(result.current.isPending).toBe(false))
			expect(result.current.isLiked).toBe(false)
			expect(useLikedStore.getState().overrides[LISTING_ID]).toBe(false)
			expect(cachedIsLiked(queryClient)).toBe(false)
		})

		it("server xato qaytarsa umumiy xato xabarini ko'rsatadi", async () => {
			server.use(
				http.post('*/listings/:id/like', () =>
					HttpResponse.json({}, { status: 500 }),
				),
			)
			const { result } = renderLiked(false)

			act(() => result.current.toggle())

			await waitFor(() =>
				expect(toast.error).toHaveBeenCalledWith('Xatolik boʻldi'),
			)
		})

		it("401 (tizimga kirmagan) bo'lsa 'Avval tizimga kiring' xabarini ko'rsatadi", async () => {
			// axios interceptor avval refresh qilib qayta urinadi, ikkinchi 401 hook'ga yetadi
			server.use(
				http.post('*/listings/:id/like', () =>
					HttpResponse.json({}, { status: 401 }),
				),
			)
			const { result } = renderLiked(false)

			act(() => result.current.toggle())

			await waitFor(() =>
				expect(toast.error).toHaveBeenCalledWith('Avval tizimga kiring'),
			)
			expect(toast.error).toHaveBeenCalledTimes(1)
			expect(result.current.isLiked).toBe(false)
		})
	})
})
