import type { IListing, TAttirbute } from '@/types/listing.types'
import type { TListingEditSchema } from '@/validation/create.validadtion'

type TMappableListing = Pick<
	IListing,
	| 'title'
	| 'description'
	| 'price'
	| 'currency'
	| 'region'
	| 'category'
	| 'subCategory'
	| 'attributes'
>

const toObject = (attributes: TAttirbute[]) =>
	Object.fromEntries(attributes.map(({ key, value }) => [key, value]))

const asString = (value: unknown, fallback = '') =>
	typeof value === 'string' ? value : fallback

const asNumber = (value: unknown, fallback: number) => {
	const parsed = Number(value)

	return Number.isFinite(parsed) ? parsed : fallback
}

export const listingToFormValues = (
	listing: TMappableListing,
): TListingEditSchema => {
	const attributes = toObject(listing.attributes)

	const base = {
		title: listing.title,
		description: listing.description,
		price: listing.price,
		region: listing.region,
		subCategory: listing.subCategory,
		currency: listing.currency === 'USD' ? ('USD' as const) : ('UZS' as const),
	}

	if (listing.category === 'electronics') {
		return {
			...base,
			category: 'electronics',
			attributes: {
				brand: asString(attributes.brand),
				model: asString(attributes.model),
				memory: asString(attributes.memory),
				ramMemory: asString(attributes.ramMemory),
				color: asString(attributes.color),
				status: attributes.status === 'used' ? 'used' : 'new',
				battery: asNumber(attributes.battery, 0),
			},
		}
	}

	return {
		...base,
		category: 'transport',
		attributes: {
			marka: asString(attributes.marka),
			model: asString(attributes.model),
			year: asNumber(attributes.year, 2020),
			mileage: asNumber(attributes.mileage, 0),
			transmission:
				attributes.transmission === 'mexanik' ? 'mexanik' : 'avtomat',
		},
	}
}

type TDirtyFields = Partial<Record<keyof TListingEditSchema, unknown>>

export const buildListingUpdateFormData = (
	values: TListingEditSchema,
	dirtyFields: TDirtyFields,
): FormData => {
	const formData = new FormData()

	if (dirtyFields.title) formData.append('title', values.title)
	if (dirtyFields.description)
		formData.append('description', values.description)
	if (dirtyFields.price) formData.append('price', String(values.price))
	if (dirtyFields.currency) formData.append('currency', values.currency)
	if (dirtyFields.region) formData.append('region', values.region)

	const categoryChanged = Boolean(dirtyFields.category)

	if (categoryChanged) formData.append('category', values.category)
	if (categoryChanged || dirtyFields.subCategory)
		formData.append('subCategory', values.subCategory)

	if (categoryChanged || dirtyFields.attributes)
		formData.append('attributes', JSON.stringify(values.attributes))

	return formData
}
