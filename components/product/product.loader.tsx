import { ListingSkeleton } from '@/shared/listing.skeleton'

import { Skeleton } from '../ui/skeleton'

export function ProductLoader() {
	return (
		<div className="my-16 h-full w-full">
			<div className="mb-6 flex items-center justify-between">
				<Skeleton className="h-5 w-1/4 bg-mauve-200" />
				<Skeleton className="h-5 w-20 bg-mauve-200" />
			</div>

			<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{Array.from({ length: 10 }).map((_, index) => (
					<ListingSkeleton key={index} />
				))}
			</div>
		</div>
	)
}
