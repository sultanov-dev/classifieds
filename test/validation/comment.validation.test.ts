import { describe, expect, it } from 'vitest'

import { createFakeT } from '@/test/i18n'
import { errorsOf } from '@/test/validation/helpers'
import {
	commentSchema,
	createReplySchema,
} from '@/validation/comment.validation'

describe('commentSchema', () => {
	it("har qanday string'ni, jumladan bo'sh string'ni qabul qiladi", () => {
		expect(commentSchema.safeParse({ body: '' }).success).toBe(true)
		expect(commentSchema.safeParse({ body: 'Salom' }).success).toBe(true)
	})

	it("body bo'lmasa invalid", () => {
		expect(commentSchema.safeParse({}).success).toBe(false)
	})
})

describe('createReplySchema', () => {
	const schema = createReplySchema(createFakeT<'Validation'>())

	it.each([
		{ label: "bo'sh", body: '' },
		{ label: 'faqat probel', body: '   ' },
		{ label: 'faqat qator tashlash', body: '\n\t' },
	])("javob $label bo'lsa commentEmpty xatosi", ({ body }) => {
		expect(errorsOf(schema.safeParse({ body }))).toEqual({
			body: 'commentEmpty',
		})
	})

	it('matnni trim qilib qaytaradi', () => {
		const result = schema.safeParse({ body: '  Rahmat  ' })

		expect(result.data).toEqual({ body: 'Rahmat' })
	})
})
