'use client'

import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'

import { useFilter } from '@/hooks/useFilter'
import { useInitialParams } from '@/hooks/useIntitalParams'
import { listingKeys } from '@/lib/querykeys/listing'
import { listingService } from '@/services/listing/listing.service'
import Container from '@/shared/container'
import type { IGetListingResponse } from '@/types/listing.types'

import { CatalogListings } from './catalog.listings'
import { CatalogPagination } from './catalogPagination'
import { CatalogFilter } from './catolog.filter'

export function CatalogExplorer({
	initialData,
}: {
	initialData: IGetListingResponse
}) {
	const t = useTranslations('Catalog')
	const locale = useLocale()

	useInitialParams()

	const { queryParams, isFilterUpdated, isPending: filterPending } = useFilter()

	const { data, isPending, isLoading, isFetching, isRefetching } = useQuery({
		queryKey: [listingKeys.catalog, queryParams, locale],
		queryFn: () => listingService.getLisings(queryParams),
		initialData: initialData,
		enabled: isFilterUpdated,
		select: (data) => data.data,
	})

	const isCatalogLoading = isPending || isFetching || isLoading || isRefetching

	return (
		<Container className="mt-10">
			{filterPending && <div>query</div>}
			<div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
				<aside className="hidden lg:block">
					<CatalogFilter />
				</aside>
				{!data.listings?.length ? (
					<div className="flex items-center justify-center">{t('empty')}</div>
				) : (
					<CatalogListings isLoading={isCatalogLoading} data={data} />
				)}
			</div>

			<div className="my-5 flex w-full items-center justify-center">
				<CatalogPagination totalPages={data.meta.totalPages} />
			</div>
		</Container>
	)
}
