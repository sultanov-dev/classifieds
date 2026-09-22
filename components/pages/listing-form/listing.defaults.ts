import { MEMORYDATA, RAMDATA } from '@/data/region.data'
import type { TListingSchmema } from '@/validation/create.validadtion'

export const TRANSPORT_ATTRIBUTES = {
	marka: '',
	model: '',
	year: 2020,
	mileage: 0,
	transmission: 'avtomat',
} as const

export const ELECTRONICS_ATTRIBUTES = {
	brand: '',
	model: '',
	memory: MEMORYDATA[0].value,
	ramMemory: RAMDATA[0].value,
	color: '',
	status: 'new',
	battery: 0,
} as const

export const CREATE_LISTING_DEFAULTS = {
	category: 'transport',
	subCategory: 'cars',
	title: '',
	region: '',
	description: '',
	price: 0,
	currency: 'UZS',
	images: [],
	attributes: TRANSPORT_ATTRIBUTES,
} satisfies Partial<TListingSchmema>
