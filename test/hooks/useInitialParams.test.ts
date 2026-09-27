import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useInitialParams } from '@/hooks/useIntitalParams'

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

beforeEach(() => {
	nav.searchParams = new URLSearchParams()
	nav.replace.mockClear()
})

describe('useInitialParams', () => {
	it("URL'da parametr bo'lmasa sort, page, limit standart qiymatlarini qo'shadi", () => {
		renderHook(() => useInitialParams())

		expect(nav.replace).toHaveBeenCalledTimes(1)
		expect(nav.replace).toHaveBeenCalledWith(
			'/catalog?sort=all&page=1&limit=10',
			{ scroll: false },
		)
	})

	it("mavjud parametrlarni saqlab, faqat yetishmaganlarini qo'shadi", () => {
		nav.searchParams = new URLSearchParams('page=3&region=SAMARQAND')

		renderHook(() => useInitialParams())

		expect(nav.replace).toHaveBeenCalledWith(
			'/catalog?page=3&region=SAMARQAND&sort=all&limit=10',
			{ scroll: false },
		)
	})

	it("barcha standart parametrlar bor bo'lsa router.replace chaqirilmaydi", () => {
		nav.searchParams = new URLSearchParams('sort=newest&page=2&limit=20')

		renderHook(() => useInitialParams())

		expect(nav.replace).not.toHaveBeenCalled()
	})

	it("qayta render'da ikkinchi marta replace qilmaydi", () => {
		const { rerender } = renderHook(() => useInitialParams())

		rerender()
		rerender()

		expect(nav.replace).toHaveBeenCalledTimes(1)
	})
})
