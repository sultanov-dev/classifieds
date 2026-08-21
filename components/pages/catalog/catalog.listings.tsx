import { ProductCard } from '@/components/product/product.card'
import { ProductLoader } from '@/components/product/product.loader'
import type { TListingRemoveUser, TMeta } from '@/types/listing.types'

type Props = {
	isLoading: boolean
	data: {
		listings: TListingRemoveUser[]
		meta: TMeta
	}
}

export function CatalogListings({ isLoading, data }: Props) {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
			{isLoading
				? Array.from({ length: 10 }).map((_, index) => (
						<ProductLoader key={index} />
					))
				: data.listings.map((item) => (
						<ProductCard key={item.id} item={item} />
					))}
		</div>
	)
}
