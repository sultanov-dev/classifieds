import { describe, expect, it } from 'vitest'

import {
	asString,
	buildListingUpdateFormData,
	listingToFormValues,
	toObject,
} from '@/lib/listing.mapper'
import { buildListing } from '@/test/factories'
import type { TListingEditSchema } from '@/validation/create.validadtion'

describe('toObject', () => {
	it('{key, value} massivini obyektga aylantiradi', () => {
		const input = [
			{ key: 'brand', value: 'Apple' },
			{ key: 'battery', value: 90 },
		]

		expect(toObject(input)).toEqual({ brand: 'Apple', battery: 90 })
	})

	it("bo'sh massiv uchun bo'sh obyekt qaytaradi", () => {
		expect(toObject([])).toEqual({})
	})

	it('kalit takrorlansa oxirgi qiymat qoladi', () => {
		const input = [
			{ key: 'color', value: 'black' },
			{ key: 'color', value: 'white' },
		]

		expect(toObject(input)).toEqual({ color: 'white' })
	})
})

describe('asString', () => {
	it("string berilsa o'zini qaytaradi", () => {
		expect(asString('salom')).toBe('salom')
	})

	it("bo'sh string ham string hisoblanadi, fallback'ga almashmaydi", () => {
		expect(asString('', 'default')).toBe('')
	})

	it.each([
		{ label: 'son', value: 123 },
		{ label: 'null', value: null },
		{ label: 'undefined', value: undefined },
		{ label: 'obyekt', value: {} },
		{ label: 'massiv', value: ['a'] },
		{ label: 'boolean', value: false },
	])("$label berilsa standart fallback '' qaytaradi", ({ value }) => {
		expect(asString(value)).toBe('')
	})

	it('string emas qiymat uchun berilgan fallbackni qaytaradi', () => {
		expect(asString(404, 'xatolik')).toBe('xatolik')
	})
})

describe('listingToFormValues', () => {
	it("umumiy maydonlarni o'zgartirmasdan ko'chiradi", () => {
		const listing = buildListing({
			title: 'Sarlavha',
			description: 'Tavsif',
			price: 500,
			region: 'SAMARQAND',
			subCategory: 'phones',
		})

		const result = listingToFormValues(listing)

		expect(result).toMatchObject({
			title: 'Sarlavha',
			description: 'Tavsif',
			price: 500,
			region: 'SAMARQAND',
			subCategory: 'phones',
		})
	})

	it.each([
		{ currency: 'USD', expected: 'USD' },
		{ currency: 'UZS', expected: 'UZS' },
		{ currency: 'EUR', expected: 'UZS' },
		{ currency: '', expected: 'UZS' },
	])("currency '$currency' → '$expected'", ({ currency, expected }) => {
		const result = listingToFormValues(buildListing({ currency }))

		expect(result.currency).toBe(expected)
	})

	describe('electronics', () => {
		it("to'liq atributlarni to'g'ri turga o'tkazadi", () => {
			const listing = buildListing({
				category: 'electronics',
				attributes: [
					{ key: 'brand', value: 'Apple' },
					{ key: 'model', value: 'iPhone 15' },
					{ key: 'memory', value: '256GB' },
					{ key: 'ramMemory', value: '8GB' },
					{ key: 'color', value: 'black' },
					{ key: 'status', value: 'used' },
					// server raqamni string ko'rinishida yuborishi mumkin
					{ key: 'battery', value: '87' },
				],
			})

			const result = listingToFormValues(listing)

			expect(result).toMatchObject({
				category: 'electronics',
				attributes: {
					brand: 'Apple',
					model: 'iPhone 15',
					memory: '256GB',
					ramMemory: '8GB',
					color: 'black',
					status: 'used',
					battery: 87,
				},
			})
		})

		it("atributlar bo'lmasa fallback qiymatlarni qo'yadi", () => {
			const listing = buildListing({ category: 'electronics', attributes: [] })

			const result = listingToFormValues(listing)

			expect(result.attributes).toEqual({
				brand: '',
				model: '',
				memory: '',
				ramMemory: '',
				color: '',
				status: 'new',
				battery: 0,
			})
		})

		it("status 'used' dan boshqa har qanday qiymat bo'lsa 'new' bo'ladi", () => {
			const listing = buildListing({
				category: 'electronics',
				attributes: [{ key: 'status', value: 'broken' }],
			})

			const result = listingToFormValues(listing)

			expect(result.attributes).toMatchObject({ status: 'new' })
		})

		it("battery son emas bo'lsa 0 bo'ladi", () => {
			const listing = buildListing({
				category: 'electronics',
				attributes: [{ key: 'battery', value: 'yuqori' }],
			})

			const result = listingToFormValues(listing)

			expect(result.attributes).toMatchObject({ battery: 0 })
		})
	})

	describe('transport', () => {
		it("to'liq atributlarni to'g'ri turga o'tkazadi", () => {
			const listing = buildListing({
				category: 'transport',
				attributes: [
					{ key: 'marka', value: 'Chevrolet' },
					{ key: 'model', value: 'Cobalt' },
					{ key: 'year', value: '2022' },
					{ key: 'mileage', value: 45000 },
					{ key: 'transmission', value: 'mexanik' },
				],
			})

			const result = listingToFormValues(listing)

			expect(result).toMatchObject({
				category: 'transport',
				attributes: {
					marka: 'Chevrolet',
					model: 'Cobalt',
					year: 2022,
					mileage: 45000,
					transmission: 'mexanik',
				},
			})
		})

		it("atributlar bo'lmasa fallback qiymatlarni qo'yadi", () => {
			const listing = buildListing({ category: 'transport', attributes: [] })

			const result = listingToFormValues(listing)

			expect(result.attributes).toEqual({
				marka: '',
				model: '',
				year: 2020,
				mileage: 0,
				transmission: 'avtomat',
			})
		})

		it("'electronics' bo'lmagan har qanday kategoriya transport deb olinadi", () => {
			const listing = buildListing({ category: 'nomalum', attributes: [] })

			const result = listingToFormValues(listing)

			expect(result.category).toBe('transport')
		})
	})
})

describe('buildListingUpdateFormData', () => {
	const values: TListingEditSchema = {
		title: 'Chevrolet Cobalt 2022',
		description: 'Tavsif',
		price: 12000,
		currency: 'USD',
		region: 'TOSHKENT_SHAHRI',
		category: 'transport',
		subCategory: 'cars',
		attributes: {
			marka: 'Chevrolet',
			model: 'Cobalt',
			year: 2022,
			mileage: 45000,
			transmission: 'avtomat',
		},
	}

	/** FormData ichidagi kalitlar ro'yxati (tartibi bilan) */
	const keysOf = (formData: FormData) => [...formData.keys()]

	it("hech bir maydon o'zgarmagan bo'lsa FormData bo'sh bo'ladi", () => {
		const formData = buildListingUpdateFormData(values, {})

		expect(keysOf(formData)).toEqual([])
	})

	it("faqat o'zgargan (dirty) maydonlarni qo'shadi", () => {
		const formData = buildListingUpdateFormData(values, {
			title: true,
			region: true,
		})

		expect(keysOf(formData)).toEqual(['title', 'region'])
		expect(formData.get('title')).toBe('Chevrolet Cobalt 2022')
		expect(formData.get('region')).toBe('TOSHKENT_SHAHRI')
	})

	it("price'ni string ko'rinishida yuboradi", () => {
		const formData = buildListingUpdateFormData(values, { price: true })

		expect(formData.get('price')).toBe('12000')
	})

	it("faqat subCategory o'zgarsa category va attributes qo'shilmaydi", () => {
		const formData = buildListingUpdateFormData(values, { subCategory: true })

		expect(keysOf(formData)).toEqual(['subCategory'])
	})

	it("faqat attributes o'zgarsa ularni JSON ko'rinishida yuboradi", () => {
		const formData = buildListingUpdateFormData(values, { attributes: true })

		expect(keysOf(formData)).toEqual(['attributes'])
		expect(JSON.parse(formData.get('attributes') as string)).toEqual(
			values.attributes,
		)
	})

	it("category o'zgarsa subCategory va attributes ham majburan qo'shiladi", () => {
		const formData = buildListingUpdateFormData(values, { category: true })

		expect(keysOf(formData)).toEqual(['category', 'subCategory', 'attributes'])
		expect(formData.get('category')).toBe('transport')
		expect(formData.get('subCategory')).toBe('cars')
	})
})
