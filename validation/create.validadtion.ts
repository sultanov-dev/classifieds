import { z } from 'zod'

const baseSchema = z.object({
	subCategory: z.string('Kichik kategoriyani tanlang'),
	price: z.number(),
	region: z.string('Hududni tanlang'),
	description: z.string().min(80, "Ko'proq ma'lumot yozing"),
	title: z.string().min(20, "Sarlavhani toliqroq yo'zing"),
})

const transportSchema = baseSchema.extend({
	category: z.literal('transport'),
	attributes: z.object({
		marka: z.string().min(1, 'Markani kiriting'),
		model: z.string().min(1, 'Modelni kiriting'),
		year: z
			.number()
			.min(2001, 'Yili xato kiritildi')
			.max(2026, "Xali kelmagan yilni kiritib bo'lmaydi"),
		mileage: z.number().min(0, "Probeg 0 dan kichik bo'lamaydi"),
		transmission: z.enum(['mexanik', 'avtomat'], 'Karobkani tanlang'),
	}),
})

const electronicsSchema = baseSchema.extend({
	category: z.literal('electronics'),
	attributes: z.object({
		brand: z.string().min(1, 'Brendni kiriting (masalan: Apple)'),
		memory: z.string().min(1, 'Xotirani kiriting (masalan: 256GB)'),
		color: z.string().min(1, 'Rangni tanlang'),
		status: z.enum(['new', 'used'], 'Holatini belgilang'),
		battery: z.number().min(1).max(100, "Batareya maksimal 100% bo'ladi"),
	}),
})

export const listingSchema = z.discriminatedUnion('category', [
	transportSchema,
	electronicsSchema,
])

export type TListingSchmema = z.infer<typeof listingSchema>
