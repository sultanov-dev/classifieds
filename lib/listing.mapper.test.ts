import { describe, expect, it } from 'vitest'

import {
	asString,
	buildListingUpdateFormData,
	toObject,
} from './listing.mapper'

describe('buildListingUpdateFormData', () => {
	it('faqat dirty maydonlarni qoshadi', () => {
		const fd = buildListingUpdateFormData(
			{
				title: 'Iphone',
				price: 200,
			} as never,
			{ title: true },
		)

		expect(fd.get('title')).toBe('Iphone')
		expect(fd.has('price')).toBe(false)
	})
})

describe('asString', () => {
	it("to'g'ri string berilganda qiymatni o'zini qaytaradi", () => {
		expect(asString('salom13')).toBe('salom13')
		expect(asString('123')).toBe('123')
	})

	it("bo'sh string berilganda ham o'zini qaytaradi (fallbackga aylanib ketmasligi kerak)", () => {
		expect(asString('')).toBe('')
		expect(asString('', 'default')).toBe('')
	})

	it("stringdan boshqa qiymat berilsa bo'sh string qaytadi ('')", () => {
		expect(asString(123)).toBe('')
		expect(asString(null)).toBe('')
		expect(asString(undefined)).toBe('')
		expect(asString({})).toBe('')
		expect(asString([1, 2, 3])).toBe('')
		expect(asString(false)).toBe('')
	})

	it('string emas qiymat va fallback berilganda fallbackni qaytarish', () => {
		expect(asString(null, 'mavjud emas')).toBe('mavjud emas')
		expect(asString(undefined, 'default')).toBe('default')
		expect(asString(404, 'xatolik')).toBe('xatolik')
	})

	it("string qiymat va fallback berilganda fallback e'tiborga olinmaydi", () => {
		expect(asString('matn', 'bosh matn')).toBe('matn')
	})
})

describe('toObject', () => {
	it('massivni obyektga muvaffaqiyatli aylantiradi', () => {
		const input = [
			{ key: 'theme', value: 'dark' },
			{ key: 'color', value: 'blue' },
		]

		expect(toObject(input)).toEqual({ theme: 'dark', color: 'blue' })
	})

	it("bo'sh massiv berilgan bo'lsa bo'sh obyekt qaytaradi", () => {
		expect(toObject([])).toEqual({})
	})

	it("bir xil kalitlar bo'lsa oxirgisini qaytaradi", () => {
		const input = [
			{ key: 'theme', value: 'dark' },
			{ key: 'theme', value: 'system' },
		]

		expect(toObject(input)).toEqual({ theme: 'system' })
	})
})
