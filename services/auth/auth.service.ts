import { axiosClassic, instance } from '@/api/axios'
import type { IAuthResponse, IGetNewTokensRes } from '@/types/auth.types'
import type { TAuthScheme } from '@/validation/auth.validation'

import { removeFromStorage, saveTokenStorage } from './auth.helper'

class AuthService {
	private readonly BASE_URL = '/auth'

	async main(type: 'login' | 'register', formData: TAuthScheme) {
		const response = await axiosClassic.post<IAuthResponse>(
			`${this.BASE_URL}/${type}`,
			formData,
		)

		if (response.data.data.accessToken)
			saveTokenStorage(response.data.data.accessToken)

		return response.data
	}

	async getNewTokens() {
		const { data } = await axiosClassic.post<IGetNewTokensRes>(
			`${this.BASE_URL}/refresh`,
		)

		if (data.data.accessToken) saveTokenStorage(data.data.accessToken)

		return data.data
	}

	async logout() {
		const response = await instance.post<{ message: string }>(
			`${this.BASE_URL}/logout`,
		)

		if (response.status === 200) removeFromStorage()

		return response
	}
}

export const authService = new AuthService()
