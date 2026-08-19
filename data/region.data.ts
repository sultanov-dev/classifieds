interface IRegion {
	label: string
	value: string
}

export const regionData: IRegion[] = [
	{
		label: 'Toshkent shahri',
		value: 'toshkent-shahri',
	},
	{
		label: 'Fargʻona viloyati',
		value: 'fargona-viloyati',
	},
	{
		label: 'Jizzax viloyati',
		value: 'jizzax-viloyati',
	},
	{
		label: 'Xorazm viloyati',
		value: 'xorazm-viloyati',
	},
	{
		label: 'Namangan viloyati',
		value: 'namangan-viloyati',
	},
	{
		label: 'Navoiy viloyati',
		value: 'navoiy-viloyati',
	},
	{
		label: 'Qashqadaryo viloyati',
		value: 'qashqadaryo-viloyati',
	},
	{
		label: 'Samarqand viloyati',
		value: 'samarqand-viloyati',
	},
	{
		label: 'Sirdaryo viloyati',
		value: 'sirdaryo-viloyati',
	},
	{
		label: 'Surxondaryo viloyati',
		value: 'surxondaryo-viloyati',
	},
	{
		label: 'Toshkent viloyati',
		value: 'toshkent-viloyati',
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
