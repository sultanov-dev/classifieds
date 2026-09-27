import { describe, expect, it } from 'vitest'

import { createFakeT, createUzT } from '@/test/i18n'
import { errorsOf } from '@/test/validation/helpers'
import { createSettingsSchema } from '@/validation/settings.validation'

describe('createSettingsSchema', () => {
	const schema = createSettingsSchema(createFakeT<'Validation'>())

	/** Barcha maydonlar bo'sh (foydalanuvchi hech narsani o'zgartirmagan) */
	const empty = {
		fullName: '',
		phoneNumber: '',
		region: '',
		email: '',
		currentPassword: '',
		newPassword: '',
	}

	it("barcha maydonlar bo'sh string bo'lsa valid", () => {
		expect(schema.safeParse(empty).success).toBe(true)
	})

	it('barcha maydonlar umuman berilmasa ham valid', () => {
		expect(schema.safeParse({}).success).toBe(true)
	})

	describe('fullName', () => {
		it("2 harf bo'lsa nameMin, 3 harf bo'lsa valid", () => {
			expect(errorsOf(schema.safeParse({ ...empty, fullName: 'Al' }))).toEqual({
				fullName: 'nameMin',
			})
			expect(schema.safeParse({ ...empty, fullName: 'Ali' }).success).toBe(true)
		})
	})

	describe('phoneNumber', () => {
		it("+998 va 9 ta raqam bo'lsa valid", () => {
			expect(
				schema.safeParse({ ...empty, phoneNumber: '+998901234567' }).success,
			).toBe(true)
		})

		it.each([
			{ label: '8 ta raqam', phone: '+99890123456' },
			{ label: '10 ta raqam', phone: '+9989012345678' },
			{ label: '+ belgisisiz', phone: '998901234567' },
			{ label: 'probel bilan', phone: '+998 90 123 45 67' },
			{ label: 'boshqa davlat kodi', phone: '+79001234567' },
		])("$label bo'lsa phoneInvalid xatosi", ({ phone }) => {
			expect(
				errorsOf(schema.safeParse({ ...empty, phoneNumber: phone })),
			).toEqual({ phoneNumber: 'phoneInvalid' })
		})
	})

	it("email noto'g'ri bo'lsa emailInvalid xatosi", () => {
		expect(errorsOf(schema.safeParse({ ...empty, email: 'ali@' }))).toEqual({
			email: 'emailInvalid',
		})
	})

	describe('parollar', () => {
		const withPasswords = (currentPassword: string, newPassword: string) => ({
			...empty,
			currentPassword,
			newPassword,
		})

		it("joriy va yangi parol to'g'ri va har xil bo'lsa valid", () => {
			expect(schema.safeParse(withPasswords('Eski12', 'Yangi1!')).success).toBe(
				true,
			)
		})

		it("yangi parol bor, joriy parol yo'q bo'lsa currentPassword'ga xato qo'yadi", () => {
			const result = schema.safeParse(withPasswords('', 'Yangi1!'))

			expect(errorsOf(result)).toEqual({
				currentPassword: 'currentPasswordRequired',
			})
		})

		it("ikkala parol bir xil bo'lsa newPassword'ga xato qo'yadi", () => {
			const result = schema.safeParse(withPasswords('Parol1!', 'Parol1!'))

			expect(errorsOf(result)).toEqual({ newPassword: 'passwordsMustDiffer' })
		})

		it("faqat joriy parol kiritilsa (yangisi bo'sh) valid", () => {
			expect(schema.safeParse(withPasswords('Eski12', '')).success).toBe(true)
		})

		it.each([
			{ label: '5 belgi', password: 'Ya1!a', error: 'passwordMin' },
			{ label: 'katta harfsiz', password: 'yangi1!', error: 'passwordUpper' },
			{ label: 'raqamsiz', password: 'Yangi!!', error: 'passwordDigit' },
			{
				label: 'maxsus belgisiz',
				password: 'Yangi12',
				error: 'passwordSpecial',
			},
		])("yangi parol $label bo'lsa $error xatosi", ({ password, error }) => {
			const result = schema.safeParse(withPasswords('Eski12', password))

			expect(errorsOf(result)).toEqual({ newPassword: error })
		})

		it('joriy parolda maxsus belgi talab qilinmaydi', () => {
			expect(schema.safeParse(withPasswords('Eski12', 'Yangi1!')).success).toBe(
				true,
			)
		})
	})

	it('xato xabari haqiqiy tarjimadan olinadi', () => {
		const uzSchema = createSettingsSchema(createUzT('Validation'))

		const result = uzSchema.safeParse({ ...empty, newPassword: 'Yangi1!' })

		expect(errorsOf(result)).toEqual({
			currentPassword:
				'Parolni yangilash uchun joriy parolni kiritishingiz kerak',
		})
	})
})
