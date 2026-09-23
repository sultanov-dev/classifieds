import Cookie from 'js-cookie'

import { ETokens } from '@/types/auth.types'

const cookiesOption: Cookies.CookieAttributes = {
	sameSite: 'strict',
	secure:
		typeof window !== 'undefined' && window.location.protocol === 'https:',
	path: '/',
}

export const getAccesToken = () => {
	const accessToken = Cookie.get(ETokens.ACCESSTOKEN)

	return accessToken || null
}

export const saveTokenStorage = (token: string) => {
	Cookie.set(ETokens.ACCESSTOKEN, token, {
		...cookiesOption,
		expires: 1,
	})
}

export const removeFromStorage = () => {
	Cookie.remove(ETokens.ACCESSTOKEN, {
		...cookiesOption,
	})
}
