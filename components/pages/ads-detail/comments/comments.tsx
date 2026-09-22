import { useQuery } from '@tanstack/react-query'

import { commentsKeys } from '@/lib/querykeys/comments'
import { commentsService } from '@/services/comments/comments.service'
import { Loader } from '@/shared/loader'

import { CommentItem } from './comment.item'

export function Comments({ listingId }: { listingId: string }) {
	const { data, isFetching, isLoading } = useQuery({
		queryKey: commentsKeys.list(listingId),
		queryFn: () => commentsService.getListingComments(listingId),
		select: (data) => data.data.comments,
		enabled: !!listingId,
	})

	const isCommentsLoading = isFetching || isLoading

	return (
		<>
			{isCommentsLoading ? (
				<div className="my-5 flex items-center justify-center">
					<Loader />
				</div>
			) : (
				data &&
				data.map((comment) => (
					<CommentItem comment={comment} key={comment.id} />
				))
			)}
		</>
	)
}
