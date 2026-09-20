import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/hooks/useAuth'
import { formatRelativeTime, getInitials } from '@/lib/utils'
import { useReplyStore } from '@/store/useReplyStore'
import type { IComment } from '@/types/comments.type'

import { CommentsHeader } from './comment.header'
import { CommentReplyForm } from './commnt.reply.form'

export function CommentItem({ comment }: { comment: IComment }) {
	const auth = useAuth()
	const { replyCommentId } = useReplyStore()

	const isReplaying = replyCommentId === comment.id

	return (
		<div className="mt-7 flex flex-col gap-3" key={comment.id}>
			<div className="flex justify-center gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-300 font-semibold text-amber-50 uppercase">
					{getInitials(comment.user.fullName)}
				</div>
				<div className="flex flex-col">
					<h5 className="text-base font-medium capitalize">
						{comment.user.fullName}
					</h5>
					<span className="text-xs font-semibold tracking-wider">
						{formatRelativeTime(comment.createdAt)}
					</span>
				</div>
				{comment.isSeller && (
					<Badge
						className="text-xs font-medium capitalize"
						variant={'secondary'}
					>
						Sotuvchi
					</Badge>
				)}

				<CommentsHeader
					commentUserId={comment.user.id}
					curruntUserId={auth.user?.id}
					commentId={comment.id}
				/>
			</div>
			<p className="text-sm tracking-wider">{comment.body}</p>

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
