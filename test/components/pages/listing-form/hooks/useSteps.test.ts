import { act } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { describe, expect, it } from 'vitest'

import { useSteps } from '@/components/pages/listing-form/hooks/useSteps'
import {
	CREATE_LISTING_DEFAULTS,
	ELECTRONICS_ATTRIBUTES,
} from '@/components/pages/listing-form/listing.defaults'
import { renderHookWithProviders } from '@/test/render'
import type { TListingSchmema } from '@/validation/create.validadtion'

/** 1-qadam (baseSchema) talablariga javob beradigan qiymatlar */
const VALID_BASE = {
	title: 'Chevrolet Cobalt 2022',
	description: 'a'.repeat(60),
	price: 12000,
	region: 'TOSHKENT_SHAHRI',
	subCategory: 'cars',
	currency: 'USD',
} as const

const VALID_TRANSPORT_ATTRIBUTES = {
	marka: 'Chevrolet',
	model: 'Cobalt',
	year: 2022,
	mileage: 45000,
	transmission: 'avtomat',
} as const

/**
 * useSteps real react-hook-form instance bilan ishlaydi, shuning uchun
 * useForm va useSteps bitta hook ichida birga render qilinadi.
 */
const renderSteps = (
	values: Partial<TListingSchmema> = {},
	selectedCategory = 'transport',
) =>
	renderHookWithProviders(() => {
		const form = useForm<TListingSchmema>({
			defaultValues: { ...CREATE_LISTING_DEFAULTS, ...values } as never,
		})

		return { form, ...useSteps(form, selectedCategory) }
	})

type TRendered = ReturnType<typeof renderSteps>['result']

const errorOf = (result: TRendered, name: string) =>
	result.current.form.getFieldState(name as keyof TListingSchmema).error
		?.message

describe('useSteps', () => {
	it('3 ta qadamni tarjima qilingan sarlavhalar bilan qaytaradi', () => {
		const { result } = renderSteps()

		expect(result.current.STEPS.map((s) => s.id)).toEqual([1, 2, 3])
		expect(result.current.STEPS[0].title).toBe('Asosiy')
	})

	it('1-qadamdan boshlanadi', () => {
		const { result } = renderSteps()

		expect(result.current.step).toBe(1)
	})

	describe('1-qadam (asosiy maʼlumotlar)', () => {
		it("maydonlar noto'g'ri bo'lsa keyingi qadamga o'tmaydi va xatolarni formaga qo'yadi", () => {
			// CREATE_LISTING_DEFAULTS: title '', description '', price 0
			const { result } = renderSteps()

			act(() => result.current.nextStep())

			expect(result.current.step).toBe(1)
			expect(errorOf(result, 'title')).toBe('Sarlavhani toʻliqroq yozing')
			expect(errorOf(result, 'description')).toBe('Koʻproq maʼlumot yozing')
			expect(errorOf(result, 'price')).toBe('Narx noldan katta boʻlishi kerak')
		})

		it("to'g'ri bo'lsa 2-qadamga o'tadi", () => {
			const { result } = renderSteps(VALID_BASE)

			act(() => result.current.nextStep())

			expect(result.current.step).toBe(2)
		})

		it("atributlar noto'g'ri bo'lsa ham 1-qadamda ular tekshirilmaydi", () => {
			// CREATE_LISTING_DEFAULTS'dagi transport atributlari bo'sh (marka: '')
			const { result } = renderSteps(VALID_BASE)

			act(() => result.current.nextStep())

			expect(result.current.step).toBe(2)
			expect(errorOf(result, 'attributes.marka')).toBeUndefined()
		})
	})

	describe('2-qadam (atributlar)', () => {
		/** 1-qadamdan o'tkazib, 2-qadamga olib keladi */
		const renderAtStep2 = (
			values: Partial<TListingSchmema>,
			selectedCategory?: string,
		) => {
			const rendered = renderSteps(
				{ ...VALID_BASE, ...values },
				selectedCategory,
			)
			act(() => rendered.result.current.nextStep())

			return rendered
		}

		it("transport atributlari noto'g'ri bo'lsa o'tmaydi va 'attributes.<maydon>' ga xato qo'yadi", () => {
			const { result } = renderAtStep2({})

			act(() => result.current.nextStep())

			expect(result.current.step).toBe(2)
			expect(errorOf(result, 'attributes.marka')).toBe('Markani kiriting')
			expect(errorOf(result, 'attributes.model')).toBe('Modelni kiriting')
		})

		it("transport atributlari to'g'ri bo'lsa 3-qadamga o'tadi", () => {
			const { result } = renderAtStep2({
				attributes: VALID_TRANSPORT_ATTRIBUTES,
			})

			act(() => result.current.nextStep())

			expect(result.current.step).toBe(3)
		})

		it("selectedCategory 'electronics' bo'lsa electronics sxemasi bilan tekshiradi", () => {
			const { result } = renderAtStep2(
				{ category: 'electronics', attributes: ELECTRONICS_ATTRIBUTES },
				'electronics',
			)

			act(() => result.current.nextStep())

			expect(result.current.step).toBe(2)
			expect(errorOf(result, 'attributes.brand')).toBe(
				'Brendni kiriting (masalan: Apple)',
			)
			// ELECTRONICS_ATTRIBUTES.battery = 0
			expect(errorOf(result, 'attributes.battery')).toBe(
				'Batareya kamida 1% boʻlishi kerak',
			)
		})
	})

	describe('chegaralar', () => {
		it("3-qadamdan keyin oldinga o'tmaydi", () => {
			const { result } = renderSteps({
				...VALID_BASE,
				attributes: VALID_TRANSPORT_ATTRIBUTES,
			})
			act(() => result.current.nextStep())
			act(() => result.current.nextStep())

			act(() => result.current.nextStep())

			expect(result.current.step).toBe(3)
		})

		it('prevStep bir qadam orqaga qaytaradi', () => {
			const { result } = renderSteps(VALID_BASE)
			act(() => result.current.nextStep())

			act(() => result.current.prevStep())

			expect(result.current.step).toBe(1)
		})

		it('1-qadamda prevStep hech narsa qilmaydi', () => {
			const { result } = renderSteps()

			act(() => result.current.prevStep())

			expect(result.current.step).toBe(1)
		})
	})
})
