import { vi } from 'vitest'

/**
 * jsdom'da URL.createObjectURL va URL.revokeObjectURL yo'q.
 * Har bir fayl uchun oldindan bilinadigan `blob:<fayl nomi>` URL qaytaradi.
 *
 * `afterEach` ichida qaytgan `restore()` ni chaqiring.
 */
export const mockObjectUrl = () => {
	const createObjectURL = vi.fn((file: File) => `blob:${file.name}`)
	const revokeObjectURL = vi.fn()

	Object.assign(URL, { createObjectURL, revokeObjectURL })

	return {
		createObjectURL,
		revokeObjectURL,
		restore: () => {
			Reflect.deleteProperty(URL, 'createObjectURL')
			Reflect.deleteProperty(URL, 'revokeObjectURL')
		},
	}
}

export const createFile = (name: string) =>
	new File(['x'], name, { type: 'image/jpeg' })

/**
 * Hook'lar `FileList` qabul qiladi, lekin faqat `Array.from` bilan o'qiydi.
 * jsdom'da FileList yaratib bo'lmagani uchun massivni shu tipga keltiramiz.
 */
export const toFileList = (files: File[]) => files as unknown as FileList
