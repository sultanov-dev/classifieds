import * as z from 'zod'

import type { TTranslator } from '@/types/i18n.types'

/**
 * @param t `useTranslations('Validation')` dan olingan tarjimon
 */
export const createAuthSchema = (t: TTranslator<'Validation'>) =>
	z.object({
		email: z.email(t('emailInvalid')),
		password: z
			.string()
			.min(6, t('passwordMin'))
			.regex(/[A-Z]/, t('passwordUpper'))
			.regex(/[0-9]/, t('passwordDigit')),
	})

export type TAuthScheme = z.infer<ReturnType<typeof createAuthSchema>>
