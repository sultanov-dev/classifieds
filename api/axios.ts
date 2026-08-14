import axios, { CreateAxiosDefaults } from 'axios'

const axiosOptions: CreateAxiosDefaults = {
	baseURL:
		process.env.NODE_ENV === 'development'
			? process.env.NEXT_PUBLIC_API_URL
			: '',
	headers: {
		'Content-Type': 'application/json',
	},
}

export const axiosClassic = axios.create(axiosOptions)
