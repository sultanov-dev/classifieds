import Cookie from 'js-cookie'
import { http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, it } from 'vitest'

import { axiosClassic, instance } from '@/api/axios'
import { server } from '@/test/msw/server'
import { ETokens } from '@/types/auth.types'

/**
 * jsdom muhitida `isServer === false`, ya'ni bu testlar klient
 * tarafidagi xulqni tekshiradi (token cookie'dan olinadi).
 */

const accessToken = () => Cookie.get(ETokens.ACCESSTOKEN)

/** Har bir so'rovda kelgan Authorization header'lari */
let authHeaders: (string | null)[]
let refreshCalls: number

beforeEach(() => {
	authHeaders = []
	refreshCalls = 0

	server.use(
		http.post('*/auth/refresh', () => {
			refreshCalls += 1

			return HttpResponse.json({ data: { accessToken: 'new-token' } })
		}),
	)
})

/** Faqat 'Bearer new-token' bilan kelgan so'rovga 200 qaytaradigan endpoint */
const mockProtectedEndpoint = () =>
	server.use(
		http.get('*/protected', ({ request }) => {
			const auth = request.headers.get('Authorization')
			authHeaders.push(auth)

			return auth === 'Bearer new-token'
				? HttpResponse.json({ ok: true })
				: HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
		}),
	)

/** Har doim bir xil status qaytaradigan endpoint */
const mockEndpoint = (status: number, body: object = {}) =>
	server.use(
		http.get('*/protected', ({ request }) => {
			authHeaders.push(request.headers.get('Authorization'))

			return HttpResponse.json(body, { status })
		}),
	)

describe('instance: request interceptor', () => {
	it("cookie'da token bo'lsa Authorization: Bearer <token> header'ini qo'yadi", async () => {
		Cookie.set(ETokens.ACCESSTOKEN, 'my-token')
		mockEndpoint(200)

		await instance.get('/protected')

		expect(authHeaders).toEqual(['Bearer my-token'])
	})

	it("token bo'lmasa Authorization header'ini qo'ymaydi", async () => {
		mockEndpoint(200)

		await instance.get('/protected')

		expect(authHeaders).toEqual([null])
	})
})

describe('instance: response interceptor', () => {
	it("401 kelsa tokenni yangilab, so'rovni yangi token bilan qayta yuboradi", async () => {
		Cookie.set(ETokens.ACCESSTOKEN, 'old-token')
		mockProtectedEndpoint()

		const response = await instance.get('/protected')

		expect(response.data).toEqual({ ok: true })
		expect(authHeaders).toEqual(['Bearer old-token', 'Bearer new-token'])
		expect(refreshCalls).toBe(1)
	})

	it("yangi tokenni cookie'ga saqlaydi", async () => {
		Cookie.set(ETokens.ACCESSTOKEN, 'old-token')
		mockProtectedEndpoint()

		await instance.get('/protected')

		expect(accessToken()).toBe('new-token')
	})

	it("qayta so'rov ham 401 qaytarsa xato beradi va cheksiz takrorlamaydi", async () => {
		// Himoya: _retry buzilsa test osilib qolmasin, 3-so'rovdan keyin 200 qaytadi
		server.use(
			http.get('*/protected', ({ request }) => {
				authHeaders.push(request.headers.get('Authorization'))

				return authHeaders.length > 3
					? HttpResponse.json({ ok: true })
					: HttpResponse.json({}, { status: 401 })
			}),
		)

		await expect(instance.get('/protected')).rejects.toMatchObject({
			response: { status: 401 },
		})
		expect(authHeaders).toHaveLength(2)
		expect(refreshCalls).toBe(1)
	})

	it.each([400, 403, 404, 500])(
		"%i xatoda tokenni yangilamaydi va xatoni o'zgartirmay qaytaradi",
		async (status) => {
			mockEndpoint(status)

			await expect(instance.get('/protected')).rejects.toMatchObject({
				response: { status },
			})
			expect(refreshCalls).toBe(0)
			expect(authHeaders).toHaveLength(1)
		},
	)

	it("refresh so'rovi yiqilsa o'sha xatoni qaytaradi", async () => {
		mockEndpoint(401)
		server.use(
			http.post('*/auth/refresh', () =>
				HttpResponse.json(
					{ message: 'Refresh token not passed' },
					{ status: 401 },
				),
			),
		)

		await expect(instance.get('/protected')).rejects.toMatchObject({
			config: { url: '/auth/refresh' },
		})
	})

	/**
	 * XATO: refresh token eskirganda access token cookie'dan o'chirilishi kerak.
	 * Interceptor `getErrorMessage(error) === 'jwt expired'` bilan tekshiradi,
	 * lekin AxiosError uchun getErrorMessage server javobidagi message'ni emas,
	 * "Request failed with status code 401" ni qaytaradi. Shuning uchun
	 * removeFromStorage() hech qachon chaqirilmaydi.
	 * Tuzatilgach bu test yiqiladi: `it.fails` ni `it` ga almashtiring.
	 */
	it.fails(
		"refresh 'jwt expired' bilan yiqilsa access token cookie'dan o'chiriladi",
		async () => {
			Cookie.set(ETokens.ACCESSTOKEN, 'old-token')
			mockEndpoint(401)
			server.use(
				http.post('*/auth/refresh', () =>
					HttpResponse.json({ message: 'jwt expired' }, { status: 401 }),
				),
			)

			await instance.get('/protected').catch(() => {})

			expect(accessToken()).toBeUndefined()
		},
	)

	/**
	 * XATO: interceptor status 401 bo'lmasa ham server 'jwt expired' yoki
	 * 'jwt must be provided' xabarini qaytarsa tokenni yangilashi kerak.
	 * Yuqoridagi sabab bilan bu shart hech qachon bajarilmaydi.
	 */
	it.fails(
		"server 403 va 'jwt expired' xabarini qaytarsa tokenni yangilaydi",
		async () => {
			mockEndpoint(403, { message: 'jwt expired' })

			await instance.get('/protected').catch(() => {})

			expect(refreshCalls).toBe(1)
		},
	)
})

describe('axiosClassic', () => {
	it("cookie'da token bo'lsa ham Authorization header'ini qo'ymaydi", async () => {
		Cookie.set(ETokens.ACCESSTOKEN, 'my-token')
		mockEndpoint(200)

		await axiosClassic.get('/protected')

		expect(authHeaders).toEqual([null])
	})

	it('401 kelsa tokenni yangilamaydi', async () => {
		mockEndpoint(401)

		await expect(axiosClassic.get('/protected')).rejects.toMatchObject({
			response: { status: 401 },
		})
		expect(refreshCalls).toBe(0)
	})
})
