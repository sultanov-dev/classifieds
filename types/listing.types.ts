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
	slug: string
	isLiked: boolean
	attributes: TAttirbute[]
	viewCount: number
	category: string
	subCategory: string
	images: TImages[]
	user: IUser
	createdAt: string
	updatedAt: string
}

export type TAttirbute = {
	key: string
	value: string | number
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

export type TMeta = {
	page: number
	limit: number | null
	totalPages: number
}

export type TListingRemoveUser = Omit<IListing, 'user'>

export interface IGetListingResponse {
	success: boolean
	message: string
	data: {
		listings: TListingRemoveUser[]
		meta: TMeta
	}
}

export enum ESORT {
	NEWEST = 'newest',
	OLDEST = 'oldest',
	ALL = 'all',
}

export type TListingParams = {
	q?: string
	region?: string
	page?: string | number
	limit?: string | number
	category?: string
	sort?: ESORT
	minPrice?: string | number
	maxPrice?: string | number
	currency?: string
	type?: 'latest' | 'all'
}

export const defaultDueryParamsData: TListingParams = {
	sort: ESORT.ALL,
	page: 1,
	limit: 10,
}
