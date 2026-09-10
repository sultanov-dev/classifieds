import * as z from 'zod'

export const settingsSchema = z
	.object({
		fullName: z.string('').min(3, "Ism 3 harfdan uzun bo'lishi kerak"),
		phoneNumber: z
			.string()
			.regex(/^\+998\d{9}$/, 'Telefon raqamni to‘liq kiriting'),
		region: z.string().min(1, 'Viloyatni tanlang'),
		email: z.email("Email formati noto'g'ri"),
		currentPassword: z
			.string()
			.min(6, "Parol kamida 6 ta belgidan iborat bo'lsin")
			.regex(/[A-Z]/, "Parolda kamida bitta katta harf bo'lsin")
			.regex(/[0-9]/, "Parolda kamida bitta raqam bo'lsin"),
		newPassword: z
			.string()
			.min(6, "Parol kamida 6 ta belgidan iborat bo'lsin")
			.regex(/[A-Z]/, "Parolda kamida bitta katta harf bo'lsin")
			.regex(/[0-9]/, "Parolda kamida bitta raqam bo'lsin")
			.regex(/[^A-Za-z0-9\s]/, "Parolda kamida bitta maxsus belgi bo'lsin"),
	})
	.refine((data) => data.currentPassword !== data.newPassword, {
		error: "Yangi parol joriy parol bilan bir xil bo'lmasligi kerak",
		path: ['newPassword'],
	})

export type TSettingsSchema = z.infer<typeof settingsSchema>
