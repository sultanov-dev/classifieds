import { Skeleton } from '@/components/ui/skeleton'

export function SearchSkeleton() {
	return (
		<div className="flex w-full items-center gap-3">
			<Skeleton className="aspect-square h-15 w-15 overflow-hidden rounded-md bg-neutral-200/50" />
			<div className="flex w-full flex-col gap-2.5">
				<Skeleton className="h-7 w-10/12 bg-neutral-200/50" />
				<Skeleton className="h-5 w-14 bg-neutral-200/50" />
			</div>
		</div>
	)
}
