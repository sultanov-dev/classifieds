'use client'

import { useEffect, useRef } from 'react'

type Props = {
	onLoadMore: () => void
	hasNextPage: boolean
	isFetchingNextPage: boolean
}

export function InfiniteTrigger({
	onLoadMore,
	hasNextPage,
	isFetchingNextPage,
}: Props) {
	const ref = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		if (!ref.current) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
					onLoadMore()
				}
			},
			{ threshold: 0.5 },
		)

		observer.observe(ref.current!)

		return () => observer.disconnect()
	}, [hasNextPage, isFetchingNextPage, onLoadMore])

	return <div ref={ref} className="h-1/5" />
}
