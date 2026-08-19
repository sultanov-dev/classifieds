import { Skeleton } from '../ui/skeleton'

export function ProductLoader() {
	return (
		<div className="w-full max-w-xl">
			<div className="bg-background w-full min-w-0 rounded-md shadow-md">
				<Skeleton className="relative aspect-square h-48.75 w-full bg-mauve-200 outline-hidden" />
			</div>
			<div className="flex h-36.25 flex-col justify-center p-3.5">
				<div className="mb-3">
					<Skeleton className="h-5 bg-mauve-200" />
					<Skeleton className="mt-3 h-3.5 bg-mauve-200" />
				</div>
				<div className="mt-3 flex items-center justify-between">
					<Skeleton className="h-3 w-1/2 bg-mauve-200" />
					<Skeleton className="h-3 w-1/3 bg-mauve-200" />
				</div>
			</div>
		</div>
	)
}
