import { Skeleton } from '@/components/ui/skeleton'
import Container from '@/shared/container'

export default function AdDetailLoading() {
	return (
		<Container>
			<div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
				<section className="bg-background h-fit rounded-md p-7 shadow-md">
					<Skeleton className="aspect-video h-85 w-full" />
					<div className="mt-5 flex h-20 w-full items-center gap-3">
						<Skeleton className="h-full w-full" />
						<Skeleton className="h-full w-full" />
						<Skeleton className="h-full w-full" />
						<Skeleton className="h-full w-full" />
					</div>
					<div className="mt-5 flex items-center justify-between border-t pt-5">
						<div className="flex w-full items-center gap-6">
							<Skeleton className="h-6 w-20" />
							<Skeleton className="h-4 w-18" />
						</div>
						<div className="flex items-center gap-4">
							<Skeleton className="h-10 w-10 rounded-full" />
							<Skeleton className="h-10 w-10 rounded-full" />
						</div>
					</div>
					<Skeleton className="mt-4 h-8 w-1/2" />
					<Skeleton className="mt-4 h-5 w-1/4" />
					<div className="mt-7.5 space-y-7">
						{[1, 2, 3, 4, 5].map((_, index) => (
							<div className="relative flex justify-between" key={index}>
								<Skeleton className="z-10 h-4 w-18" />

								<Skeleton className="z-10 h-4 w-14" />
							</div>
						))}
					</div>
					<div className="mt-10 w-full border-t pt-6">
						<Skeleton className="mb-4 h-5 w-1/2" />
						<Skeleton className="mb-2 h-2 w-11/12" />
						<Skeleton className="mb-2 h-2 w-11/12" />
						<Skeleton className="mb-2 h-2 w-11/12" />
					</div>
				</section>

				<aside className="bg-background h-fit rounded-md p-4 shadow-md">
					<div className="flex flex-col items-center gap-y-3">
						<Skeleton className="h-4 w-1/2" />
						<Skeleton className="h-4 w-1/2" />
					</div>
				</aside>
			</div>
		</Container>
	)
}
