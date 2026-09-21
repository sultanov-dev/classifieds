import type {
	INotification,
	TNotificationType,
} from '@/types/notification.type'

const NOTIFICATION_ACTION: Record<TNotificationType, string> = {
	LISTING_COMMENT: "e'loningizga izoh yozdi",
	COMMENT_REPLY: 'izohingizga javob berdi',
	LISTING_REPLY: "e'loningizdagi izohga javob berdi",
}

export const getActorName = (fullName: string | null) =>
	fullName?.trim() || 'Foydalanuvchi'

export const getNotificationAction = (type: TNotificationType) =>
	NOTIFICATION_ACTION[type] ?? "e'loningizga izoh yozdi"

export const getNotificationMessage = (notification: INotification) =>
	`${getActorName(notification.actor.fullName)} ${getNotificationAction(
		notification.type,
	)}`
