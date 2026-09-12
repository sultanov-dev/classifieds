import { Skeleton } from '@/components/ui/skeleton'

export function FormSkeleton() {
	return (
		<>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2">
				<div className="max-h-110 rounded-lg border p-3.5">
					<Skeleton className="mb-4 h-8 w-10/12" />
					<Skeleton className="mb-6 h-6 w-1/2" />
					<div className="grid grid-cols-2 gap-3">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
					</div>
				</div>

				<div className="max-h-110 w-112.5 rounded-lg border p-3.5">
					<Skeleton className="mb-4 h-8 w-10/12" />
					<Skeleton className="mb-6 h-6 w-1/2" />
					<div className="grid grid-cols-1 gap-3">
						<Skeleton className="h-10 w-full" />
						<Skeleton className="h-10 w-full" />
					</div>
				</div>
			</div>

			<Skeleton className="mt-5 h-11 w-62" />
		</>
	)
}
