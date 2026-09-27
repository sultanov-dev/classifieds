import { beforeEach, describe, expect, it } from 'vitest'

import { useLikedStore } from '@/store/liked.store'

const overrides = () => useLikedStore.getState().overrides

beforeEach(() => {
	useLikedStore.setState({ overrides: {} })
})

describe('useLikedStore', () => {
	it("boshlang'ich holatda overrides bo'sh", () => {
		expect(overrides()).toEqual({})
	})

	it('setLiked berilgan id uchun qiymatni saqlaydi', () => {
		useLikedStore.getState().setLiked('a', true)
		useLikedStore.getState().setLiked('b', false)

		expect(overrides()).toEqual({ a: true, b: false })
	})

	it('setLiked mavjud qiymatni ustidan yozadi', () => {
		useLikedStore.getState().setLiked('a', true)

		useLikedStore.getState().setLiked('a', false)

		expect(overrides()).toEqual({ a: false })
	})

	it("revert faqat berilgan id ni o'chiradi", () => {
		useLikedStore.setState({ overrides: { a: true, b: false } })

		useLikedStore.getState().revert('a')

		expect(overrides()).toEqual({ b: false })
	})

	it("revert mavjud bo'lmagan id uchun xato bermaydi", () => {
		useLikedStore.setState({ overrides: { a: true } })

		useLikedStore.getState().revert('x')

		expect(overrides()).toEqual({ a: true })
	})
})
