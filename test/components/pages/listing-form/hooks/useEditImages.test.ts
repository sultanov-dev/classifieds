import { act, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { toast } from 'sonner'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
	MAX_LISTING_IMAGES,
	useEditImages,
} from '@/components/pages/listing-form/hooks/useEditImages'
import { listingListPredicate } from '@/lib/querykeys/listing'
import { listingService } from '@/services/listing/listing.service'
import { createFile, mockObjectUrl, toFileList } from '@/test/browser'
import { server } from '@/test/msw/server'
import { renderHookWithProviders } from '@/test/render'
import type { IListingResponse, TImages } from '@/types/listing.types'

const nav = vi.hoisted(() => ({ refresh: vi.fn() }))

vi.mock('@/i18n/navigation', () => ({
	useRouter: () => ({ refresh: nav.refresh }),
}))

vi.mock('sonner', () => ({
	toast: { success: vi.fn(), error: vi.fn() },
}))

const LISTING_ID = 'l1'

const buildImage = (id: string): TImages => ({
	id,
	url: `https://cdn/${id}.jpg`,
	thumbnailUrl: `https://cdn/${id}-thumb.jpg`,
	width: 800,
	height: 600,
})

const img1 = buildImage('img1')
const img2 = buildImage('img2')

let objectUrl: ReturnType<typeof mockObjectUrl>

beforeEach(() => {
	objectUrl = mockObjectUrl()
	nav.refresh.mockClear()
})

afterEach(() => {
	objectUrl.restore()
})

const renderEditImages = (existing: TImages[] = [img1, img2]) =>
	renderHookWithProviders(() => useEditImages(LISTING_ID, existing))

describe('useEditImages', () => {
	describe('lokal holat', () => {
		it("boshlang'ich holatda barcha mavjud rasmlar saqlanadi va o'zgarish yo'q", () => {
			const { result } = renderEditImages()

			expect(result.current.keptImages).toEqual([img1, img2])
			expect(result.current.totalCount).toBe(2)
			expect(result.current.availableCount).toBe(MAX_LISTING_IMAGES - 2)
			expect(result.current.hasChanges).toBe(false)
		})

		it("markRemoved rasmni keptImages'dan chiqaradi va hasChanges ni true qiladi", () => {
			const { result } = renderEditImages()

			act(() => result.current.markRemoved('img1'))

			expect(result.current.keptImages).toEqual([img2])
			expect(result.current.removedIds).toEqual(['img1'])
			expect(result.current.hasChanges).toBe(true)
		})

		it("markRemoved bir xil id ni ikki marta qo'shmaydi", () => {
			const { result } = renderEditImages()

			act(() => result.current.markRemoved('img1'))
			act(() => result.current.markRemoved('img1'))

			expect(result.current.removedIds).toEqual(['img1'])
		})

		it('undoRemoved rasmni qaytaradi', () => {
			const { result } = renderEditImages()
			act(() => result.current.markRemoved('img1'))

			act(() => result.current.undoRemoved('img1'))

			expect(result.current.keptImages).toEqual([img1, img2])
			expect(result.current.hasChanges).toBe(false)
		})

		it("addFiles yangi fayllarni qo'shadi va preview yaratadi", () => {
			const { result } = renderEditImages()
			const file = createFile('new.jpg')

			act(() => result.current.addFiles(toFileList([file])))

			expect(result.current.newPreviews).toEqual([
				{ file, url: 'blob:new.jpg' },
			])
			expect(result.current.totalCount).toBe(3)
			expect(result.current.hasChanges).toBe(true)
		})

		it("addFiles bo'sh joydan ortiq fayllarni kesib tashlaydi", () => {
			const existing = ['1', '2', '3', '4', '5'].map(buildImage)
			const { result } = renderEditImages(existing)

			act(() =>
				result.current.addFiles(
					toFileList([createFile('a.jpg'), createFile('b.jpg')]),
				),
			)

			expect(result.current.newPreviews.map((p) => p.file.name)).toEqual([
				'a.jpg',
			])
			expect(result.current.availableCount).toBe(0)
		})

		it("limit to'lgan bo'lsa addFiles hech narsa qo'shmaydi", () => {
			const existing = ['1', '2', '3', '4', '5', '6'].map(buildImage)
			const { result } = renderEditImages(existing)

			act(() => result.current.addFiles(toFileList([createFile('a.jpg')])))

			expect(result.current.newPreviews).toEqual([])
		})

		it("o'chirilgan rasm o'rniga yangi fayl qo'shish mumkin", () => {
			const existing = ['1', '2', '3', '4', '5', '6'].map(buildImage)
			const { result } = renderEditImages(existing)

			act(() => result.current.markRemoved('1'))
			act(() => result.current.addFiles(toFileList([createFile('a.jpg')])))

			expect(result.current.totalCount).toBe(6)
			expect(result.current.newPreviews).toHaveLength(1)
		})

		it('removeNewFile berilgan indeksdagi yangi faylni olib tashlaydi', () => {
			const { result } = renderEditImages()
			act(() =>
				result.current.addFiles(
					toFileList([createFile('a.jpg'), createFile('b.jpg')]),
				),
			)

			act(() => result.current.removeNewFile(0))

			expect(result.current.newPreviews.map((p) => p.file.name)).toEqual([
				'b.jpg',
			])
		})

		it("resetChanges barcha o'zgarishlarni bekor qiladi", () => {
			const { result } = renderEditImages()
			act(() => result.current.markRemoved('img1'))
			act(() => result.current.addFiles(toFileList([createFile('a.jpg')])))

			act(() => result.current.resetChanges())

			expect(result.current.keptImages).toEqual([img1, img2])
			expect(result.current.newPreviews).toEqual([])
			expect(result.current.hasChanges).toBe(false)
		})

		it("preview'lar almashganda eski URL'larni bo'shatadi", () => {
			const { result } = renderEditImages()
			act(() => result.current.addFiles(toFileList([createFile('a.jpg')])))

			act(() => result.current.removeNewFile(0))

			expect(objectUrl.revokeObjectURL).toHaveBeenCalledWith('blob:a.jpg')
		})
	})

	describe('save', () => {
		it("rasm qolmasa so'rov yubormaydi va xato toast chiqaradi", () => {
			const onRequest = vi.fn()
			server.use(http.patch('*/listings/:id', onRequest))
			const { result } = renderEditImages()
			act(() => result.current.markRemoved('img1'))
			act(() => result.current.markRemoved('img2'))

			act(() => result.current.save())

			expect(toast.error).toHaveBeenCalledWith('Kamida 1 ta rasm qolishi kerak')
			expect(onRequest).not.toHaveBeenCalled()
		})

		/**
		 * Fayl yuborilganini MSW orqali tekshirib bo'lmaydi: jsdom'ning File
		 * obyekti MSW'ning XHR interceptor'ida yiqiladi ("reading '_bytes'").
		 * Shu sababli bu ikki testda FormData service chaqiruvidan olinadi.
		 */
		const captureUpdateListing = () =>
			vi
				.spyOn(listingService, 'updateListing')
				.mockResolvedValue({} as IListingResponse)

		it("yangi fayllar va o'chirilgan id'larni FormData orqali yuboradi", async () => {
			const updateListing = captureUpdateListing()
			const newFile = createFile('new.jpg')
			const { result } = renderEditImages()
			act(() => result.current.markRemoved('img1'))
			act(() => result.current.addFiles(toFileList([newFile])))

			act(() => result.current.save())

			await waitFor(() => expect(updateListing).toHaveBeenCalledTimes(1))
			const [listingId, formData] = updateListing.mock.calls[0]
			expect(listingId).toBe(LISTING_ID)
			expect(formData.getAll('images')).toEqual([newFile])
			expect(JSON.parse(formData.get('removeImageIds') as string)).toEqual([
				'img1',
			])
		})

		it("hech narsa o'chirilmagan bo'lsa removeImageIds yuborilmaydi", async () => {
			const updateListing = captureUpdateListing()
			const { result } = renderEditImages()
			act(() => result.current.addFiles(toFileList([createFile('new.jpg')])))

			act(() => result.current.save())

			await waitFor(() => expect(updateListing).toHaveBeenCalledTimes(1))
			const [, formData] = updateListing.mock.calls[0]
			expect(formData.has('removeImageIds')).toBe(false)
		})

		it("muvaffaqiyatda toast chiqaradi, ro'yxatlarni yangilaydi, sahifani refresh qiladi va holatni tozalaydi", async () => {
			const { result, queryClient } = renderEditImages()
			const invalidate = vi.spyOn(queryClient, 'invalidateQueries')
			act(() => result.current.markRemoved('img1'))

			act(() => result.current.save())

			await waitFor(() =>
				expect(toast.success).toHaveBeenCalledWith('Rasmlar saqlandi'),
			)
			expect(invalidate).toHaveBeenCalledWith({
				predicate: listingListPredicate,
			})
			expect(nav.refresh).toHaveBeenCalledTimes(1)
			expect(result.current.hasChanges).toBe(false)
		})

		it("server xabarlar massivini qaytarsa ularni vergul bilan birlashtirib ko'rsatadi", async () => {
			server.use(
				http.patch('*/listings/:id', () =>
					HttpResponse.json(
						{ message: ['Fayl juda katta', "Format noto'g'ri"] },
						{ status: 400 },
					),
				),
			)
			const { result } = renderEditImages()
			act(() => result.current.markRemoved('img1'))

			act(() => result.current.save())

			await waitFor(() =>
				expect(toast.error).toHaveBeenCalledWith(
					"Fayl juda katta, Format noto'g'ri",
				),
			)
			// Xatoda holat saqlanib qoladi: foydalanuvchi qayta urinib ko'rishi mumkin
			expect(result.current.removedIds).toEqual(['img1'])
		})

		it("server bitta string xabar qaytarsa o'shani ko'rsatadi", async () => {
			server.use(
				http.patch('*/listings/:id', () =>
					HttpResponse.json({ message: "Ruxsat yo'q" }, { status: 403 }),
				),
			)
			const { result } = renderEditImages()
			act(() => result.current.markRemoved('img1'))

			act(() => result.current.save())

			await waitFor(() =>
				expect(toast.error).toHaveBeenCalledWith("Ruxsat yo'q"),
			)
		})

		it("server xabarsiz xato qaytarsa umumiy tarjima qilingan xabarni ko'rsatadi", async () => {
			server.use(
				http.patch('*/listings/:id', () =>
					HttpResponse.json({}, { status: 500 }),
				),
			)
			const { result } = renderEditImages()
			act(() => result.current.markRemoved('img1'))

			act(() => result.current.save())

			await waitFor(() =>
				expect(toast.error).toHaveBeenCalledWith(
					'Rasmlarni saqlashda xatolik yuz berdi',
				),
			)
		})
	})
})
