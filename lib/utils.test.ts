import { createTranslator } from 'next-intl'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import messages from '@/messages/uz.json'
import type { TTranslator } from '@/types/i18n.types'

import {
	formatAdDate,
	formatCurrency,
	formatRelativeTime,
	getInitials,
} from './utils'

describe('formatCurrency', () => {
	it("bo'sh string berilsa string 0 qaytadi", () => {
		expect(formatCurrency('')).toBe('0')
	})

	it('null qiymat berilsa string 0 qaytadi', () => {
		expect(formatCurrency(Number(null))).toBe('0')
	})

	it('string harf qiymat berilsa 0 qaytadi', () => {
		expect(formatCurrency('asfs')).toBe('0')
	})

	it('1500000 qiymatni UZSga aylantiradi', () => {
		const value = 1500000
		const result = formatCurrency(value, { locale: 'uz-UZ', currency: 'UZS' })

		expect(result.replace(/\u00A0|\u202F/g, ' ')).toMatch(
			/1 500 000,00 so['ʻ]m/,
		)
	})

	it('1500000 qiymatni USDga aylantiradi', () => {
		const value = '1500000'
		const result = formatCurrency(value, { locale: 'en-US', currency: 'USD' })

		expect(result).toBe('$1,500,000.00')
	})
})

describe('formatAdDate', () => {
	it("UTC toshkent vaqtiga +5 qo'shilsa etangi kun chiqishi kerak", () => {
		const date = '2026-01-01T20:00:00Z'

		expect(formatAdDate(date)).toBe('02.01.2026 01:00')
	})
})

describe('getInitials', () => {
	it("qiymat null bo'lsa U harfini qaytaradi", () => {
		expect(getInitials(null)).toBe('U')
	})

	it("qiymat bitta so'z bo'lsa 2 harf qaytaradi probellar bo'lsa ham", () => {
		const name = 'Diyorbek  '

		expect(getInitials(name)).toBe('DI')
	})
})

const NOW = new Date('2026-09-27T12:00:00Z')

const MINUTE = 60
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR

const ago = (seconds: number) => new Date(NOW.getTime() - seconds * 1000)

const fakeT = vi.fn((key: string, values?: { count: number }) =>
	values ? `${key}:${values.count}` : key,
) as unknown as TTranslator<'Time'>

describe('formatRelativeTime', () => {
	beforeEach(() => {
		vi.useFakeTimers()
		vi.setSystemTime(NOW)
	})

	afterEach(() => vi.useRealTimers())

	it.each([
		{ label: '57 soniya', seconds: 57, expected: 'now' },
		{ label: '58 soniya', seconds: 58, expected: 'now' },
		{ label: '59 soniya', seconds: 59, expected: 'now' },
		{ label: '1 daqiqa', seconds: MINUTE, expected: 'minute:1' },
		{ label: '59 daqiqa', seconds: 59 * MINUTE + 59, expected: 'minute:59' },
		{ label: '1 soat', seconds: HOUR, expected: 'hour:1' },
		{ label: '23 soat', seconds: 23 * HOUR, expected: 'hour:23' },
		{ label: '1 kun', seconds: DAY, expected: 'day:1' },
		{ label: '6 kun', seconds: 6 * DAY, expected: 'day:6' },
		{ label: '7 kun', seconds: 7 * DAY, expected: 'week:1' },
		{ label: '29 kun', seconds: 29 * DAY, expected: 'week:4' },
		{ label: '30 kun', seconds: 30 * DAY, expected: 'month:1' },
		{ label: '364 kun', seconds: 364 * DAY, expected: 'month:12' },
		{ label: '365 kun', seconds: 365 * DAY, expected: 'year:1' },
		{ label: '3 yil', seconds: 3 * 365 * DAY, expected: 'year:3' },
	])('$label oldin expected keyin', ({ seconds, expected }) => {
		expect(formatRelativeTime(ago(seconds), fakeT)).toBe(expected)
	})

	it('string, number va Date qabul qiladi', () => {
		const date = ago(2 * HOUR)

		expect(formatRelativeTime(date, fakeT)).toBe('hour:2')
		expect(formatRelativeTime(date.getTime(), fakeT)).toBe('hour:2')
		expect(formatRelativeTime(date.toISOString(), fakeT)).toBe('hour:2')
	})

	it('kelajakdagi sana uchun "now" qaytaradi', () => {
		const future = new Date(NOW.getTime() + DAY * 1000)

		expect(formatRelativeTime(future, fakeT)).toBe('now')
	})

	it("noto'g'ri sana uchun now qaytaradi", () => {
		expect(formatRelativeTime('bu-sana-emas', fakeT)).toBe('now')
	})

	it("haqiqiy o'zbekcha tarjima bilan ishlaydi", () => {
		const t = createTranslator({ locale: 'uz', messages, namespace: 'Time' })

		expect(formatRelativeTime(ago(10), t)).toBe('hozirgina')
		expect(formatRelativeTime(ago(5 * MINUTE), t)).toBe('5 daqiqa oldin')
		expect(formatRelativeTime(ago(3 * DAY), t)).toBe('3 kun oldin')
	})
})
