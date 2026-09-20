import { Badge } from '@/components/ui/badge'
import { formatRelativeTime, getInitials } from '@/lib/utils'
import type { IReply } from '@/types/comments.type'

export function ReplyItem({ reply }: { reply: IReply }) {
	return (
		<div className="my-2 ml-4 flex flex-col gap-3 rounded-xl bg-emerald-100 px-3 py-2">
			<div className="flex gap-3">
				<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-300 font-semibold text-amber-50 uppercase">
					{getInitials(reply.user.fullName)}
				</div>
				<div className="flex flex-col">
					<h5 className="text-base font-medium capitalize">
						{reply.user.fullName}
					</h5>
					<span className="text-xs font-semibold tracking-wider">
						{formatRelativeTime(reply.createdAt)}
					</span>
				</div>
				{reply.isSeller && (
					<Badge
						className="text-xs font-medium capitalize"
						variant={'secondary'}
					>
						Sotuvchi
					</Badge>
				)}
			</div>
			<p className="text-sm tracking-wider">{reply.body}</p>
		</div>
	)
}
