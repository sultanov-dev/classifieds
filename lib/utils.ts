import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const formatAdDate = (date: string | string) => {
	const timestamp = Date.parse(date)

	const parts = new Intl.DateTimeFormat('en-GB', {
		timeZone: 'Asia/Tashkent',
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hourCycle: 'h23',
	}).formatToParts(timestamp)

	const get = (type: Intl.DateTimeFormatPartTypes) =>
		parts.find((part) => part.type === type)?.value ?? ''

	return `${get('day')}.${get('month')}.${get('year')} ${get('hour')}:${get('minute')}`
}

interface FormatPriceOptions {
	currency?: 'UZS' | 'USD' | 'EUR' | 'RUB' | string
	locale?: string
	fractionDigits?: number
}

export const formatCurrency = (
	amount: string | number,
	options: FormatPriceOptions = {},
) => {
	if (amount === undefined || amount === null || amount === '') return '0'

	const num =
		typeof amount === 'string'
			? Number(amount.replace(/[^0-9.-]+/g, ''))
			: amount
	if (isNaN(num)) return '0'

	const { currency, locale = 'uz-UZ', fractionDigits } = options

	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency,
		minimumFractionDigits: fractionDigits,
		maximumFractionDigits: fractionDigits,
	})
		.format(num)
		.replace(/\u00A0|\u202F/g, ' ')
}

export function getInitials(name?: string | null): string {
	if (!name) return 'U'

	const parts = name.trim().split(/\s+/).filter(Boolean)

	if (parts.length === 0) return 'U'
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()

	// Ism va familiyaning birinchi harflari (masalan: "Inomov Inomjon" -> "II")
	return (parts[0][0] + parts[1][0]).toUpperCase()
}

export const formatRelativeTime = (dateInput: string | number | Date) => {
	const date = new Date(dateInput)
	const now = new Date()
	const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

	if (diffInSeconds < 30) {
		return 'hozirgina'
	}

	const intervals = [
		{ label: 'yil', seconds: 31536000 },
		{ label: 'oy', seconds: 2592000 },
		{ label: 'hafta', seconds: 604800 },
		{ label: 'kun', seconds: 86400 },
		{ label: 'soat', seconds: 3600 },
		{ label: 'daqiqa', seconds: 60 },
	]

	for (const interval of intervals) {
		const count = Math.floor(diffInSeconds / interval.seconds)

		if (count >= 1) {
			return `${count} ${interval.label} oldin`
		}
	}

	return 'hozirgina'
}
