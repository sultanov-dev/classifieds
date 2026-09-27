import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useFilter } from '@/hooks/useFilter'
import { useFilterStore } from '@/store/useFilterStore'
import { ESORT } from '@/types/listing.types'

const nav = vi.hoisted(() => ({
	searchParams: new URLSearchParams(),
	replace: vi.fn(),
}))

vi.mock('next/navigation', () => ({
	useSearchParams: () => nav.searchParams,
}))

vi.mock('@/i18n/navigation', () => ({
	usePathname: () => '/catalog',
	useRouter: () => ({ replace: nav.replace }),
}))

const INITIAL_QUERY_PARAMS = {
	q: '',
	sort: ESORT.ALL,
	page: 1,
	limit: 10,
	currency: '',
	category: '',
	region: '',
}

const storeParams = () => useFilterStore.getState().queryParams

beforeEach(() => {
	nav.searchParams = new URLSearchParams()
	nav.replace.mockClear()
	useFilterStore.setState({
		queryParams: { ...INITIAL_QUERY_PARAMS },
		isFilterUpdated: false,
	})
})

describe('useFilter', () => {
	it("mount bo'lganda URL parametrlarini store'ga ko'chiradi", () => {
		nav.searchParams = new URLSearchParams('region=SAMARQAND&q=iphone')

		const { result } = renderHook(() => useFilter())

		expect(result.current.queryParams).toMatchObject({
			region: 'SAMARQAND',
			q: 'iphone',
		})
		expect(result.current.isFilterUpdated).toBe(true)
	})

	it("URL bo'sh bo'lsa store o'zgarmaydi", () => {
		renderHook(() => useFilter())

		expect(storeParams()).toEqual(INITIAL_QUERY_PARAMS)
		expect(useFilterStore.getState().isFilterUpdated).toBe(false)
	})

	describe('updateQueryParams', () => {
		it("mavjud parametrlarni saqlab yangisini URL'ga qo'shadi va store'ni yangilaydi", () => {
			nav.searchParams = new URLSearchParams('region=SAMARQAND')
			const { result } = renderHook(() => useFilter())

			act(() => result.current.updateQueryParams('category', 'transport'))

			expect(nav.replace).toHaveBeenCalledWith(
				'/catalog?region=SAMARQAND&category=transport',
			)
			expect(storeParams().category).toBe('transport')
		})

		it('mavjud parametr qiymatini almashtiradi', () => {
			nav.searchParams = new URLSearchParams('page=2')
			const { result } = renderHook(() => useFilter())

			act(() => result.current.updateQueryParams('page', '5'))

			expect(nav.replace).toHaveBeenCalledWith('/catalog?page=5')
		})

		it("bo'sh qiymat berilsa kalitni URL'dan o'chiradi", () => {
			nav.searchParams = new URLSearchParams(
				'region=SAMARQAND&category=transport',
			)
			const { result } = renderHook(() => useFilter())

			act(() => result.current.updateQueryParams('category', ''))

			expect(nav.replace).toHaveBeenCalledWith('/catalog?region=SAMARQAND')
			expect(storeParams().category).toBe('')
		})
	})

	describe('resetQueryParams', () => {
		it("store'ni tozalaydi va URL'dan barcha parametrlarni olib tashlaydi", () => {
			nav.searchParams = new URLSearchParams('region=SAMARQAND')
			const { result } = renderHook(() => useFilter())

			act(() => result.current.resetQueryParams())

			expect(nav.replace).toHaveBeenCalledWith('/catalog')
			expect(storeParams()).toEqual(INITIAL_QUERY_PARAMS)
		})
	})
})
