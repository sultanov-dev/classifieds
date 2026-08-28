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
	}, [searchParams, updateQueryParam])

	const updateQueryParams = (key: keyof TListingParams, value: string) => {
		const newParams = new URLSearchParams(searchParams.toString())

		if (value) {
			newParams.set(key, value)
		} else {
			newParams.delete(key)
		}

		startTransition(() => {
			router.replace(pathname + `?${newParams.toString()}`)
		})
		updateQueryParam({ key, value })
	}

	const resetQueryParams = () => {
		reset()

		startTransition(() => {
			router.replace(pathname)
		})
	}

	return {
		queryParams,
		isFilterUpdated,
		updateQueryParams,
		isPending,
		resetQueryParams,
	}
}
