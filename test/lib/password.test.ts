import { describe, expect, it } from 'vitest'

import { getPasswordStrength } from '@/lib/password'
import { createFakeT, createUzT } from '@/test/i18n'

/**
 * Ball 4 ta shartdan yig'iladi:
 * 1) uzunlik >= 6, 2) katta harf, 3) raqam, 4) maxsus belgi
 */
describe('getPasswordStrength', () => {
	it("parol bo'sh bo'lsa score 0 va bo'sh label qaytaradi, t chaqirilmaydi", () => {
		const t = createFakeT<'Password'>()

		const result = getPasswordStrength('', t)

		expect(result).toEqual({ score: 0, color: 'bg-muted', label: '' })
		expect(t).not.toHaveBeenCalled()
	})

	it('hech bir shart bajarilmasa (qisqa, faqat kichik harf) score 0 qaytaradi', () => {
		const t = createFakeT<'Password'>()

		const result = getPasswordStrength('abc', t)

		expect(result).toEqual({ score: 0, color: 'bg-muted', label: '' })
		expect(t).not.toHaveBeenCalled()
	})

	it.each([
		{
			label: 'faqat uzunlik',
			password: 'abcdef',
			expected: { score: 1, color: 'bg-red-500', label: 'veryWeak' },
		},
		{
			label: 'faqat maxsus belgi (qisqa parol)',
			password: 'ab!',
			expected: { score: 1, color: 'bg-red-500', label: 'veryWeak' },
		},
		{
			label: 'uzunlik + katta harf',
			password: 'Abcdef',
			expected: { score: 2, color: 'bg-orange-500', label: 'weak' },
		},
		{
			label: 'uzunlik + katta harf + raqam',
			password: 'Abcdef1',
			expected: { score: 3, color: 'bg-yellow-500', label: 'medium' },
		},
		{
			label: 'barcha 4 ta shart',
			password: 'Abcdef1!',
			expected: { score: 4, color: 'bg-emerald-500', label: 'strong' },
		},
	])('$label → score $expected.score', ({ password, expected }) => {
		expect(getPasswordStrength(password, createFakeT<'Password'>())).toEqual(
			expected,
		)
	})

	it('probel maxsus belgi hisoblanmaydi', () => {
		const result = getPasswordStrength('abc def', createFakeT<'Password'>())

		expect(result.score).toBe(1)
	})

	it("haqiqiy o'zbekcha tarjimani label sifatida qaytaradi", () => {
		const result = getPasswordStrength('Abcdef1!', createUzT('Password'))

		expect(result.label).toBe('Juda kuchli')
	})
})
