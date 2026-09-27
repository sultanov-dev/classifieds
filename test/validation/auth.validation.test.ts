import { describe, expect, it } from 'vitest'

import { createFakeT, createUzT } from '@/test/i18n'
import { errorsOf } from '@/test/validation/helpers'
import { createAuthSchema } from '@/validation/auth.validation'

describe('createAuthSchema', () => {
	const schema = createAuthSchema(createFakeT<'Validation'>())

	const valid = { email: 'ali@mail.uz', password: 'Parol1' }

	it("to'g'ri email va parol valid", () => {
		expect(schema.safeParse(valid).success).toBe(true)
	})

	it.each(['ali', 'ali@', '@mail.uz', 'ali mail.uz', ''])(
		"email '%s' uchun emailInvalid xatosi",
		(email) => {
			const result = schema.safeParse({ ...valid, email })

			expect(errorsOf(result)).toEqual({ email: 'emailInvalid' })
		},
	)

	it.each([
		{ label: '5 belgi', password: 'Paro1', error: 'passwordMin' },
		{ label: 'katta harfsiz', password: 'parol1', error: 'passwordUpper' },
		{ label: 'raqamsiz', password: 'Parolim', error: 'passwordDigit' },
	])("parol $label bo'lsa $error xatosi", ({ password, error }) => {
		const result = schema.safeParse({ ...valid, password })

		expect(errorsOf(result)).toEqual({ password: error })
	})

	it('parolda maxsus belgi talab qilinmaydi', () => {
		expect(schema.safeParse({ ...valid, password: 'Abcde1' }).success).toBe(
			true,
		)
	})

	it('xato xabari haqiqiy tarjimadan olinadi', () => {
		const uzSchema = createAuthSchema(createUzT('Validation'))

		const result = uzSchema.safeParse({ ...valid, password: 'Paro1' })

		expect(errorsOf(result)).toEqual({
			password: 'Parol kamida 6 ta belgidan iborat boʻlsin',
		})
	})
})
