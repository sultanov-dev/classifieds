import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { commentsService } from '@/services/comments/comments.service'
import { useReplyStore } from '@/store/useReplyStore'
import {
	commentSchema,
	type TCommentSchema,
} from '@/validation/comment.validation'

export const useComments = (listingId: string, commentId: string | null) => {
	const queryClient = useQueryClient()
	const closeReply = useReplyStore((state) => state.closeReply)

	const {
		control: commentControl,
		handleSubmit: commentHandleSubmit,
		reset: commentReset,
	} = useForm<TCommentSchema>({
		resolver: zodResolver(commentSchema),
		values: {
			body: '',
		},
	})

	const { mutate: commentMutate, isPending: commentIsPending } = useMutation({
		mutationKey: [commentId ? 'reply-create' : 'comment-create'],
		mutationFn: (data: TCommentSchema) =>
			commentsService.createComment(listingId, data),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [commentId ? 'reply-get' : 'comments-get'],
			})
			commentReset()
		},
	})

	const commentOnSubmit = (data: TCommentSchema) => {
		const payload = {
			...data,
			parentId: commentId ? commentId : '',
		}

		commentMutate(payload)
		closeReply()
	}

	return {
		commentControl,
		commentHandleSubmit,
		commentOnSubmit,
		commentIsPending,
	}
}
