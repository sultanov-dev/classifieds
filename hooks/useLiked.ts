import { useCallback, useState, useTransition } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { listingService } from '@/services/listing.service'
import type { IGetListingResponse } from '@/types/listing.types'

export const useLiked = (isLike: boolean) => {
	const queryClient = useQueryClient()
	const [inState, setInState] = useState<boolean>(isLike)
	const [isPending, startTransition] = useTransition()

	// const [optimisticLiked, addOptimistic] = useOptimistic<boolean, boolean>(
	// 	inState,
	// 	(_state, target) => target,
	// )

	const { mutate: likedMutate, isPending: likeLoading } = useMutation({
		mutationKey: ['like-listing'],
		mutationFn: (id: string) => listingService.likedListing(id),
		onMutate: async (id) => {
			await queryClient.cancelQueries({ queryKey: ['catalog-explorer'] })
			await queryClient.cancelQueries({ queryKey: ['listings'] })

			const previousCatalog = queryClient.getQueriesData({
				queryKey: ['catalog-explorer'],
			})
			const previousListings = queryClient.getQueriesData({
				queryKey: ['listings'],
			})

			queryClient.setQueriesData(
				{ queryKey: ['catalog-explorer'] },
				(old: IGetListingResponse) => {
					if (!old?.data.listings.length) return old
					return {
						...old.data,
						data: {
							listings: old.data.listings.map((item) =>
								item.id === id ? { ...item, isLiked: !item.isLiked } : item,
							),
						},
					}
				},
			)

			// queryClient.setQueriesData(
			// 	{ queryKey: ['listings'] },
			// 	(old: IGetListingResponse) => {
			// 		if (!old?.data.listings.length) return old
			// 		return {
			// 			...old.data,
			// 			data: old.data.listings.map((item) =>
			// 				item.id === id ? { ...item, isLiked: !item.isLiked } : item,
			// 			),
			// 		}
			// 	},
			// )

			return { previousCatalog, previousListings }
		},
		onError: (err, id, context) => {
			context?.previousCatalog?.forEach(
				([queryKey, data]: [readonly unknown[], unknown]) => {
					queryClient.setQueryData(queryKey, data)
				},
			)
			// context?.previousListings?.forEach(
			// 	([queryKey, data]: [readonly unknown[], unknown]) => {
			// 		queryClient.setQueryData(queryKey, data)
			// 	},
			// )
			toast.error("Xatolik bo'ldi")
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['catalog-explorer'] })
			queryClient.invalidateQueries({ queryKey: ['listings'] })
		},
	})

	const handleToggle = useCallback(
		(id: string) => {
			const nextState = !inState

			startTransition(() => {
				likedMutate(id)
				setInState(nextState)
			})
		},
		[inState, likedMutate, startTransition],
	)

	const isLoading = isPending || likeLoading

	return { isLoading, handleToggle }
}
