'use client'

import { useMyListings } from '@/hooks/useMyListings'
import { HasNoResult } from '@/shared/hasNoResult'
import type {
	IGetListingResponse,
	TListingRemoveUser,
} from '@/types/listing.types'

import { AdsTableLoader } from './ads.table.loader'
import { columns } from './columns'
import { DataTable } from './data-table'

export default function ProfileAds({
	initialData,
}: {
	initialData: IGetListingResponse
}) {
	const { isListingLoad, data } = useMyListings(initialData)

	const listings = (data?.listings ?? []) as TListingRemoveUser[]
	const hasNoListings = !isListingLoad && listings.length === 0

	return (
		<div className="mt-10">
			{isListingLoad ? (
				<AdsTableLoader />
			) : hasNoListings ? (
				<HasNoResult text={"Hali e'lon qo'shmagansiz"} />
			) : (
				<DataTable data={listings} columns={columns} />
			)}
		</div>
	)
}
