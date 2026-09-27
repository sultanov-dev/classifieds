import { createTranslator, type Messages } from 'next-intl'
import { vi } from 'vitest'

import messages from '@/messages/uz.json'
import type { TTranslator } from '@/types/i18n.types'

/**
 * Soxta tarjimon: matn o'rniga kalitni qaytaradi, `count` berilsa
 * `key:count` ko'rinishida. Shunda test tarjima matniga emas, faqat
 * mantiqqa (qaysi kalit, qanday parametr) bog'liq bo'ladi.
 *
 * @example
 * const t = createFakeT<'Time'>()
 * t('hour', { count: 2 }) // 'hour:2'
 */
export const createFakeT = <Namespace extends keyof Messages>() =>
	vi.fn((key: string, values?: { count?: number }) =>
		values?.count !== undefined ? `${key}:${values.count}` : key,
	) as unknown as TTranslator<Namespace>

/**
 * `messages/uz.json` asosidagi haqiqiy tarjimon. Kalit nomi yoki ICU
 * formati buzilganini ushlash uchun ishlatiladi.
 */
export const createUzT = <Namespace extends keyof Messages>(
	namespace: Namespace,
) =>
	createTranslator({
		locale: 'uz',
		messages,
		namespace,
	}) as unknown as TTranslator<Namespace>
