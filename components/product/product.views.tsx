import Link from 'next/link'

import { MoveRightIcon } from 'lucide-react'

import { publicPages } from '@/config/pages.config'
import { listingService } from '@/services/listing.service'
import { Heading } from '@/shared/heading'

import { ProductLoadMore } from './product.loadMore'

type TProductViews = {
	title?: string
	isHomePage?: boolean
	type: 'latest' | 'all'
}

export const revalidate = 60

export default async function ProductViews({
	title,
	isHomePage,
	type,
}: TProductViews) {
	const response = await listingService.getLisings({ type, page: 1, limit: 10 })

	return (
		<div className="my-16 h-full">
			<div className="flex items-center justify-between">
				{title && <Heading title={title} className="mb-5" />}
				{isHomePage && (
					<Link
						className="flex items-center gap-2 text-sky-400"
						href={publicPages.CATALOG}
					>
						Barcha e&apos;lonlar <MoveRightIcon className="siz-3" />
					</Link>
				)}
			</div>
			<ProductLoadMore initialData={response} type={type} />
		</div>
	)
}
