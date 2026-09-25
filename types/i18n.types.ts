import type { Messages, useTranslations } from 'next-intl'

/**
 * Berilgan namespace uchun `useTranslations` qaytaradigan tarjimon tipi.
 * Komponent bo'lmagan joylarda (zod sxemalari, lib yordamchilari, jadval
 * ustunlari) tarjimonni parametr sifatida qabul qilish uchun ishlatiladi.
 *
 * Kalitlar to'liq tekshiriladi: `TTranslator<'Time'>` faqat `Time` ichidagi
 * kalitlarni qabul qiladi.
 */
export type TTranslator<Namespace extends keyof Messages> = ReturnType<
	typeof useTranslations<Namespace>
>
