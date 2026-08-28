'use client'

import { Suspense } from 'react'

import { useQuery } from '@tanstack/react-query'

import { useFilter } from '@/hooks/useFilter'
import { useInitialParams } from '@/hooks/useIntitalParams'
import { listingService } from '@/services/listing.service'
import Container from '@/shared/container'
import { IGetListingResponse } from '@/types/listing.types'

import { CatalogListings } from './catalog.listings'
import CatalogLoader from './catalog.loader'
import { CatalogPagination } from './catalogPagination'
import { CatalogFilter } from './catolog.filter'

export function CatalogExplorer({
	initialData,
}: {
	initialData: IGetListingResponse
}) {
	const { queryParams, isFilterUpdated, isPending: filterPending } = useFilter()
	useInitialParams()

	const { data, isPending, isLoading, isFetching, isRefetching } = useQuery({
		queryKey: ['catalog-explorer', queryParams],
		queryFn: () => listingService.getLisings(queryParams),
		initialData: initialData,
		enabled: isFilterUpdated,
	})

	const isCatalogLoading = isPending || isFetching || isLoading || isRefetching

	return (
		<Container className="mt-10">
			{filterPending && <div>query</div>}
			<div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
				<aside className="hidden lg:block">
					<CatalogFilter />
				</aside>
				{!data.data.listings?.length ? (
					<div className="flex items-center justify-center">
						So&apos;rovlar bo&apos;yicha e&apos;lon topilmadi
					</div>
				) : (
					<Suspense fallback={<CatalogLoader />}>
						<CatalogListings isLoading={isCatalogLoading} data={data.data} />
					</Suspense>
				)}
			</div>

			<div className="my-5 flex w-full items-center justify-center">
				<CatalogPagination totalPages={data.data.meta.totalPages} />
			</div>
		</Container>
	)
}
