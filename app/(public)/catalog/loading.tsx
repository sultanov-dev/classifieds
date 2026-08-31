import { Skeleton } from '@/components/ui/skeleton'
import Container from '@/shared/container'
import { ListingSkeleton } from '@/shared/listing.skeleton'

export default function CatalogSkeleton() {
	return (
		<Container className="mt-10">
			<div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
				<aside className="hidden lg:block">
					<div className="bg-background sticky top-6 rounded-md p-3 shadow">
						<Skeleton className="h-6 w-full bg-mauve-200" />
						<div className="mt-6 w-full">
							<Skeleton className="mb-3 h-5 w-1/2 bg-mauve-200" />
							<div className="flex flex-wrap items-center gap-3">
								{Array.from({ length: 3 }).map((_, index) => (
									<Skeleton className="h-7 w-20 bg-mauve-200" key={index} />
								))}
							</div>
						</div>
						<Skeleton className="mt-4 h-7 w-full bg-mauve-200" />
					</div>
				</aside>

				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{Array.from({ length: 10 }).map((_, index) => (
						<ListingSkeleton key={index} />
					))}
				</div>
			</div>

			<div className="my-5 flex w-full items-center justify-center gap-3">
				<Skeleton className="h-7 w-24 bg-mauve-200" />
				<Skeleton className="h-7 w-7 bg-mauve-200" />
				<Skeleton className="h-7 w-7 bg-mauve-200" />
				<Skeleton className="h-7 w-7 bg-mauve-200" />
				<Skeleton className="h-7 w-24 bg-mauve-200" />
			</div>
		</Container>
	)
}
