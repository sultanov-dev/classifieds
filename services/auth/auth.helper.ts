import Cookie from 'js-cookie'

import { ETokens } from '@/types/auth.types'

export const getAccesToken = () => {
	const accessToken = Cookie.get(ETokens.ACCESSTOKEN)

	return accessToken || null
}

export const saveTokenStorage = (token: string) => {
	Cookie.set(ETokens.ACCESSTOKEN, token, {
		domain: 'localhost',
		sameSite: 'strict',
		expires: 1,
	})
}

export const removeFromStorage = () => {
	Cookie.remove(ETokens.ACCESSTOKEN, {
		domain: 'localhost',
		path: '/',
	})
}
