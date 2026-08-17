import { axiosClassic, instance } from '@/api/axios'
import type {
	IAuthResponse,
	IGetNewTokensRes,
	TUserResponse,
} from '@/types/auth.types'
import type { TAuthScheme } from '@/validation/auth.validation'

import { removeFromStorage, saveTokenStorage } from './auth.helper'

class AuthService {
	private BASE_URL = '/auth'

	async main(type: 'login' | 'register', formData: TAuthScheme) {
		const response = await axiosClassic.post<IAuthResponse>(
			`${this.BASE_URL}/${type}`,
			formData,
		)

		if (response.data.data.accessToken)
			saveTokenStorage(response.data.data.accessToken)

		return response.data
	}

	async profile() {
		const response = await instance.get<TUserResponse>(`${this.BASE_URL}/me`)

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
		const response = await instance.post(`${this.BASE_URL}/logout`)

		if (response.data) removeFromStorage()

		return response
	}
}

export const authService = new AuthService()
