import type { ColumnDef } from '@tanstack/react-table'
import { Pencil } from 'lucide-react'

import { protectPages } from '@/config/pages.config'
import { Link } from '@/i18n/navigation'
import { formatAdDate, formatCurrency } from '@/lib/utils'
import { BlurImage } from '@/shared/blur.image'
import type { TTranslator } from '@/types/i18n.types'
import type { TListingRemoveUser } from '@/types/listing.types'

import { DeleteBtn } from './delete.btn'

/**
 * @param t `useTranslations('Profile')` dan olingan tarjimon
 */
export const getColumns = (
	t: TTranslator<'Profile'>,
): ColumnDef<TListingRemoveUser>[] => [
	{
		id: 'image',
		header: t('adsImage'),
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
		header: t('adsTitle'),
		cell: ({ row }) => (
			<p className="max-w-70 truncate font-medium">{row.original.title}</p>
		),
	},
	{
		accessorKey: 'price',
		header: t('adsPrice'),
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
		header: t('adsDate'),
		cell: ({ row }) => (
			<p className="whitespace-nowrap">
				{formatAdDate(row.original.createdAt)}
			</p>
		),
	},
	{
		id: 'actions',
		header: t('adsActions'),
		cell: ({ row }) => (
			<div className="flex items-center gap-2">
				<Link
					href={protectPages.EDIT_AD(row.original.id)}
					className="inline-flex cursor-pointer rounded-md bg-transparent p-2 text-blue-600 hover:bg-blue-50"
					aria-label={t('adsEdit')}
				>
					<Pencil size={18} />
				</Link>

				<DeleteBtn id={row.original.id} />
			</div>
		),
	},
]
