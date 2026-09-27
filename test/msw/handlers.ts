import { http, HttpResponse } from 'msw'

/**
 * Standart (muvaffaqiyatli) javoblar. Xatolik holatlari test ichida
 * `server.use(...)` bilan override qilinadi.
 *
 * Brauzer muhitida baseURL '' (NODE_ENV=test), node muhitida esa API_URL.
 * '*\/...' pattern ikkala holatga ham mos keladi.
 */
export const handlers = [
	http.post('*/listings/:id/like', () => HttpResponse.json({ ok: true })),
	http.get('*/listings/liked', () =>
		HttpResponse.json({ data: { listings: [] } }),
	),
	http.patch('*/listings/:id', () =>
		HttpResponse.json({ success: true, message: 'ok', data: {} }),
	),
	// authService.getNewTokens `data.data.accessToken` ni o'qiydi
	http.post('*/auth/refresh', () =>
		HttpResponse.json({ data: { accessToken: 'new-token' } }),
	),
]
