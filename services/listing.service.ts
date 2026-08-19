import { axiosClassic, instance } from '@/api/axios'
import type {
	IGetListingResponse,
	IListingResponse,
} from '@/types/listing.types'

class ListingService {
	private LISTINGURL = '/listings'

	async createListing(formData: FormData) {
		const response = await instance.post<IListingResponse>(
			`${this.LISTINGURL}`,
			formData,
		)

		return response
	}

	async getLisings() {
		const response = await axiosClassic.get<IGetListingResponse>(
			`${this.LISTINGURL}`,
		)

		return response.data
	}
}

export const listingService = new ListingService()
