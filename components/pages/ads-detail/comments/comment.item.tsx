import { useParams } from 'next/navigation'
import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'

import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { commentsKeys } from '@/lib/querykeys/comments'
import { formatRelativeTime, getInitials } from '@/lib/utils'
import { commentsService } from '@/services/comments/comments.service'
import { Loader } from '@/shared/loader'
import { useReplyStore } from '@/store/useReplyStore'
import type { IComment } from '@/types/comments.type'

import { CommentEditForm } from './comment.edit.form'
import { CommentsHeader } from './comment.header'
import { CommentReplyForm } from './comment.reply.form'
import { ReplyItem } from './reply.item'

export function CommentItem({ comment }: { comment: IComment }) {
	const t = useTranslations('Comments')
	const tTime = useTranslations('Time')
	const locale = useLocale()

	const [isEditing, setIsEditing] = useState(false)
	const closeReply = useReplyStore((s) => s.closeReply)

	const auth = useAuth()
	const { replyCommentId } = useReplyStore()
	const { id } = useParams<{ id: string }>()

	const { data, isLoading, isFetching } = useQuery({
		queryKey: [...commentsKeys.replies(comment.id), locale],
		queryFn: () => commentsService.getCommentReplies(comment.id),
		select: (data) => data.data,
	})

	const isRepliesLoading = isLoading || isFetching
	const isReplaying = replyCommentId === comment.id

	return (
		<div className="mt-7 flex flex-col gap-3">
			<div className="flex justify-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-300 font-semibold text-amber-50 uppercase">
					{getInitials(comment.user.fullName)}
				</div>
				<div className="flex flex-col">
					<h5 className="text-base font-medium capitalize">
						{comment.user.fullName}
					</h5>
					{comment.editedAt ? (
						<span className="text-xs font-semibold tracking-wider">
							{formatRelativeTime(comment.editedAt, tTime)}{' '}
							<span className="text-xs italic">{t('edited')}</span>
						</span>
					) : (
						<span className="text-xs font-semibold tracking-wider">
							{formatRelativeTime(comment.createdAt, tTime)}
						</span>
					)}
				</div>
				{comment.isSeller && (
					<Badge
						className="text-xs font-medium capitalize"
						variant={'secondary'}
					>
						{t('seller')}
					</Badge>
				)}

				<CommentsHeader
					commentUserId={comment.user.id}
					curruntUserId={auth.user?.id}
					commentId={comment.id}
					listingId={id}
					onEdit={() => {
						closeReply()
						setIsEditing(true)
					}}
				/>
			</div>

			{isEditing ? (
				<CommentEditForm
					comment={comment}
					commentUserName={comment.user.fullName}
					replyUserName={auth.user?.fullName}
					commentId={comment.id}
					onClose={() => setIsEditing(false)}
				/>
			) : (
				<p className="text-sm tracking-wider">{comment.body}</p>
			)}

			{isRepliesLoading ? (
				<div className="flex items-center justify-center">
					<Loader />
				</div>
			) : (
				data?.replies &&
				data.replies.map((reply) => <ReplyItem reply={reply} key={reply.id} />)
			)}

			{isReplaying && (
				<CommentReplyForm
					commentUserName={comment.user.fullName}
					replyUserName={auth.user?.fullName}
					commentId={comment.id}
				/>
			)}
		</div>
	)
}
