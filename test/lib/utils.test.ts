import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
	formatAdDate,
	formatCurrency,
	formatRelativeTime,
	getInitials,
} from '@/lib/utils'
import { createFakeT, createUzT } from '@/test/i18n'

describe('formatCurrency', () => {
	it.each([
		{ label: "bo'sh string", amount: '' },
		{ label: 'harflardan iborat string', amount: 'abc' },
		{ label: '0 soni', amount: 0 },
	])("$label berilsa '0' qaytaradi", ({ amount }) => {
		expect(formatCurrency(amount)).toBe('0')
	})

	it('valyuta berilmasa oddiy son formatida qaytaradi (TypeError tashlamaydi)', () => {
		expect(formatCurrency(1500000)).toBe('1 500 000')
	})

	it("UZS uchun o'zbekcha formatda qaytaradi", () => {
		expect(formatCurrency(1500000, { currency: 'UZS' })).toBe(
			'1 500 000,00 soʻm',
		)
	})

	it('en-US locale bilan USD formatida qaytaradi', () => {
		expect(
			formatCurrency('1500000', { currency: 'USD', locale: 'en-US' }),
		).toBe('$1,500,000.00')
	})

	it('string ichidagi probel va vergullarni olib tashlab parse qiladi', () => {
		expect(formatCurrency('1 500 000', { currency: 'UZS' })).toBe(
			'1 500 000,00 soʻm',
		)
		expect(formatCurrency('1,500,000')).toBe('1 500 000')
	})

	it('manfiy sonni saqlab qoladi', () => {
		expect(formatCurrency('-250', { currency: 'USD', locale: 'en-US' })).toBe(
			'-$250.00',
		)
	})

	it('fractionDigits kasr qismi uzunligini belgilaydi', () => {
		expect(
			formatCurrency(1500000, { currency: 'UZS', fractionDigits: 0 }),
		).toBe('1 500 000 soʻm')
		expect(
			formatCurrency(99.5, {
				currency: 'USD',
				locale: 'en-US',
				fractionDigits: 2,
			}),
		).toBe('$99.50')
	})

	it("natijada bo'linmaydigan probel (U+00A0, U+202F) qolmaydi", () => {
		const result = formatCurrency(1500000, { currency: 'UZS' })

		expect(result).not.toMatch(/ | /)
	})
})

describe('formatAdDate', () => {
	it("UTC vaqtni Toshkent vaqtiga (+5) o'tkazib dd.mm.yyyy hh:mm formatida qaytaradi", () => {
		expect(formatAdDate('2026-03-15T06:05:00Z')).toBe('15.03.2026 11:05')
	})

	it("+5 soat qo'shilganda kun almashsa, keyingi kunni ko'rsatadi", () => {
		expect(formatAdDate('2026-01-01T20:00:00Z')).toBe('02.01.2026 01:00')
	})
})

describe('getInitials', () => {
	it.each([
		{ label: 'null', name: null },
		{ label: 'undefined', name: undefined },
		{ label: "bo'sh string", name: '' },
		{ label: 'faqat probel', name: '   ' },
	])("ism $label bo'lsa 'U' qaytaradi", ({ name }) => {
		expect(getInitials(name)).toBe('U')
	})

	it("bitta so'z bo'lsa birinchi 2 harfni katta qilib qaytaradi", () => {
		expect(getInitials('diyorbek')).toBe('DI')
	})

	it('atrofidagi probellarni hisobga olmaydi', () => {
		expect(getInitials('  Diyorbek  ')).toBe('DI')
	})

	it("ikki so'z bo'lsa har birining birinchi harfini qaytaradi", () => {
		expect(getInitials('Inomov Inomjon')).toBe('II')
	})

	it("uch va undan ortiq so'zda faqat birinchi ikkitasini oladi", () => {
		expect(getInitials('ali vali soli')).toBe('AV')
	})
})

describe('formatRelativeTime', () => {
	// "Hozir" qotirilgan: natija test qachon ishlashiga bog'liq bo'lmaydi
	const NOW = new Date('2026-09-27T12:00:00Z')

	const MINUTE = 60
	const HOUR = 60 * MINUTE
	const DAY = 24 * HOUR

	/** NOW dan `seconds` soniya oldingi sana */
	const ago = (seconds: number) => new Date(NOW.getTime() - seconds * 1000)

	const t = createFakeT<'Time'>()

	beforeEach(() => {
		vi.useFakeTimers()
		vi.setSystemTime(NOW)
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	it.each([
		// 30 soniyadan kam: darhol "now"
		{ label: '0 soniya', seconds: 0, expected: 'now' },
		{ label: '29 soniya', seconds: 29, expected: 'now' },
		// 30–59 soniya: hech bir interval 1 ga yetmaydi, oxirgi return "now"
		{ label: '30 soniya', seconds: 30, expected: 'now' },
		{ label: '59 soniya', seconds: 59, expected: 'now' },
		{ label: '1 daqiqa', seconds: MINUTE, expected: 'minute:1' },
		{ label: '59 daqiqa 59 soniya', seconds: HOUR - 1, expected: 'minute:59' },
		{ label: '1 soat', seconds: HOUR, expected: 'hour:1' },
		{ label: '23 soat', seconds: 23 * HOUR, expected: 'hour:23' },
		{ label: '1 kun', seconds: DAY, expected: 'day:1' },
		{ label: '6 kun', seconds: 6 * DAY, expected: 'day:6' },
		{ label: '7 kun', seconds: 7 * DAY, expected: 'week:1' },
		{ label: '29 kun', seconds: 29 * DAY, expected: 'week:4' },
		// 1 oy = 30 kun deb olingan
		{ label: '30 kun', seconds: 30 * DAY, expected: 'month:1' },
		{ label: '364 kun', seconds: 364 * DAY, expected: 'month:12' },
		// 1 yil = 365 kun deb olingan
		{ label: '365 kun', seconds: 365 * DAY, expected: 'year:1' },
		{ label: '3 yil', seconds: 3 * 365 * DAY, expected: 'year:3' },
	])('$label oldin → $expected', ({ seconds, expected }) => {
		expect(formatRelativeTime(ago(seconds), t)).toBe(expected)
	})

	it('Date, timestamp (number) va ISO string qabul qiladi', () => {
		const date = ago(2 * HOUR)

		expect(formatRelativeTime(date, t)).toBe('hour:2')
		expect(formatRelativeTime(date.getTime(), t)).toBe('hour:2')
		expect(formatRelativeTime(date.toISOString(), t)).toBe('hour:2')
	})

	it("kelajakdagi sana uchun 'now' qaytaradi", () => {
		const tomorrow = new Date(NOW.getTime() + DAY * 1000)

		expect(formatRelativeTime(tomorrow, t)).toBe('now')
	})

	it("noto'g'ri sana uchun 'now' qaytaradi", () => {
		expect(formatRelativeTime('bu-sana-emas', t)).toBe('now')
	})

	it("haqiqiy o'zbekcha tarjima bilan to'g'ri matn chiqaradi", () => {
		const uzT = createUzT('Time')

		expect(formatRelativeTime(ago(10), uzT)).toBe('hozirgina')
		expect(formatRelativeTime(ago(5 * MINUTE), uzT)).toBe('5 daqiqa oldin')
		expect(formatRelativeTime(ago(3 * DAY), uzT)).toBe('3 kun oldin')
	})
})
