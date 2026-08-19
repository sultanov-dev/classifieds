import axios, {
	CreateAxiosDefaults,
	type AxiosError,
	type InternalAxiosRequestConfig,
} from 'axios'

import { getAccesToken, removeFromStorage } from '@/services/auth/auth.helper'
import { authService } from '@/services/auth/auth.service'

import { getErrorMessage } from './api.helper'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean
}

const axiosOptions: CreateAxiosDefaults = {
	baseURL:
		process.env.NODE_ENV === 'development'
			? process.env.NEXT_PUBLIC_API_URL
			: '',
	withCredentials: true,
}

export const axiosClassic = axios.create(axiosOptions)
export const instance = axios.create(axiosOptions)

instance.interceptors.request.use((config) => {
	const accessToken = getAccesToken()

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

instance.interceptors.response.use(
	(config) => config.data,
	async (error: AxiosError) => {
		const originalRequest = error.config as CustomAxiosRequestConfig

		if (
			error.response?.status === 401 ||
			getErrorMessage(error) === 'jwt expired' ||
			(getErrorMessage(error) === 'jwt must be provided' &&
				originalRequest &&
				!originalRequest._retry)
		) {
			originalRequest._retry = true

			try {
				await authService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (
					getErrorMessage(error) === 'jwt expired' ||
					getErrorMessage(error) === 'Refresh token not passed'
				)
					removeFromStorage()
			}
		}
	},
)
