type TCategory = {
	id: string
	label: string
	slug: string
}

interface ICategoryData {
	id: number
	label: string
	subCategory: TCategory[]
}

type TCate = {
	label: string
	subCategory: Omit<TCategory, 'slug'>[]
}

interface ICategory {
	transport: TCate
	electronics: TCate
}

export const CATEGORIES: ICategory = {
	transport: {
		label: '🚗 transport',
		subCategory: [
			{ id: 'cars', label: 'Yengil avtomobillar' },
			{ id: 'moto', label: 'Motosikllar' },
			{ id: 'trucks', label: 'Yuk mashinalari' },
		],
	},
	electronics: {
		label: '📱 elektronika',
		subCategory: [
			{ id: 'phones', label: 'Telefonlar' },
			{ id: 'laptops', label: 'Noutbuklar' },
			{ id: 'accessories', label: 'Aksessuarlar' },
		],
	},
}

export const categoryData: ICategoryData[] = [
	{
		id: 1,
		label: '🚗 Transport',
		subCategory: [
			{
				id: '1',
				label: 'Yengil avtomobil',
				slug: 'cars',
			},
			{
				id: '2',
				label: 'mahsus transport',
				slug: 'trucks',
			},
			{
				id: '3',
				label: 'motosikl',
				slug: 'moto',
			},
		],
	},
	{
		id: 2,
		label: '📱 Elektronika',
		subCategory: [
			{
				id: '4',
				label: 'Telefon va akssesuarlar',
				slug: 'phones',
			},
			{
				id: '5',
				label: 'Akkasuarlar',
				slug: 'accessories',
			},
			{
				id: '6',
				label: 'Noutbook',
				slug: 'laptops',
			},
		],
	},
]
