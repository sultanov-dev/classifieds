import { GridSkeleton } from '@/shared/grid.loader'

import { Skeleton } from '../ui/skeleton'

export function ProductLoader() {
	return (
		<div className="my-16 h-full w-full">
			<div className="mb-6 flex items-center justify-between">
				<Skeleton className="h-5 w-1/4 bg-mauve-200" />
				<Skeleton className="h-5 w-20 bg-mauve-200" />
			</div>

			<GridSkeleton />
		</div>
	)
}
