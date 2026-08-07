import * as z from 'zod'

export const settingsSchema = z.object({
  fullName: z.string('').min(3, "Ism 3 harfdan uzun bo'lishi kerak"),
  phoneNumber: z.string().regex(/^\+998\d{9}$/, 'Telefon raqamni to‘liq kiriting'),
  region: z.string().min(1, 'Viloyatni tanlang'),
  email: z.email("Email formati noto'g'ri"),
  password: z
    .string()
    .min(6, "Parol kamida 6 ta belgidan iborat bo'lsin")
    .regex(/[A-Z]/, "Parolda kamida bitta katta harf bo'lsin")
    .regex(/[0-9]/, "Parolda kamida bitta raqam bo'lsin"),
})

export type TSettingsSchema = z.infer<typeof settingsSchema>
