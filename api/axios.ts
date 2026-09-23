import axios, {
	isAxiosError,
	type CreateAxiosDefaults,
	type InternalAxiosRequestConfig,
} from 'axios'

import { getAccesToken, removeFromStorage } from '@/services/auth/auth.helper'
import { authService } from '@/services/auth/auth.service'
import { ETokens } from '@/types/auth.types'

import { getErrorMessage } from './api.helper'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean
}

const isServer = typeof window === 'undefined'

const resolveBaseUrl = () => {
	if (isServer) {
		const serverUrl = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL

		if (!serverUrl) {
			throw new Error(
				"API_URL topilmadi. Server tarafdagi axios uchun to'liq url kerak",
			)
		}

		return serverUrl
	}

	return process.env.NODE_ENV === 'development'
		? process.env.NEXT_PUBLIC_API_URL
		: ''
}

const axiosOptions: CreateAxiosDefaults = {
	baseURL: resolveBaseUrl(),
	withCredentials: true,
}

export const axiosClassic = axios.create(axiosOptions)
export const instance = axios.create(axiosOptions)

const getServerAccessToken = async () => {
	try {
		const { cookies } = await import('next/headers')
		const cookieStore = await cookies()

		return cookieStore.get(ETokens.ACCESSTOKEN)?.value ?? null
	} catch {
		if (process.env.NODE_ENV === 'development') {
			console.warn(
				'[axios] instance request scope tashqarisida chaqirildi — ' +
					'token yuborilmadi. Public endpoint uchun axiosClassic ishlating.',
			)
		}

		return null
	}
}

instance.interceptors.request.use(async (config) => {
	const accessToken = isServer ? await getServerAccessToken() : getAccesToken()

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

instance.interceptors.response.use(
	(config) => config,
	async (error: unknown) => {
		if (!isAxiosError(error)) {
			return Promise.reject(error)
		}

		const originalRequest = error.config as CustomAxiosRequestConfig | undefined

		const isAuthError =
			error.response?.status === 401 ||
			getErrorMessage(error) === 'jwt expired' ||
			getErrorMessage(error) === 'jwt must be provided'

		if (
			isServer ||
			!isAuthError ||
			!originalRequest ||
			originalRequest._retry
		) {
			return Promise.reject(error)
		}

		originalRequest._retry = true

		try {
			const response = await authService.getNewTokens()
			const newAccessToken = response.accessToken

			if (newAccessToken && originalRequest.headers) {
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
			}

			return instance.request(originalRequest)
		} catch (error) {
			const message = getErrorMessage(error)

			if (message === 'jwt expired' || message === 'Refresh token not passed')
				removeFromStorage()

			return Promise.reject(error)
		}
	},
)
