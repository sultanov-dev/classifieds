'use server'

import { revalidatePath } from 'next/cache'

import { listingService } from '@/services/listing.service'

export const deleteListing = async (listingId: string) => {
	try {
		await listingService.deleteListing(listingId)

		revalidatePath('/profile/ads')

		return { success: true, message: "Muvaffaqiyatli o'chirildi" }
	} catch (error) {
		console.error("O'chirishda xatolik:", error)
		return { success: false, message: "O'chirishda xatolik yuz berdi" }
	}
}
