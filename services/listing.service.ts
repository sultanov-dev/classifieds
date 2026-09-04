import { axiosClassic, instance } from '@/api/axios'
import type {
	IGetListingResponse,
	IListingResponse,
	TListingParams,
} from '@/types/listing.types'

import { getAccesToken } from './auth/auth.helper'

class ListingService {
	private LISTINGURL = '/listings'

	async createListing(formData: FormData) {
		const response = await instance.post<IListingResponse>(
			`${this.LISTINGURL}`,
			formData,
		)

		return response
	}

	async getLisings(queryParams: TListingParams | undefined) {
		const accessToken = getAccesToken()

		const response = await axiosClassic.get<IGetListingResponse>(
			`${this.LISTINGURL}`,
			{
				headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
				params: queryParams ? queryParams : {},
			},
		)

		return response.data
	}

	async getLisingById(id: string) {
		const accessToken = getAccesToken()

		const response = await axiosClassic.get<IListingResponse>(
			`${this.LISTINGURL}/${id}`,
			{
				headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
			},
		)

		return response.data.data
	}

	async getMylistings() {
		const response = await instance.get<IGetListingResponse>(
			`${this.LISTINGURL}/my`,
		)

		return response.data
	}

	async getLikedListings() {
		const response = await instance.get<IGetListingResponse>(
			`${this.LISTINGURL}/liked`,
		)

		return response.data
	}

	async likedListing(id: string) {
		const response = await instance.post(`${this.LISTINGURL}/${id}/like`)

		return response.data
	}

	async deleteListing(id: string) {
		const response = await instance.delete(`${this.LISTINGURL}/${id}`)

		return response
	}
}

export const listingService = new ListingService()
