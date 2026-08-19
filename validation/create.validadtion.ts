import { z } from 'zod'

export const baseSchema = z.object({
	subCategory: z.string('Kichik kategoriyani tanlang'),
	price: z
		.number('Narxni raqamlarda kiriting')
		.positive("Narx noldan katta bo'lishi kerak"),
	region: z.string('Hududni tanlang'),
	description: z.string().min(60, "Ko'proq ma'lumot yozing"),
	title: z
		.string()
		.min(10, "Sarlavhani toliqroq yo'zing")
		.max(120, 'Sarlavha 120ta belgidan oshmasligi kerak'),
	currency: z.enum(['USD', 'UZS'], 'Valyutani tanlang'),
})

const imagesSchema = z.object({
	images: z
		.array(z.custom<File>((val) => val instanceof File, "Fayl bo'lishi kerak"))
		.min(1, 'Kamida 1 ta rasm yuklashingiz kerak')
		.max(6, 'Maksimal 10 ta rasm yuklash mumkin'),
})

export const transportSchema = baseSchema.extend({
	category: z.literal('transport'),
	images: imagesSchema.shape.images,
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

export const electronicsSchema = baseSchema.extend({
	category: z.literal('electronics'),
	images: imagesSchema.shape.images,
	attributes: z.object({
		brand: z.string().min(1, 'Brendni kiriting (masalan: Apple)'),
		model: z.string().min(1, 'Brendni kiriting (masalan: Apple)'),
		memory: z.string().min(1, 'Xotirani tanlang'),
		ramMemory: z.string().min(1, 'Ram xotirani tanlang'),
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
