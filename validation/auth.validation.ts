import * as z from 'zod'

export const authSchema = z.object({
  email: z.email("Email formati noto'g'ri"),
  password: z
    .string()
    .min(6, "Parol kamida 6 ta belgidan iborat bo'lsin")
    .regex(/[A-Z]/, "Parolda kamida bitta katta harf bo'lsin")
    .regex(/[0-9]/, "Parolda kamida bitta raqam bo'lsin"),
})

export type TAuthScheme = z.infer<typeof authSchema>
