'use client'

import { useMemo } from 'react'

import { useTranslations } from 'next-intl'

import { useMyListings } from '@/hooks/useMyListings'
import { HasNoResult } from '@/shared/hasNoResult'
import type {
	IGetListingResponse,
	TListingRemoveUser,
} from '@/types/listing.types'

import { AdsTableLoader } from './ads.table.loader'
import { getColumns } from './columns'
import { DataTable } from './data-table'

export default function ProfileAds({
	initialData,
}: {
	initialData: IGetListingResponse
}) {
	const t = useTranslations('Profile')
	const { isListingLoad, data } = useMyListings(initialData)

	const columns = useMemo(() => getColumns(t), [t])

	const listings = (data?.listings ?? []) as TListingRemoveUser[]
	const hasNoListings = !isListingLoad && listings.length === 0

	return (
		<div className="mt-10">
			{isListingLoad ? (
				<AdsTableLoader />
			) : hasNoListings ? (
				<HasNoResult text={t('adsEmpty')} />
			) : (
				<DataTable data={listings} columns={columns} />
			)}
		</div>
	)
}
