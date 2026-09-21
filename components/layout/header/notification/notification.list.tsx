import { Loader } from '@/shared/loader'
import type { INotification } from '@/types/notification.type'

import { NotificationItem } from './notification.item'

interface INotificationListProps {
	notifications: INotification[]
	isLoading: boolean
	onRead: (id: string) => void
}

export function NotificationList({
	notifications,
	isLoading,
	onRead,
}: INotificationListProps) {
	if (isLoading)
		return (
			<div className="flex items-center justify-center py-8">
				<Loader />
			</div>
		)

	if (!notifications.length)
		return (
			<p className="text-muted-foreground py-8 text-center text-sm">
				Hozircha bildirishnoma yo&apos;q
			</p>
		)

	return (
		<div className="max-h-105 overflow-y-auto">
			{notifications.map((notification) => (
				<NotificationItem
					key={notification.id}
					notification={notification}
					onRead={onRead}
				/>
			))}
		</div>
	)
}
