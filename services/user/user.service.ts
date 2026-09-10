import { instance } from '@/api/axios'
import type { TUserResponse, TUserUpdataRes } from '@/types/auth.types'
import type { TSettingsSchema } from '@/validation/settings.validation'

import { saveTokenStorage } from '../auth/auth.helper'

class UserService {
	private readonly BASE_URL = '/users'

	async getProfile() {
		const response = await instance.get<TUserResponse>(`${this.BASE_URL}/me`)

		return response.data
	}

	async updateProfile(data: TSettingsSchema) {
		const response = await instance.patch<TUserUpdataRes>(
			`${this.BASE_URL}/me`,
			data,
		)

		if (response.data.data.accessToken)
			saveTokenStorage(response.data.data.accessToken)

		return response.data
	}
}

export const userService = new UserService()
