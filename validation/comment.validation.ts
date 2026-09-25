import * as z from 'zod'

import type { TTranslator } from '@/types/i18n.types'

export const commentSchema = z.object({
	body: z.string(),
})

/**
 * @param t `useTranslations('Validation')` dan olingan tarjimon
 */
export const createReplySchema = (t: TTranslator<'Validation'>) =>
	z.object({
		body: z.string().trim().min(1, t('commentEmpty')),
	})

export type TCommentSchema = z.infer<typeof commentSchema>
export type TReplySchema = z.infer<ReturnType<typeof createReplySchema>>
