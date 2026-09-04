import { ListingSkeleton } from './listing.skeleton'

export function GridSkeleton() {
	return (
		<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{Array.from({ length: 10 }).map((_, index) => (
				<ListingSkeleton key={index} />
			))}
		</div>
	)
}
