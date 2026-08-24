'use client'

import Link from 'next/link'

import { MoveRightIcon } from 'lucide-react'

import { useListings } from '@/hooks/useListings'
import { publicPages } from '@/config/pages.config'
import { Heading } from '@/shared/heading'

import { ProductCard } from './product.card'
import { ProductLoader } from './product.loader'

type TProductViews = {
	title?: string
	isHomePage?: boolean
}

export default function ProductViews({ title, isHomePage }: TProductViews) {
	const { data, isLoading } = useListings()

	if (!data || !data.listings?.length) {
		return (
			<div className="my-16 flex h-full items-center justify-center">
				<h1>Elon topilmadi</h1>
			</div>
		)
	}

	return (
		<div className="my-16 h-full">
			<div className="flex items-center justify-between">
				{title && <Heading title={title} className="mb-5" />}
				{isHomePage && (
					<Link
						className="flex items-center gap-2 text-sky-400"
						href={publicPages.CATALOG}
					>
						Barcha elonlar <MoveRightIcon className="siz-3" />
					</Link>
				)}
			</div>
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
