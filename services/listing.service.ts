import { instance } from '@/api/axios'
import type { IListingResponse } from '@/types/listing.types'

class ListingService {
	private LISTINGURL = '/listings'

	async createListing(formData: FormData) {
		const response = await instance.post<IListingResponse>(
			`${this.LISTINGURL}`,
			formData,
		)

		return response
	}
}

export const listingService = new ListingService()
