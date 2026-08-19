export interface IListingResponse {
	success: boolean
	message: string
	data: IListingData
}

export interface IListingData {
	listing: IListing
}

export interface IListing {
	id: string
	title: string
	description: string
	price: number
	currency: string
	region: string
	status: string
	attributes: Attributes
	viewCount: number
	category: string
	subCategory: string
	images: TImages[]
	user: IUser
	createdAt: string
	updatedAt: string
}

export interface Attributes {
	year: number
	fuel: string
	transmission: string
	mileage: number
}

export interface TImages {
	id: string
	url: string
	thumbnailUrl: string
	width: number
	height: number
}

export interface IUser {
	id: string
	fullName: string
	phoneNumber: string
	region: string
}
