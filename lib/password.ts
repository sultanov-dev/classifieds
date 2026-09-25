import type { TTranslator } from '@/types/i18n.types'

type TReturn = {
	score: number
	color: string
	label: string
}

/**
 * @param t `useTranslations('Password')` dan olingan tarjimon
 */
export const getPasswordStrength = (
	password: string,
	t: TTranslator<'Password'>,
): TReturn => {
	if (!password) return { score: 0, color: 'bg-muted', label: '' }

	let score = 0

	if (password.length >= 6) score++
	if (/[A-Z]/.test(password)) score++
	if (/[0-9]/.test(password)) score++
	if (/[^A-Za-z0-9\s]/.test(password)) score++

	switch (score) {
		case 1:
			return { score: 1, color: 'bg-red-500', label: t('veryWeak') }
		case 2:
			return { score: 2, color: 'bg-orange-500', label: t('weak') }
		case 3:
			return { score: 3, color: 'bg-yellow-500', label: t('medium') }
		case 4:
			return { score: 4, color: 'bg-emerald-500', label: t('strong') }
		default:
			return { score: 0, color: 'bg-muted', label: '' }
	}
}
