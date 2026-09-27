import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useDebounce } from '@/hooks/useDebounce'

beforeEach(() => {
	vi.useFakeTimers()
})

afterEach(() => {
	vi.useRealTimers()
})

const renderDebounce = (value: string, delay = 500) =>
	renderHook((props) => useDebounce(props.value, props.delay), {
		initialProps: { value, delay },
	})

describe('useDebounce', () => {
	it("birinchi render'da boshlang'ich qiymatni darhol qaytaradi", () => {
		const { result } = renderDebounce('a')

		expect(result.current).toBe('a')
	})

	it('delay tugamaguncha eski qiymatni qaytaradi', () => {
		const { result, rerender } = renderDebounce('a')

		rerender({ value: 'b', delay: 500 })
		act(() => vi.advanceTimersByTime(499))

		expect(result.current).toBe('a')
	})

	it('delay tugagach yangi qiymatni qaytaradi', () => {
		const { result, rerender } = renderDebounce('a')

		rerender({ value: 'b', delay: 500 })
		act(() => vi.advanceTimersByTime(500))

		expect(result.current).toBe('b')
	})

	it("tez-tez o'zgarganda taymer qaytadan boshlanadi va faqat oxirgi qiymat qoladi", () => {
		const { result, rerender } = renderDebounce('a')

		rerender({ value: 'ab', delay: 500 })
		act(() => vi.advanceTimersByTime(300))
		rerender({ value: 'abc', delay: 500 })
		act(() => vi.advanceTimersByTime(300))

		// 'ab' dan beri 600ms o'tdi, lekin 'abc' dan beri faqat 300ms
		expect(result.current).toBe('a')

		act(() => vi.advanceTimersByTime(200))

		expect(result.current).toBe('abc')
	})

	it("delay o'zgarsa yangi delay bo'yicha kutadi", () => {
		const { result, rerender } = renderDebounce('a', 500)

		rerender({ value: 'b', delay: 1000 })
		act(() => vi.advanceTimersByTime(500))

		expect(result.current).toBe('a')

		act(() => vi.advanceTimersByTime(500))

		expect(result.current).toBe('b')
	})
})
