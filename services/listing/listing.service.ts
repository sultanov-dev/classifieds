import { axiosClassic, instance } from '@/api/axios'
import type {
	IGetListingResponse,
	IGetListingUserViewResponse,
	IListingResponse,
	TListingParams,
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

	async updateListing(id: string, formData: FormData) {
		const response = await instance.patch<IListingResponse>(
			`${this.LISTINGURL}/${id}`,
			formData,
		)

		return response.data
	}

	async getLisings(queryParams: TListingParams | undefined) {
		const response = await instance.get<IGetListingResponse>(
			`${this.LISTINGURL}`,
			{
				params: queryParams ? queryParams : {},
			},
		)

		return response.data
	}

	async getLisingById(id: string) {
		const response = await instance.get<IListingResponse>(
			`${this.LISTINGURL}/${id}`,
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

	async getUserViewed({
		cursor,
		limit,
	}: {
		cursor: string | null
		limit?: number
	}) {
		const response = await instance.get<IGetListingUserViewResponse>(
			`${this.LISTINGURL}/viewed`,
			{
				params: {
					cursor,
					limit: limit || 10,
				},
			},
		)

		return response.data
	}

	async viewListing(id: string) {
		const response = await instance.post(`${this.LISTINGURL}/${id}/view`)

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

	async getListingsPublic(queryParams?: TListingParams) {
		const response = await axiosClassic.get<IGetListingResponse>(
			`${this.LISTINGURL}`,
			{
				params: queryParams ?? {},
			},
		)

		return response.data
	}

	async getListingByIdPublic(id: string) {
		const response = await axiosClassic.get<IListingResponse>(
			`${this.LISTINGURL}/${id}`,
		)

		return response.data.data
	}
}

export const listingService = new ListingService()
