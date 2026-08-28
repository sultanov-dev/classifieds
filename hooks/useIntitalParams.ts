import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { startTransition, useEffect, useRef } from 'react'

import { defaultDueryParamsData } from '@/types/listing.types'

export const useInitialParams = () => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const isInitialized = useRef(false)

	useEffect(() => {
		if (isInitialized.current) return

		const newParams = new URLSearchParams(searchParams.toString())
		let hasMissingParams = false

		Object.entries(defaultDueryParamsData).forEach(([key, value]) => {
			if (!newParams.has(key)) {
				newParams.set(key, String(value))
				hasMissingParams = true
			}
		})

		if (hasMissingParams) {
			isInitialized.current = true
			startTransition(() => {
				router.replace(`${pathname}?${newParams.toString()}`, { scroll: false })
			})
		}
	}, [pathname, router, searchParams])
}
