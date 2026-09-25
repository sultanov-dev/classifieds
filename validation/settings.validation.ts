import * as z from 'zod'

import type { TTranslator } from '@/types/i18n.types'

/**
 * @param t `useTranslations('Validation')` dan olingan tarjimon
 */
export const createSettingsSchema = (t: TTranslator<'Validation'>) =>
	z
		.object({
			fullName: z.string('').min(3, t('nameMin')).optional().or(z.literal('')),
			phoneNumber: z
				.string()
				.regex(/^\+998\d{9}$/, t('phoneInvalid'))
				.optional()
				.or(z.literal('')),
			region: z
				.string()
				.min(1, t('regionRequired'))
				.optional()
				.or(z.literal('')),
			email: z.email(t('emailInvalid')).optional().or(z.literal('')),
			currentPassword: z
				.string()
				.min(6, t('passwordMin'))
				.regex(/[A-Z]/, t('passwordUpper'))
				.regex(/[0-9]/, t('passwordDigit'))
				.optional()
				.or(z.literal('')),
			newPassword: z
				.string()
				.min(6, t('passwordMin'))
				.regex(/[A-Z]/, t('passwordUpper'))
				.regex(/[0-9]/, t('passwordDigit'))
				.regex(/[^A-Za-z0-9\s]/, t('passwordSpecial'))
				.optional()
				.or(z.literal('')),
		})
		.refine(
			(data) => {
				if (data.newPassword && !data.currentPassword) {
					return false
				}
				return true
			},
			{
				message: t('currentPasswordRequired'),
				path: ['currentPassword'],
			},
		)
		.refine(
			(data) => {
				if (data.newPassword && data.currentPassword) {
					return data.currentPassword !== data.newPassword
				}
				return true
			},
			{
				message: t('passwordsMustDiffer'),
				path: ['newPassword'],
			},
		)

export type TSettingsSchema = z.infer<ReturnType<typeof createSettingsSchema>>
