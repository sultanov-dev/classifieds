'use client'

import Image from 'next/image'

import { useInifinityListings } from '@/hooks/useInfinityListings'
import { formatAdDate } from '@/lib/utils'
import { Heading } from '@/shared/heading'
import { InfiniteTrigger } from '@/shared/infiniteTrigger'
import { Loader } from '@/shared/loader'

export function HistoryContent() {
	const { hasNextPage, isFetchingNextPage, fetchNextPage, data } =
		useInifinityListings()

	const listings = data?.pages.flatMap((page) => page.data.listings) ?? []

	return (
		<div className="my-10">
			<Heading title="Tarix" className="mb-5" />
			{listings.map((item) => (
				<div
					className="mb-6 flex w-full items-center rounded-md shadow-md last:mb-0"
					key={item.id}
				>
					<div className="relative aspect-square h-44.5 w-42 overflow-hidden">
						<Image
							className="rounded-xl object-cover p-2"
							src={item.images[0].thumbnailUrl}
							alt={item.title}
							fill
							sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
						/>
					</div>
					<div className="ml-4 flex flex-col justify-center">
						<h1 className="line-clamp-2 w-105 text-base font-normal md:text-2xl">
							{item.title}
						</h1>
						<span className="mt-5 mb-5 text-base font-semibold lg:text-2xl">
							{item.price}
						</span>
						<div className="flex items-center justify-between border-t px-3 pt-3">
							<span className="text-muted-foreground text-xs font-normal capitalize">
								{item.region}
							</span>
							<span className="text-muted-foreground text-xs font-normal capitalize">
								{formatAdDate(item.createdAt)}
							</span>
						</div>
					</div>
				</div>
			))}

			<InfiniteTrigger
				onLoadMore={fetchNextPage}
				hasNextPage={hasNextPage}
				isFetchingNextPage={isFetchingNextPage}
			/>

			{isFetchingNextPage && (
				<div className="flex items-center justify-center">
					<Loader className="size-5" />
				</div>
			)}
		</div>
	)
}
