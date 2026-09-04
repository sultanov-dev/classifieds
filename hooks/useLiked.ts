import { useCallback } from 'react'

import {
	useMutation,
	useQueryClient,
	type QueryKey,
} from '@tanstack/react-query'
import { toast } from 'sonner'

import { listingService } from '@/services/listing.service'
import type { IGetListingResponse } from '@/types/listing.types'

export const useLiked = (initialLiked: boolean, listingId: string) => {
	const queryClient = useQueryClient()

	const { mutate: likedMutate, isPending: likeLoading } = useMutation({
		mutationKey: ['like-listing', listingId],
		mutationFn: (id: string) => listingService.likedListing(id),
		onMutate: async (id) => {
			await Promise.all([
				queryClient.cancelQueries({ queryKey: ['catalog-explorer'] }),
				queryClient.cancelQueries({ queryKey: ['listings'] }),
				queryClient.cancelQueries({ queryKey: ['liked-my-listings'] }),
			])

			const previousCatalog = queryClient.getQueriesData({
				queryKey: ['catalog-explorer'],
			})
			const previousListings = queryClient.getQueriesData({
				queryKey: ['listings'],
			})
			const previousMyLiked = queryClient.getQueriesData({
				queryKey: ['liked-my-listings'],
			})

			const toggleLikedInCache = (queryKey: QueryKey) => {
				queryClient.setQueriesData<IGetListingResponse>({ queryKey }, (old) => {
					if (!old?.data?.listings?.length) return old

					return {
						...old,
						data: {
							...old.data,
							listings: old.data.listings.map((item) =>
								item.id === id ? { ...item, isLiked: !item.isLiked } : item,
							),
						},
					}
				})
			}

			toggleLikedInCache(['catalog-explorer'])
			toggleLikedInCache(['listings'])

			queryClient.setQueriesData<IGetListingResponse>(
				{ queryKey: ['liked-my-listings'] },
				(old) => {
					if (!old?.data?.listings?.length) return old

					return {
						...old,
						data: {
							...old.data,
							listings: old.data.listings.filter((item) => item.id !== id),
						},
					}
				},
			)

			return { previousCatalog, previousListings, previousMyLiked }
		},
		onError: (err, id, context) => {
			context?.previousListings.forEach(([queryKey, data]) => {
				queryClient.setQueryData(queryKey, data)
			})
			context?.previousListings.forEach(([queryKey, data]) => {
				queryClient.setQueryData(queryKey, data)
			})

			context?.previousListings.forEach(([queryKey, data]) => {
				queryClient.setQueryData(queryKey, data)
			})

			toast.error("Xatolik bo'ldi")
		},
		onSettled: async () => {
			await Promise.all([
				queryClient.invalidateQueries({
					queryKey: ['catalog-explorer'],
				}),
				queryClient.invalidateQueries({ queryKey: ['listings'] }),
				queryClient.invalidateQueries({
					queryKey: ['liked-my-listings'],
				}),
			])
		},
	})

	const handleToggle = useCallback(() => {
		if (!likeLoading) {
			likedMutate(listingId)
		}
	}, [likedMutate, likeLoading, listingId])

	return { likeLoading, handleToggle, initialLiked }
}
