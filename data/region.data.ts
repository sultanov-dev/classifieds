export type TRegionValue =
	| 'TOSHKENT_SHAHRI'
	| 'FARGONA'
	| 'JIZZAX'
	| 'XORAZM'
	| 'NAMANGAN'
	| 'NAVOIY'
	| 'QASHQADARYO'
	| 'SAMARQAND'
	| 'SIRDARYO'
	| 'SURXONDARYO'
	| 'TOSHKENT'

export const regionData: { value: TRegionValue }[] = [
	{ value: 'TOSHKENT_SHAHRI' },
	{ value: 'FARGONA' },
	{ value: 'JIZZAX' },
	{ value: 'XORAZM' },
	{ value: 'NAMANGAN' },
	{ value: 'NAVOIY' },
	{ value: 'QASHQADARYO' },
	{ value: 'SAMARQAND' },
	{ value: 'SIRDARYO' },
	{ value: 'SURXONDARYO' },
	{ value: 'TOSHKENT' },
]

export type TMemory = {
	value: string
	label: string
}

// Texnik qiymatlar — tarjima talab qilmaydi
export const MEMORYDATA: TMemory[] = [
	{
		value: '128gb',
		label: '128GB',
	},
	{
		value: '256gb',
		label: '256GB',
	},
	{
		value: '512gb',
		label: '512GB',
	},
	{
		value: '1tb',
		label: '1TB',
	},
]

export const RAMDATA: TMemory[] = [
	{
		value: '8gb',
		label: '8GB',
	},
	{
		value: '16gb',
		label: '16GB',
	},
	{
		value: '32gb',
		label: '32GB',
	},
	{
		value: '64gb',
		label: '64GB',
	},
]

/**
 * Ranglar. Ko'rinadigan nom `Colors` namespace'idan `id` kaliti bo'yicha olinadi.
 */
export type TColorId =
	| 'black'
	| 'white'
	| 'space-gray'
	| 'silver'
	| 'gold'
	| 'blue'
	| 'purple'
	| 'natural-titanium'

export const COLORS: {
	id: TColorId
	hex: string
	border: boolean
}[] = [
	{ id: 'black', hex: '#000000', border: false },
	{ id: 'white', hex: '#FFFFFF', border: true },
	{ id: 'space-gray', hex: '#4B4D4E', border: false },
	{ id: 'silver', hex: '#E2E4E1', border: true },
	{ id: 'gold', hex: '#F5E7D3', border: true },
	{ id: 'blue', hex: '#2563EB', border: false },
	{ id: 'purple', hex: '#9333EA', border: false },
	{ id: 'natural-titanium', hex: '#8A8680', border: false },
]
