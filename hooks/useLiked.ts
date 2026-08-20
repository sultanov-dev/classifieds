import { useOptimistic, useState, useTransition } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { listingService } from '@/services/listing.service'

export const useLiked = (isLiked: boolean) => {
	const queryClient = useQueryClient()
	const [inState, setInState] = useState<boolean>(isLiked)
	const [isPending, startTransition] = useTransition()

	const [optimisticLiked, addOptimistic] = useOptimistic<boolean, boolean>(
		inState,
		(_state, target) => target,
	)

	const { mutate: likedMutate, isPending: likeLoading } = useMutation({
		mutationKey: ['like-listing'],
		mutationFn: (id: string) => listingService.likedListing(id),
		onSuccess: (_, variable) =>
			queryClient.invalidateQueries({ queryKey: ['listings', variable] }),
		onError: () => toast.error('Xatolik sodir boldi'),
	})

	const handleToggle = (id: string) => {
		const nextState = !optimisticLiked

		startTransition(() => {
			addOptimistic(nextState)

			likedMutate(id)
			setInState(nextState)
		})
	}

	const isLoading = isPending || likeLoading

	return { isLoading, handleToggle, optimisticLiked }
}
