import { describe, expect, it } from 'vitest'

import { getErrorMessage } from '@/api/api.helper'

describe('getErrorMessage', () => {
	it('Error obyektidan message ni qaytaradi', () => {
		expect(getErrorMessage(new Error('xato'))).toBe('xato')
	})

	it("Error'dan meros olgan klasslar uchun ham message qaytaradi", () => {
		expect(getErrorMessage(new TypeError('tur xatosi'))).toBe('tur xatosi')
	})

	it("string berilsa o'zini qaytaradi", () => {
		expect(getErrorMessage('oddiy matn')).toBe('oddiy matn')
	})

	it('string message maydoni bor obyektdan message ni qaytaradi', () => {
		expect(getErrorMessage({ message: 'jwt expired', code: 401 })).toBe(
			'jwt expired',
		)
	})

	it("message string bo'lmasa obyektni JSON ko'rinishida qaytaradi", () => {
		expect(getErrorMessage({ message: ['a', 'b'] })).toBe(
			'{"message":["a","b"]}',
		)
	})

	it("message maydoni yo'q obyektni JSON ko'rinishida qaytaradi", () => {
		expect(getErrorMessage({ status: 500 })).toBe('{"status":500}')
	})

	it.each([
		{ label: 'null', value: null, expected: 'null' },
		{ label: 'son', value: 42, expected: '42' },
	])("$label berilsa JSON ko'rinishini qaytaradi", ({ value, expected }) => {
		expect(getErrorMessage(value)).toBe(expected)
	})

	it("JSON'ga aylanmaydigan (aylanma havolali) obyekt uchun String() natijasini qaytaradi", () => {
		const circular: Record<string, unknown> = {}
		circular.self = circular

		expect(getErrorMessage(circular)).toBe('[object Object]')
	})

	/**
	 * XATO: funksiya tipi `string` deydi, lekin JSON.stringify(undefined)
	 * `undefined` qaytaradi va u try ichida to'g'ridan-to'g'ri qaytib ketadi.
	 * Tuzatilgach bu test yiqiladi, shunda `it.fails` ni `it` ga almashtiring.
	 */
	it.fails('undefined berilganda ham string qaytarishi kerak', () => {
		expect(typeof getErrorMessage(undefined)).toBe('string')
	})
})
