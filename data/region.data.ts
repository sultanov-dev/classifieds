interface IRegion {
	label: string
	value: string
}

export const regionData: IRegion[] = [
	{
		label: 'Toshkent shahri',
		value: 'toshkent',
	},
	{
		label: 'Fargʻona viloyati',
		value: 'fargona',
	},
	{
		label: 'Jizzax viloyati',
		value: 'jizzax',
	},
	{
		label: 'Xorazm viloyati',
		value: 'xorazm',
	},
	{
		label: 'Namangan viloyati',
		value: 'namangan',
	},
	{
		label: 'Navoiy viloyati',
		value: 'navoiy',
	},
	{
		label: 'Qashqadaryo viloyati',
		value: 'qashqadaryo',
	},
	{
		label: 'Samarqand viloyati',
		value: 'samarqand',
	},
	{
		label: 'Sirdaryo viloyati',
		value: 'sirdaryo',
	},
	{
		label: 'Surxondaryo viloyati',
		value: 'surxondaryo',
	},
	{
		label: 'Toshkent viloyati',
		value: 'toshkentVil',
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
