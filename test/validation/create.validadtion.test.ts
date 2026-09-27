import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { createFakeT, createUzT } from '@/test/i18n'
import { errorsOf } from '@/test/validation/helpers'
import { createListingSchemas } from '@/validation/create.validadtion'

// year chegarasi joriy yilga bog'liq, shuning uchun vaqt qotiriladi
const CURRENT_YEAR = 2026

beforeEach(() => {
	vi.useFakeTimers({ toFake: ['Date'] })
	vi.setSystemTime(new Date(`${CURRENT_YEAR}-06-01T00:00:00Z`))
})

afterEach(() => {
	vi.useRealTimers()
})

const getSchemas = () => createListingSchemas(createFakeT<'Validation'>())

const image = () => new File(['x'], 'photo.jpg', { type: 'image/jpeg' })

const base = {
	subCategory: 'cars',
	price: 12000,
	region: 'TOSHKENT_SHAHRI',
	description: 'a'.repeat(60),
	title: 'Chevrolet Cobalt',
	currency: 'USD' as const,
}

const validTransport = {
	...base,
	category: 'transport' as const,
	images: [image()],
	attributes: {
		marka: 'Chevrolet',
		model: 'Cobalt',
		year: 2022,
		mileage: 45000,
		transmission: 'avtomat' as const,
	},
}

const validElectronics = {
	...base,
	subCategory: 'phones',
	category: 'electronics' as const,
	images: [image()],
	attributes: {
		brand: 'Apple',
		model: 'iPhone 15',
		memory: '256GB',
		ramMemory: '8GB',
		color: 'black',
		status: 'new' as const,
		battery: 90,
	},
}

describe('baseSchema', () => {
	it("to'g'ri ma'lumot valid", () => {
		expect(getSchemas().baseSchema.safeParse(base).success).toBe(true)
	})

	it.each([
		{ label: '9 belgi', title: 'a'.repeat(9), error: 'titleMin' },
		{ label: '121 belgi', title: 'a'.repeat(121), error: 'titleMax' },
	])("title $label bo'lsa $error xatosi", ({ title, error }) => {
		const result = getSchemas().baseSchema.safeParse({ ...base, title })

		expect(errorsOf(result)).toEqual({ title: error })
	})

	it.each([10, 120])("title %i belgi bo'lsa valid (chegara)", (length) => {
		const result = getSchemas().baseSchema.safeParse({
			...base,
			title: 'a'.repeat(length),
		})

		expect(result.success).toBe(true)
	})

	it("description 59 belgi bo'lsa descriptionMin, 60 belgi bo'lsa valid", () => {
		const { baseSchema } = getSchemas()

		expect(
			errorsOf(baseSchema.safeParse({ ...base, description: 'a'.repeat(59) })),
		).toEqual({ description: 'descriptionMin' })
		expect(
			baseSchema.safeParse({ ...base, description: 'a'.repeat(60) }).success,
		).toBe(true)
	})

	it.each([
		{ label: '0', price: 0, error: 'pricePositive' },
		{ label: 'manfiy', price: -1, error: 'pricePositive' },
		{ label: 'string', price: '100', error: 'priceNumber' },
	])("price $label bo'lsa $error xatosi", ({ price, error }) => {
		const result = getSchemas().baseSchema.safeParse({ ...base, price })

		expect(errorsOf(result)).toEqual({ price: error })
	})

	it("currency USD yoki UZS dan boshqa bo'lsa currencyRequired xatosi", () => {
		const result = getSchemas().baseSchema.safeParse({
			...base,
			currency: 'EUR',
		})

		expect(errorsOf(result)).toEqual({ currency: 'currencyRequired' })
	})

	it("region va subCategory bo'lmasa tegishli xatolar", () => {
		const result = getSchemas().baseSchema.safeParse({
			...base,
			region: undefined,
			subCategory: undefined,
		})

		expect(errorsOf(result)).toEqual({
			region: 'regionSelect',
			subCategory: 'subCategoryRequired',
		})
	})
})

describe('transportSchema', () => {
	const withAttr = (attributes: Partial<typeof validTransport.attributes>) => ({
		...validTransport,
		attributes: { ...validTransport.attributes, ...attributes },
	})

	it("to'g'ri ma'lumot valid", () => {
		expect(getSchemas().transportSchema.safeParse(validTransport).success).toBe(
			true,
		)
	})

	it.each([
		{ year: 2000, error: 'yearMin' },
		{ year: CURRENT_YEAR + 1, error: 'yearMax' },
	])("year $year bo'lsa $error xatosi", ({ year, error }) => {
		const result = getSchemas().transportSchema.safeParse(withAttr({ year }))

		expect(errorsOf(result)).toEqual({ 'attributes.year': error })
	})

	it.each([2001, CURRENT_YEAR])("year %i bo'lsa valid (chegara)", (year) => {
		const result = getSchemas().transportSchema.safeParse(withAttr({ year }))

		expect(result.success).toBe(true)
	})

	it("year chegarasi qotirilgan emas, joriy yilga qarab o'zgaradi", () => {
		vi.setSystemTime(new Date('2030-01-01T00:00:00Z'))

		const result = getSchemas().transportSchema.safeParse(
			withAttr({ year: 2030 }),
		)

		expect(result.success).toBe(true)
	})

	it("mileage manfiy bo'lsa mileageMin, 0 bo'lsa valid", () => {
		const { transportSchema } = getSchemas()

		expect(
			errorsOf(transportSchema.safeParse(withAttr({ mileage: -1 }))),
		).toEqual({ 'attributes.mileage': 'mileageMin' })
		expect(transportSchema.safeParse(withAttr({ mileage: 0 })).success).toBe(
			true,
		)
	})

	it("marka va model bo'sh bo'lsa tegishli xatolar", () => {
		const result = getSchemas().transportSchema.safeParse(
			withAttr({ marka: '', model: '' }),
		)

		expect(errorsOf(result)).toEqual({
			'attributes.marka': 'markaRequired',
			'attributes.model': 'modelRequired',
		})
	})

	it("transmission noto'g'ri bo'lsa transmissionRequired xatosi", () => {
		const result = getSchemas().transportSchema.safeParse(
			withAttr({ transmission: 'robot' as never }),
		)

		expect(errorsOf(result)).toEqual({
			'attributes.transmission': 'transmissionRequired',
		})
	})
})

describe('electronicsSchema', () => {
	const withAttr = (
		attributes: Partial<
			Record<keyof typeof validElectronics.attributes, unknown>
		>,
	) => ({
		...validElectronics,
		attributes: { ...validElectronics.attributes, ...attributes },
	})

	it("to'g'ri ma'lumot valid", () => {
		expect(
			getSchemas().electronicsSchema.safeParse(validElectronics).success,
		).toBe(true)
	})

	it.each([
		{ label: '0', battery: 0, error: 'batteryMin' },
		{ label: '101', battery: 101, error: 'batteryMax' },
		{ label: "bo'sh (undefined)", battery: undefined, error: 'batteryMin' },
	])("battery $label bo'lsa $error xatosi", ({ battery, error }) => {
		const result = getSchemas().electronicsSchema.safeParse(
			withAttr({ battery }),
		)

		expect(errorsOf(result)).toEqual({ 'attributes.battery': error })
	})

	it.each([1, 100])("battery %i bo'lsa valid (chegara)", (battery) => {
		const result = getSchemas().electronicsSchema.safeParse(
			withAttr({ battery }),
		)

		expect(result.success).toBe(true)
	})

	it("battery xabari haqiqiy tarjimada ham o'zbekcha chiqadi", () => {
		const { electronicsSchema } = createListingSchemas(createUzT('Validation'))

		const result = electronicsSchema.safeParse(withAttr({ battery: 0 }))

		expect(errorsOf(result)).toEqual({
			'attributes.battery': 'Batareya kamida 1% boʻlishi kerak',
		})
	})

	it("status new yoki used dan boshqa bo'lsa statusRequired xatosi", () => {
		const result = getSchemas().electronicsSchema.safeParse(
			withAttr({ status: 'broken' }),
		)

		expect(errorsOf(result)).toEqual({ 'attributes.status': 'statusRequired' })
	})

	it("bo'sh string maydonlar uchun tegishli xatolar", () => {
		const result = getSchemas().electronicsSchema.safeParse(
			withAttr({ brand: '', memory: '', ramMemory: '', color: '' }),
		)

		expect(errorsOf(result)).toEqual({
			'attributes.brand': 'brandRequired',
			'attributes.memory': 'memoryRequired',
			'attributes.ramMemory': 'ramRequired',
			'attributes.color': 'colorRequired',
		})
	})
})

describe('images', () => {
	const withImages = (images: unknown[]) => ({ ...validTransport, images })

	it.each([
		{ count: 0, error: 'imagesMin' },
		{ count: 7, error: 'imagesMax' },
	])("$count ta rasm bo'lsa $error xatosi", ({ count, error }) => {
		const images = Array.from({ length: count }, image)

		const result = getSchemas().transportSchema.safeParse(withImages(images))

		expect(errorsOf(result)).toEqual({ images: error })
	})

	it.each([1, 6])("%i ta rasm bo'lsa valid (chegara)", (count) => {
		const images = Array.from({ length: count }, image)

		expect(
			getSchemas().transportSchema.safeParse(withImages(images)).success,
		).toBe(true)
	})

	it("File bo'lmagan element uchun imageFile xatosi", () => {
		const result = getSchemas().transportSchema.safeParse(
			withImages([image(), 'https://cdn/photo.jpg']),
		)

		expect(errorsOf(result)).toEqual({ 'images.1': 'imageFile' })
	})
})

describe('listingSchema (discriminatedUnion)', () => {
	it("category bo'yicha to'g'ri sxemani tanlaydi", () => {
		const { listingSchema } = getSchemas()

		expect(listingSchema.safeParse(validTransport).success).toBe(true)
		expect(listingSchema.safeParse(validElectronics).success).toBe(true)
	})

	it("transport category'ga electronics atributlari berilsa invalid", () => {
		const result = getSchemas().listingSchema.safeParse({
			...validTransport,
			attributes: validElectronics.attributes,
		})

		expect(result.success).toBe(false)
	})

	it("noma'lum category invalid", () => {
		const result = getSchemas().listingSchema.safeParse({
			...validTransport,
			category: 'realty',
		})

		expect(result.success).toBe(false)
	})
})

describe('editListingSchema', () => {
	it('images maydonisiz ham valid', () => {
		const withoutImages: Record<string, unknown> = { ...validElectronics }
		delete withoutImages.images

		expect(
			getSchemas().editListingSchema.safeParse(withoutImages).success,
		).toBe(true)
	})

	it("images bo'sh bo'lsa ham xato bermaydi (tekshirilmaydi)", () => {
		const result = getSchemas().editListingSchema.safeParse({
			...validTransport,
			images: [],
		})

		expect(result.success).toBe(true)
	})
})
