import { axiosClassic } from '@/api/axios'
import type { IAuthResponse, IGetNewTokensRes } from '@/types/auth.types'
import type { TAuthScheme } from '@/validation/auth.validation'

import { saveTokenStorage } from './auth.helper'

class AuthService {
	private BASE_URL = '/auth'

	async main(type: 'login' | 'register', formData: TAuthScheme) {
		const { data } = await axiosClassic.post<{ data: IAuthResponse }>(
			`${this.BASE_URL}/${type}`,
			formData,
		)

		if (data.data.accessToken) saveTokenStorage(data.data.accessToken)

		return data.data
	}

	async getNewTokens() {
		const { data } = await axiosClassic.post<IGetNewTokensRes>(
			`${this.BASE_URL}/refresh`,
		)

		if (data.data.accessToken) saveTokenStorage(data.data.accessToken)

		return data.data
	}
}

export const authService = new AuthService()
