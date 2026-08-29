import Image from 'next/image'
import Link from 'next/link'

import { formatCurrency } from '@/lib/utils'
import type { TListingRemoveUser } from '@/types/listing.types'

export function SearchItem({
	item,
	onClose,
}: {
	item: TListingRemoveUser
	onClose: () => void
}) {
	return (
		<Link
			className="rounded-md border-b p-1.5 transition-colors hover:bg-neutral-200/60"
			href={`/ads/${item.id}`}
			onClick={onClose}
		>
			<div className="flex items-center gap-2.5">
				<div className="relative aspect-square h-12 w-12 overflow-hidden rounded-md">
					<Image
						src={item.images[0].thumbnailUrl}
						alt={item.title}
						fill
						sizes="48px"
						className="object-cover"
					/>
				</div>
				<div className="flex flex-col gap-1">
					<h5>{item.title}</h5>
					<p>
						{formatCurrency(item.price, {
							currency: item.currency,
							locale: item.currency === 'USD' ? 'en-US' : 'uz-UZ',
						})}
					</p>
				</div>
			</div>
		</Link>
	)
}
