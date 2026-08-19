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
	}).format(num)
}
