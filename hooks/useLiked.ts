import { useCallback, useTransition } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { listingService } from '@/services/listing.service'
import type { IGetListingResponse } from '@/types/listing.types'

export const useLiked = (initialLiked: boolean, listingId: string) => {
	const queryClient = useQueryClient()
	const [isPending, startTransition] = useTransition()

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
							...old.data,
							listings: old.data.listings.map((item) =>
								item.id === id ? { ...item, isLiked: !item.isLiked } : item,
							),
						},
					}
				},
			)
			return { previousCatalog, previousListings }
		},
		onError: (err, id, context) => {
			context?.previousCatalog?.forEach(
				([queryKey, data]: [readonly unknown[], unknown]) => {
					queryClient.setQueryData(queryKey, data)
				},
			)

			toast.error("Xatolik bo'ldi")
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: ['catalog-explorer', listingId],
			})
			queryClient.invalidateQueries({ queryKey: ['listings', listingId] })
		},
	})

	const isLiked =
		queryClient.getQueryData<boolean>(['listings-liked', listingId]) ??
		initialLiked

	const handleToggle = useCallback(
		(id: string) => {
			startTransition(() => {
				likedMutate(id)
			})
		},
		[likedMutate, startTransition],
	)

	const isLoading = isPending || likeLoading

	return { isLoading, handleToggle, isLiked }
}
