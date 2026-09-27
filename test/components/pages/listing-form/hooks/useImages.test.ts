import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useImages } from '@/components/pages/listing-form/hooks/useImages'
import { createFile, mockObjectUrl, toFileList } from '@/test/browser'

let objectUrl: ReturnType<typeof mockObjectUrl>

beforeEach(() => {
	objectUrl = mockObjectUrl()
})

afterEach(() => {
	objectUrl.restore()
})

const a = createFile('a.jpg')
const b = createFile('b.jpg')
const c = createFile('c.jpg')
const d = createFile('d.jpg')

const renderImages = (value: File[], maxFiles?: number) => {
	const onChange = vi.fn()
	const hook = renderHook(() => useImages({ value, onChange, maxFiles }))

	return { ...hook, onChange }
}

describe('useImages', () => {
	it('har bir fayl uchun tartibi bilan preview URL yaratadi', () => {
		const { result } = renderImages([a, b])

		expect(result.current.imagePrviews).toEqual([
			{ file: a, url: 'blob:a.jpg' },
			{ file: b, url: 'blob:b.jpg' },
		])
	})

	describe('handleSelectImages', () => {
		it("tanlangan fayllarni mavjudlarining oxiriga qo'shadi", () => {
			const { result, onChange } = renderImages([a])

			act(() => result.current.handleSelectImages(toFileList([b, c])))

			expect(onChange).toHaveBeenCalledWith([a, b, c])
		})

		it("maxFiles'dan oshadigan fayllarni kesib tashlaydi", () => {
			const { result, onChange } = renderImages([a, b], 3)

			act(() => result.current.handleSelectImages(toFileList([c, d])))

			expect(onChange).toHaveBeenCalledWith([a, b, c])
		})

		it("limit to'lgan bo'lsa onChange chaqirilmaydi", () => {
			const { result, onChange } = renderImages([a, b], 2)

			act(() => result.current.handleSelectImages(toFileList([c])))

			expect(onChange).not.toHaveBeenCalled()
		})

		it('maxFiles berilmasa standart limit 6 ta', () => {
			const five = ['1', '2', '3', '4', '5'].map((n) => createFile(`${n}.jpg`))
			const { result, onChange } = renderImages(five)

			act(() => result.current.handleSelectImages(toFileList([a, b])))

			expect(onChange).toHaveBeenCalledWith([...five, a])
		})
	})

	describe('removeImage', () => {
		it('berilgan indeksdagi faylni olib tashlaydi', () => {
			const { result, onChange } = renderImages([a, b, c])

			act(() => result.current.removeImage(1))

			expect(onChange).toHaveBeenCalledWith([a, c])
		})

		it("barcha joriy preview URL'larini bo'shatadi (qolganlari keyingi render'da qayta yaratiladi)", () => {
			const { result } = renderImages([a, b])

			act(() => result.current.removeImage(0))

			expect(objectUrl.revokeObjectURL).toHaveBeenCalledTimes(2)
			expect(objectUrl.revokeObjectURL).toHaveBeenCalledWith('blob:a.jpg')
			expect(objectUrl.revokeObjectURL).toHaveBeenCalledWith('blob:b.jpg')
		})
	})
})
