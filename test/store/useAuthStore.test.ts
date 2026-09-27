import { beforeEach, describe, expect, it } from 'vitest'

import { useAuthStore } from '@/store/useAuthStore'
import type { IUserData } from '@/types/auth.types'

const user: IUserData = {
	id: 'u1',
	fullName: 'Ali Valiyev',
	email: 'ali@mail.uz',
	region: 'TOSHKENT_SHAHRI',
	phoneNumber: '+998901234567',
	createdAt: '2026-01-01T00:00:00.000Z',
}

/** persist middleware localStorage'ga yozgan qiymat */
const persisted = () => JSON.parse(localStorage.getItem('auth') ?? 'null')

const state = () => useAuthStore.getState()

beforeEach(() => {
	localStorage.clear()
	useAuthStore.setState({ user: null, isAuthenticated: false })
})

describe('useAuthStore', () => {
	it("boshlang'ich holatda foydalanuvchi yo'q", () => {
		expect(state().user).toBeNull()
		expect(state().isAuthenticated).toBe(false)
	})

	it('setCridentials foydalanuvchini saqlaydi va isAuthenticated ni true qiladi', () => {
		state().setCridentials(user)

		expect(state().user).toEqual(user)
		expect(state().isAuthenticated).toBe(true)
	})

	it("logOut foydalanuvchini o'chiradi va isAuthenticated ni false qiladi", () => {
		state().setCridentials(user)

		state().logOut()

		expect(state().user).toBeNull()
		expect(state().isAuthenticated).toBe(false)
	})

	describe('persist', () => {
		it("localStorage'dagi 'auth' kalitiga faqat user va isAuthenticated ni yozadi", () => {
			state().setCridentials(user)

			expect(persisted().state).toEqual({ user, isAuthenticated: true })
		})

		it("logOut'dan keyin localStorage'dagi qiymat ham tozalanadi", () => {
			state().setCridentials(user)

			state().logOut()

			expect(persisted().state).toEqual({
				user: null,
				isAuthenticated: false,
			})
		})

		it("localStorage'dagi saqlangan holatni rehydrate orqali tiklaydi", async () => {
			localStorage.setItem(
				'auth',
				JSON.stringify({ state: { user, isAuthenticated: true }, version: 0 }),
			)

			await useAuthStore.persist.rehydrate()

			expect(state().user).toEqual(user)
			expect(state().isAuthenticated).toBe(true)
		})
	})
})
