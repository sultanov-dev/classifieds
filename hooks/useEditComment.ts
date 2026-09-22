import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

import { commentsKeys } from '@/lib/querykeys/comments'
import { commentsService } from '@/services/comments/comments.service'
import type { IComment } from '@/types/comments.type'
import {
	commentSchema,
	type TCommentSchema,
} from '@/validation/comment.validation'

export const useEditComment = (
	comment: IComment,
	listingId: string,
	onClose: () => void,
) => {
	const queryClient = useQueryClient()

	const { control, handleSubmit } = useForm<TCommentSchema>({
		resolver: zodResolver(commentSchema),
		defaultValues: {
			body: comment.body,
		},
	})

	const { mutate: editMutate, isPending: editIsPending } = useMutation({
		mutationKey: commentsKeys.commentEdit(comment.id),
		mutationFn: (data: TCommentSchema) =>
			commentsService.editComment(comment.id, { body: data.body }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: commentsKeys.list(listingId) })
			onClose()
		},
	})

	const editHandle = (data: TCommentSchema) => {
		editMutate(data)
	}

	return { control, editIsPending, handleSubmit, editHandle }
}
