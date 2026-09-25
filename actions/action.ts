'use server'

import { revalidatePath } from 'next/cache'

import { listingService } from '@/services/listing/listing.service'

export const deleteListing = async (listingId: string) => {
	try {
		await listingService.deleteListing(listingId)

		revalidatePath('/[locale]/profile/ads', 'page')

		return { success: true, messageKey: 'deleted' as const }
	} catch (error) {
		console.error("O'chirishda xatolik:", error)
		return { success: false, messageKey: 'deleteError' as const }
	}
}
