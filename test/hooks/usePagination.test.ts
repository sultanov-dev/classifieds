import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { usePagination } from '@/hooks/usePagination'

// URL'dagi ?page= qiymatini har test o'zi belgilaydi
const nav = vi.hoisted(() => ({ searchParams: new URLSearchParams() }))

vi.mock('next/navigation', () => ({
	useSearchParams: () => nav.searchParams,
}))

const setPage = (page: string | null) => {
	nav.searchParams = new URLSearchParams(page === null ? '' : { page })
}

beforeEach(() => {
	setPage(null)
})

describe('usePagination', () => {
	describe('currentPage', () => {
		it.each([
			{ label: "?page= yo'q", page: null, expected: 1 },
			{ label: '?page=5', page: '5', expected: 5 },
			{ label: '?page=abc', page: 'abc', expected: 1 },
			{ label: '?page=0', page: '0', expected: 1 },
		])('$label → $expected', ({ page, expected }) => {
			setPage(page)

			const { result } = renderHook(() => usePagination(20))

			expect(result.current.currentPage).toBe(expected)
		})
	})

	describe('pages: 10 va undan kam sahifa', () => {
		it.each([
			{ total: 0, expected: [] },
			{ total: 1, expected: [1] },
			{ total: 5, expected: [1, 2, 3, 4, 5] },
			{ total: 10, expected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
		])(
			"total=$total bo'lsa barcha sahifalar '...' siz",
			({ total, expected }) => {
				const { result } = renderHook(() => usePagination(total))

				expect(result.current.pages).toEqual(expected)
			},
		)
	})

	describe("pages: 10 dan ko'p sahifa (total=20)", () => {
		it.each([
			// Boshida: 1–4, keyin oxirgi sahifa
			{ current: '1', expected: [1, 2, 3, 4, '...', 20] },
			{ current: '3', expected: [1, 2, 3, 4, '...', 20] },
			// O'rtada: qo'shnilar bilan, ikki tomonda '...'
			{ current: '4', expected: [1, '...', 3, 4, 5, '...', 20] },
			{ current: '10', expected: [1, '...', 9, 10, 11, '...', 20] },
			{ current: '17', expected: [1, '...', 16, 17, 18, '...', 20] },
			// Oxirida: birinchi sahifa, keyin oxirgi 4 ta
			{ current: '18', expected: [1, '...', 17, 18, 19, 20] },
			{ current: '20', expected: [1, '...', 17, 18, 19, 20] },
		])('page=$current → $expected', ({ current, expected }) => {
			setPage(current)

			const { result } = renderHook(() => usePagination(20))

			expect(result.current.pages).toEqual(expected)
		})
	})

	it("total=11 (chegara) bo'lsa '...' ishlatiladi", () => {
		const { result } = renderHook(() => usePagination(11))

		expect(result.current.pages).toEqual([1, 2, 3, 4, '...', 11])
	})
})
