export type TAttribute = {
	label: string
	value: string | number
}

export type TSeller = {
	name: string
	phoneNumber: string
}

export interface IProduct {
	id: number
	slug: string
	images: string[]
	category: string
	title: string
	price: string
	isLiked: boolean
	region: string
	createdAt: string
	attribute: TAttribute[]
	desctiption: string
	seller: TSeller
}

export const productData: IProduct[] = [
	{
		id: 1,
		category: 'car',
		slug: 'byd-chazor-dmi120km-flagship-1',
		images: ['/car.jpg', '/car2.jpeg'],
		title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
		price: '370 196 800 so’m',
		isLiked: false,
		region: 'toshkent',
		attribute: [
			{ label: 'Marka', value: 'BYD' },
			{ label: 'Model', value: 'Chazor DMI' },
			{ label: 'Ishlab chiqarilgan yil', value: 2025 },
			{ label: 'Yurgani', value: '0 km' },
			{ label: 'Karobka', value: 'Avtomat' },
		],
		seller: {
			name: 'Inomjon',
			phoneNumber: '+998975454535',
		},
		createdAt: '2026-08-06T12:32:00+05:00',
		desctiption:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere adipisci odio illum, atque, nam, dolore perspiciatis magni ex culpa illo voluptas cupiditate eius pariatur quam rerum? Explicabo sit a velit soluta nam adipisci at fugit quis sint, similique accusantium nemo.',
	},
	{
		id: 2,
		category: 'phone',
		images: ['/car2.jpeg', '/car.jpg'],
		slug: 'iphone-15-promax-95-1',
		title: 'Iphone 15 pro max 95%',
		price: '12300000 so’m',
		isLiked: true,
		region: 'Surxondaryo viloyati',
		attribute: [
			{ label: 'Brend', value: 'Apple' },
			{ label: 'Xotira', value: '256 GB' },
			{ label: 'Rangi', value: 'Titan Natural' },
			{ label: 'Holati', value: 'Yangi' },
			{ label: 'Batareykasi', value: '95%' },
		],
		seller: {
			name: 'Inomjon',
			phoneNumber: '+998975454535',
		},
		createdAt: '2026-08-06T12:32:00+05:00',
		desctiption:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere adipisci odio illum, atque, nam, dolore perspiciatis magni ex culpa illo voluptas cupiditate eius pariatur quam rerum? Explicabo sit a velit soluta nam adipisci at fugit quis sint, similique accusantium nemo.',
	},
	{
		id: 3,
		category: 'car',
		images: ['/car.jpg', '/car2.jpeg'],
		slug: 'byd-chazor-dmi120km-flagship-2',
		title: 'BYD Chazor DMI 120km Flagship Full pozitsiyasi',
		price: '370 196 800 so’m',
		isLiked: false,
		region: 'toshkent',
		attribute: [
			{ label: 'Marka', value: 'BYD' },
			{ label: 'Model', value: 'Chazor DMI' },
			{ label: 'Ishlab chiqarilgan yil', value: 2025 },
			{ label: 'Yurgani', value: '0 km' },
			{ label: 'Karobka', value: 'Avtomat' },
		],
		seller: {
			name: 'Inomjon',
			phoneNumber: '+998975454535',
		},
		createdAt: '2026-08-06T12:32:00+05:00',
		desctiption:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere adipisci odio illum, atque, nam, dolore perspiciatis magni ex culpa illo voluptas cupiditate eius pariatur quam rerum? Explicabo sit a velit soluta nam adipisci at fugit quis sint, similique accusantium nemo.',
	},
	{
		id: 4,
		category: 'phone',
		images: ['/car2.jpeg', '/car.jpg'],
		slug: 'iphone-15-promax-95-2',
		title: 'Iphone 15 pro max 95%',
		price: '12300000 so’m',
		isLiked: true,
		region: 'Surxondaryo viloyati',
		attribute: [
			{ label: 'Brend', value: 'Apple' },
			{ label: 'Xotira', value: '256 GB' },
			{ label: 'Rangi', value: 'Titan Natural' },
			{ label: 'Holati', value: 'Yangi' },
			{ label: 'Batareykasi', value: '95%' },
		],
		seller: {
			name: 'Inomjon',
			phoneNumber: '+998975454535',
		},
		createdAt: '2026-08-06T12:32:00+05:00',
		desctiption:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere adipisci odio illum, atque, nam, dolore perspiciatis magni ex culpa illo voluptas cupiditate eius pariatur quam rerum? Explicabo sit a velit soluta nam adipisci at fugit quis sint, similique accusantium nemo.',
	},
]
