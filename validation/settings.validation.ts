import * as z from 'zod'

export const settingsSchema = z
	.object({
		fullName: z
			.string('')
			.min(3, "Ism 3 harfdan uzun bo'lishi kerak")
			.optional()
			.or(z.literal('')),
		phoneNumber: z
			.string()
			.regex(/^\+998\d{9}$/, 'Telefon raqamni to‘liq kiriting')
			.optional()
			.or(z.literal('')),
		region: z.string().min(1, 'Viloyatni tanlang').optional().or(z.literal('')),
		email: z.email("Email formati noto'g'ri").optional().or(z.literal('')),
		currentPassword: z
			.string()
			.min(6, "Parol kamida 6 ta belgidan iborat bo'lsin")
			.regex(/[A-Z]/, "Parolda kamida bitta katta harf bo'lsin")
			.regex(/[0-9]/, "Parolda kamida bitta raqam bo'lsin")
			.optional()
			.or(z.literal('')),
		newPassword: z
			.string()
			.min(6, "Parol kamida 6 ta belgidan iborat bo'lsin")
			.regex(/[A-Z]/, "Parolda kamida bitta katta harf bo'lsin")
			.regex(/[0-9]/, "Parolda kamida bitta raqam bo'lsin")
			.regex(/[^A-Za-z0-9\s]/, "Parolda kamida bitta maxsus belgi bo'lsin")
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
			message: 'Parolni yangilash uchun joriy parolni kiritishingiz kerak',
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
			message: "Yangi parol joriy parol bilan bir xil bo'lmasligi kerak",
			path: ['newPassword'],
		},
	)

export type TSettingsSchema = z.infer<typeof settingsSchema>
