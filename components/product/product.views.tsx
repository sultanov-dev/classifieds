'use client'

import { useListings } from '@/hooks/useListings'
import { Heading } from '@/shared/heading'

import { ProductCard } from './product.card'
import { ProductLoader } from './product.loader'

type TProductViews = {
	title?: string
}

export default function ProductViews({ title }: TProductViews) {
	const { data, isLoading } = useListings()

	if (!data || !data.listings.length) {
		return (
			<div className="my-16 flex h-full items-center justify-center">
				<h1>Elon topilmadi</h1>
			</div>
		)
	}

	return (
		<div className="my-16 h-full">
			{title && <Heading title={title} className="mb-5" />}
			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{isLoading
					? Array.from([1, 2, 3, 4]).map((_, index) => (
							<ProductLoader key={index} />
						))
					: data.listings.map((item) => (
							<ProductCard item={item} key={item.id} />
						))}
			</div>
		</div>
	)
}
