import { z } from 'zod'

import type { TTranslator } from '@/types/i18n.types'

/**
 * E'lon formasining barcha sxemalari. Xato matnlari tarjima qilinishi kerak
 * bo'lgani uchun sxemalar modul darajasida emas, `t` ni qabul qiladigan
 * factory ichida quriladi.
 *
 * @param t `useTranslations('Validation')` dan olingan tarjimon
 */
export const createListingSchemas = (t: TTranslator<'Validation'>) => {
	const baseSchema = z.object({
		subCategory: z.string(t('subCategoryRequired')),
		price: z.number(t('priceNumber')).positive(t('pricePositive')),
		region: z.string(t('regionSelect')),
		description: z.string().min(60, t('descriptionMin')),
		title: z.string().min(10, t('titleMin')).max(120, t('titleMax')),
		currency: z.enum(['USD', 'UZS'], t('currencyRequired')),
	})

	const imagesSchema = z.object({
		images: z
			.array(z.custom<File>((val) => val instanceof File, t('imageFile')))
			.min(1, t('imagesMin'))
			.max(6, t('imagesMax')),
	})

	const transportSchema = baseSchema.extend({
		category: z.literal('transport'),
		images: imagesSchema.shape.images,
		attributes: z.object({
			marka: z.string().min(1, t('markaRequired')),
			model: z.string().min(1, t('modelRequired')),
			year: z.number().min(2001, t('yearMin')).max(2026, t('yearMax')),
			mileage: z.number().min(0, t('mileageMin')),
			transmission: z.enum(['mexanik', 'avtomat'], t('transmissionRequired')),
		}),
	})

	const electronicsSchema = baseSchema.extend({
		category: z.literal('electronics'),
		images: imagesSchema.shape.images,
		attributes: z.object({
			brand: z.string().min(1, t('brandRequired')),
			model: z.string().min(1, t('modelRequired')),
			memory: z.string().min(1, t('memoryRequired')),
			ramMemory: z.string().min(1, t('ramRequired')),
			color: z.string().min(1, t('colorRequired')),
			status: z.enum(['new', 'used'], t('statusRequired')),
			battery: z.number().min(1).max(100, t('batteryMax')),
		}),
	})

	const listingSchema = z.discriminatedUnion('category', [
		transportSchema,
		electronicsSchema,
	])

	const editListingSchema = z.discriminatedUnion('category', [
		transportSchema.omit({ images: true }),
		electronicsSchema.omit({ images: true }),
	])

	return {
		baseSchema,
		transportSchema,
		electronicsSchema,
		listingSchema,
		editListingSchema,
	}
}

type TListingSchemas = ReturnType<typeof createListingSchemas>

export type TListingSchmema = z.infer<TListingSchemas['listingSchema']>

export type TListingEditSchema = z.infer<TListingSchemas['editListingSchema']>

export type TListingFormValues = TListingEditSchema
