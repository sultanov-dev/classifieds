import { http, HttpResponse } from 'msw'

export const handlers = [
	http.post('*/listings/:id/like', () => HttpResponse.json({ ok: true })),
	http.get('*/listings/liked', () =>
		HttpResponse.json({ data: { listings: [] } }),
	),
	http.post('*/auth/refresh', () =>
		HttpResponse.json({ accessToken: 'new-token' }),
	),
]
