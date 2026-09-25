import { useTranslations } from 'next-intl'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Link } from '@/i18n/navigation'
import { getActorName, getNotificationAction } from '@/lib/notification.message'
import { cn, formatRelativeTime, getInitials } from '@/lib/utils'
import type { INotification } from '@/types/notification.type'

interface INotificationItemProps {
	notification: INotification
	onRead: (id: string) => void
}

export function NotificationItem({
	notification,
	onRead,
}: INotificationItemProps) {
	const t = useTranslations('Notifications')
	const tTime = useTranslations('Time')

	const { actor, listing, comment, type, readAt, createdAt } = notification

	const isUnread = !readAt
	const actorName = getActorName(actor.fullName, t)

	return (
		<Link
			href={`/ads/${listing.id}`}
			onClick={() => isUnread && onRead(notification.id)}
		>
			<DropdownMenuItem
				className={cn(
					'items-start gap-3 rounded-none px-3 py-3',
					isUnread && 'bg-accent/40',
				)}
			>
				<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-300 text-xs font-semibold text-amber-50 uppercase">
					{getInitials(actor.fullName)}
				</div>

				<div className="flex min-w-0 flex-1 flex-col gap-0.5">
					<p className="text-sm leading-5 wrap-break-word whitespace-normal">
						<span className="font-medium capitalize">{actorName}</span>{' '}
						<span className="text-muted-foreground">
							{getNotificationAction(type, t)}
						</span>
					</p>
					<span className="line-clamp-1 text-xs font-medium">
						{listing.title}
					</span>
					<span className="text-muted-foreground line-clamp-2 text-xs whitespace-normal">
						{comment.excerpt}
					</span>
					<span className="text-muted-foreground mt-0.5 text-[11px] tracking-wider">
						{formatRelativeTime(createdAt, tTime)}
					</span>
				</div>

				{isUnread && (
					<span className="mt-2 size-2 shrink-0 rounded-full bg-[#1D828E]" />
				)}
			</DropdownMenuItem>
		</Link>
	)
}
