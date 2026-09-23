import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { applyLikeToCache } from '@/lib/listing.cache'
import { listingCachePredicate, listingKeys } from '@/lib/querykeys/listing'
import { listingService } from '@/services/listing/listing.service'
import { useLikedStore } from '@/store/liked.store'

import { useLikedIds } from './useLikedIds'

export const useLiked = (initialLiked: boolean, listingId: string) => {
	const queryClient = useQueryClient()
	const override = useLikedStore((s) => s.overrides[listingId])
	const setLiked = useLikedStore((s) => s.setLiked)

	const likedIds = useLikedIds()
	const serverLiked = likedIds?.has(listingId) ?? initialLiked
	const isLiked = override ?? serverLiked

	const { mutate, isPending } = useMutation({
		mutationKey: ['like-listing', listingId],
		scope: { id: `like-${listingId}` },
		mutationFn: () => listingService.likedListing(listingId),
		onMutate: async () => {
			const next = !isLiked

			await queryClient.cancelQueries({ predicate: listingCachePredicate })
			const snapshot = queryClient.getQueriesData({
				predicate: listingCachePredicate,
			})

			setLiked(listingId, next)
			applyLikeToCache(queryClient, listingId, next)

			return { snapshot, previous: isLiked }
		},
		onError: (err, _id, context) => {
			context?.snapshot.forEach(([key, data]) =>
				queryClient.setQueryData(key, data),
			)

			if (context) setLiked(listingId, context.previous)

			if (isAxiosError(err) && err.response?.status === 401) {
				toast.error('Avval tizimga kiring')

				return
			}

			toast.error("Xatolik bo'ldi")
		},
		onSettled: () => {
			if (queryClient.isMutating({ mutationKey: ['like-listing'] }) > 1) return

			queryClient.invalidateQueries({ queryKey: [listingKeys.likedIds] })
			queryClient.invalidateQueries({ predicate: listingCachePredicate })
		},
	})

	return { isPending, toggle: () => mutate(), isLiked }
}
