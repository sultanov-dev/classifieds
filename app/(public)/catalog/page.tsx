import { CatalogExplorer } from '@/components/pages/catalog/catalog.explorer'
import { listingService } from '@/services/listing.service'
import type { TListingParams } from '@/types/listing.types'

type TSearchParams = Promise<TListingParams>

export const revalidate = 30

export default async function CatalogPage({
	searchParams,
}: {
	searchParams: TSearchParams
}) {
	const resolvedSearchParams = await searchParams

	const data = await listingService.getLisings({
		...resolvedSearchParams,
		limit: resolvedSearchParams.limit || 10,
	})

	return <CatalogExplorer initialData={data} />
}
