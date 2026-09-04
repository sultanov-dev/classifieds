import type { TListingRemoveUser } from '@/types/listing.types'

import { ProductCard } from './product.card'

export function ProductGrid({ listings }: { listings: TListingRemoveUser[] }) {
	return (
		<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{listings.map((item) => (
				<ProductCard item={item} key={item.id} />
			))}
		</div>
	)
}
