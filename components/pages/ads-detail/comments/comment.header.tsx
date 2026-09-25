import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CornerDownLeftIcon, PencilIcon, Trash2Icon } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Button } from '@/components/ui/button'
import { commentsKeys } from '@/lib/querykeys/comments'
import { commentsService } from '@/services/comments/comments.service'
import { useReplyStore } from '@/store/useReplyStore'

type Props = {
	commentUserId: string
	curruntUserId: string | undefined
	commentId: string
	listingId: string
	onEdit: () => void
}

export function CommentsHeader({
	commentUserId,
	curruntUserId,
	commentId,
	listingId,
	onEdit,
}: Props) {
	const t = useTranslations('Comments')
	const { showReply } = useReplyStore()
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: commentsKeys.commentDelete(commentId),
		mutationFn: () => commentsService.deleteComment(commentId),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: commentsKeys.list(listingId) }),
	})

	return (
		<div className="ml-auto flex gap-2">
			<Button
				className="w-fit cursor-pointer justify-end font-semibold text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white"
				size={'xs'}
				variant={'secondary'}
				onClick={() => showReply(commentId)}
			>
				<CornerDownLeftIcon />
				{t('reply')}
			</Button>
			{commentUserId === curruntUserId && (
				<Button
					className="cursor-pointer"
					variant={'outline'}
					size={'icon-xs'}
					onClick={onEdit}
				>
					<PencilIcon />
				</Button>
			)}
			{commentUserId === curruntUserId && (
				<Button
					className="cursor-pointer"
					variant={'destructive'}
					size={'icon-xs'}
					onClick={() => mutate()}
					disabled={isPending}
				>
					<Trash2Icon />
				</Button>
			)}
		</div>
	)
}
