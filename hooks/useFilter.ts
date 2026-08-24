import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useTransition } from 'react'

import { useFilterStore } from '@/store/useFilterStore'
import type { TListingParams } from '@/types/listing.types'

export const useFilter = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const { queryParams, updateQueryParam, isFilterUpdated, reset } =
		useFilterStore()

	useEffect(() => {
		searchParams.forEach((value, key) => {
			updateQueryParam({
				key: key as keyof TListingParams,
				value,
			})
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const updateQueryParams = (key: keyof TListingParams, value: string) => {
		const newParams = new URLSearchParams(searchParams.toString())

		if (value) {
			newParams.set(key, value)
		} else {
			newParams.delete(key)
		}

		startTransition(() => {
			router.replace(pathname + `?${newParams.toString()}`, { scroll: false })
		})
		updateQueryParam({ key, value })
	}

	return { queryParams, isFilterUpdated, updateQueryParams, isPending, reset }
}
