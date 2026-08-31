import type { ColumnDef } from '@tanstack/react-table'
import { Pencil, Trash2 } from 'lucide-react'

import { formatAdDate, formatCurrency } from '@/lib/utils'
import { BlurImage } from '@/shared/blur.image'
import type { TListingRemoveUser } from '@/types/listing.types'

export const columns: ColumnDef<TListingRemoveUser>[] = [
	{
		id: 'image',
		header: "Sur'ati",
		cell: ({ row }) => (
			<div className="relative size-14 overflow-hidden rounded-md">
				<BlurImage
					src={row.original.images[0].thumbnailUrl}
					alt={row.original.title}
					fill
					sizes="56px"
					className="object-cover"
				/>
			</div>
		),
	},
	{
		accessorKey: 'title',
		header: 'Nomi',
		cell: ({ row }) => (
			<p className="max-w-70 truncate font-medium">{row.original.title}</p>
		),
	},
	{
		accessorKey: 'price',
		header: 'Narxi',
		cell: ({ row }) => (
			<p className="font-medium whitespace-nowrap" suppressHydrationWarning>
				{formatCurrency(row.original.price, {
					currency: row.original.currency,
					locale: row.original.currency === 'USD' ? 'en-US' : 'uz-UZ',
					fractionDigits: 3,
				})}
			</p>
		),
	},
	{
		accessorKey: 'createdAt',
		header: 'Sana',
		cell: ({ row }) => (
			<p className="whitespace-nowrap">
				{formatAdDate(row.original.createdAt)}
			</p>
		),
	},
	{
		id: 'actions',
		header: 'Harakat',
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => console.log('Tahrirlash:', row.original.id)}
					className="cursor-pointer rounded-md p-2 text-blue-600 hover:bg-blue-50"
					aria-label="E'lonni tahrirlash"
				>
					<Pencil size={18} />
				</button>

				<button
					type="button"
					onClick={() => console.log("O'chirish:", row.original.id)}
					className="cursor-pointer rounded-md p-2 text-red-600 hover:bg-red-50"
					aria-label="E'lonni o'chirish"
				>
					<Trash2 size={18} />
				</button>
			</div>
		),
	},
]
