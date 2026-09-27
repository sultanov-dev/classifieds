// @vitest-environment node
import { NextRequest } from 'next/server'

import { describe, expect, it } from 'vitest'

import proxy from '@/proxy'
import { ETokens } from '@/types/auth.types'

const ORIGIN = 'http://localhost:3000'

/** Proxy faqat refresh token cookie borligiga qaraydi */
const request = (path: string, { loggedIn = false } = {}) =>
	new NextRequest(`${ORIGIN}${path}`, {
		headers: loggedIn ? { cookie: `${ETokens.REFRESHTOKEN}=refresh` } : {},
	})

/** Redirect bo'lsa manzilning faqat path qismi, aks holda null */
const redirectPath = (response: Response) => {
	const location = response.headers.get('location')

	return location ? new URL(location).pathname : null
}

/** Rewrite bo'lsa ichki manzilning path qismi, aks holda null */
const rewritePath = (response: Response) => {
	const rewrite = response.headers.get('x-middleware-rewrite')

	return rewrite ? new URL(rewrite).pathname : null
}

describe('proxy', () => {
	describe('auth sahifalari (login, register)', () => {
		it.each(['/uz/login', '/uz/register', '/ru/login'])(
			"%s: tizimga kirgan foydalanuvchini bosh sahifaga yo'naltiradi",
			async (path) => {
				const locale = path.split('/')[1]

				const response = await proxy(request(path, { loggedIn: true }))

				expect(response.status).toBe(307)
				expect(redirectPath(response)).toBe(`/${locale}`)
			},
		)

		it("tizimga kirmagan foydalanuvchini o'tkazib yuboradi", async () => {
			const response = await proxy(request('/uz/login'))

			expect(redirectPath(response)).toBeNull()
			expect(rewritePath(response)).toBeNull()
			expect(response.headers.get('x-middleware-next')).toBe('1')
		})
	})

	describe('profil sahifalari', () => {
		it.each(['/uz/profile', '/uz/profile/ads', '/ru/profile/settings'])(
			"%s: tizimga kirmagan bo'lsa 404 sahifasini ko'rsatadi (rewrite, URL o'zgarmaydi)",
			async (path) => {
				const locale = path.split('/')[1]

				const response = await proxy(request(path))

				expect(rewritePath(response)).toBe(`/${locale}/404`)
				expect(redirectPath(response)).toBeNull()
			},
		)

		it("tizimga kirgan bo'lsa 404 ham, redirect ham bo'lmaydi", async () => {
			const response = await proxy(
				request('/uz/profile/ads', { loggedIn: true }),
			)

			expect(redirectPath(response)).toBeNull()
			expect(rewritePath(response)).not.toBe('/uz/404')
		})
	})

	describe("e'lon yaratish sahifasi", () => {
		it.each([
			{ path: '/uz/create', expected: '/uz/login' },
			{ path: '/ru/create', expected: '/ru/login' },
			// locale bo'lmasa standart 'uz' ishlatiladi
			{ path: '/create', expected: '/uz/login' },
		])(
			"$path: tizimga kirmagan bo'lsa $expected ga yo'naltiradi",
			async ({ path, expected }) => {
				const response = await proxy(request(path))

				expect(response.status).toBe(307)
				expect(redirectPath(response)).toBe(expected)
			},
		)

		it("tizimga kirgan bo'lsa login'ga yo'naltirmaydi", async () => {
			const response = await proxy(request('/uz/create', { loggedIn: true }))

			expect(redirectPath(response)).not.toBe('/uz/login')
		})
	})

	describe('ochiq sahifalar', () => {
		it.each(['/uz', '/uz/catalog', '/ru/ads/123'])(
			"%s: cookie'siz ham redirect qilinmaydi va 404 ko'rsatilmaydi",
			async (path) => {
				const response = await proxy(request(path))

				expect(redirectPath(response)).toBeNull()
				expect(rewritePath(response) ?? '').not.toMatch(/\/404$/)
			},
		)
	})

	it("locale'siz ochiq sahifani standart 'uz' locale'li manzilga yo'naltiradi", async () => {
		const response = await proxy(request('/catalog'))

		expect(redirectPath(response)).toBe('/uz/catalog')
	})
})
