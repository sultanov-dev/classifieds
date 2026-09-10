import { instance } from '@/api/axios'
import type { TUserResponse, TUserUpdataRes } from '@/types/auth.types'
import type { TSettingsSchema } from '@/validation/settings.validation'

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

		return response.data
	}
}

export const userService = new UserService()
