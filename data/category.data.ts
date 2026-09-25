export type TSubCategorySlug =
	'cars' | 'moto' | 'trucks' | 'phones' | 'laptops' | 'accessories'

type TSubCategory = {
	id: string
	slug: TSubCategorySlug
}

interface ICategoryData {
	id: number
	key: TCategoryKey
	icon: string
	subCategory: TSubCategory[]
}

type TCate = {
	icon: string
	subCategory: { id: TSubCategorySlug }[]
}

export type TCategoryKey = 'transport' | 'electronics'

interface ICategory {
	transport: TCate
	electronics: TCate
}

export const CATEGORIES: ICategory = {
	transport: {
		icon: '🚗',
		subCategory: [{ id: 'cars' }, { id: 'moto' }, { id: 'trucks' }],
	},
	electronics: {
		icon: '📱',
		subCategory: [{ id: 'phones' }, { id: 'laptops' }, { id: 'accessories' }],
	},
}

export const categoryData: ICategoryData[] = [
	{
		id: 1,
		key: 'transport',
		icon: '🚗',
		subCategory: [
			{ id: '1', slug: 'cars' },
			{ id: '2', slug: 'trucks' },
			{ id: '3', slug: 'moto' },
		],
	},
	{
		id: 2,
		key: 'electronics',
		icon: '📱',
		subCategory: [
			{ id: '4', slug: 'phones' },
			{ id: '5', slug: 'accessories' },
			{ id: '6', slug: 'laptops' },
		],
	},
]
