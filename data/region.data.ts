interface IRegion {
	label: string
	value: string
}

export const regionData: IRegion[] = [
	{
		label: 'Toshkent shahri',
		value: 'TOSHKENT_SHAHRI',
	},
	{
		label: 'Fargʻona viloyati',
		value: 'FARGONA',
	},
	{
		label: 'Jizzax viloyati',
		value: 'JIZZAX',
	},
	{
		label: 'Xorazm viloyati',
		value: 'XORAZM',
	},
	{
		label: 'Namangan viloyati',
		value: 'NAMANGAN',
	},
	{
		label: 'Navoiy viloyati',
		value: 'NAVOIY',
	},
	{
		label: 'Qashqadaryo viloyati',
		value: 'QASHQADARYO',
	},
	{
		label: 'Samarqand viloyati',
		value: 'SAMARQAND',
	},
	{
		label: 'Sirdaryo viloyati',
		value: 'SIRDARYO',
	},
	{
		label: 'Surxondaryo viloyati',
		value: 'SURXONDARYO',
	},
	{
		label: 'Toshkent viloyati',
		value: 'TOSHKENT',
	},
]

export type TMemory = {
	value: string
	label: string
}

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

export const COLORS = [
	{ id: 'black', name: 'Qora (Black)', hex: '#000000', border: false },
	{ id: 'white', name: 'Oq (White)', hex: '#FFFFFF', border: true },
	{ id: 'space-gray', name: 'Space Gray', hex: '#4B4D4E', border: false },
	{ id: 'silver', name: 'Kumush (Silver)', hex: '#E2E4E1', border: true },
	{ id: 'gold', name: 'Tilla (Gold)', hex: '#F5E7D3', border: true },
	{ id: 'blue', name: 'Kök (Blue)', hex: '#2563EB', border: false },
	{ id: 'purple', name: 'Binafsha (Purple)', hex: '#9333EA', border: false },
	{ id: 'natural-titanium', name: 'Titanium', hex: '#8A8680', border: false },
]
