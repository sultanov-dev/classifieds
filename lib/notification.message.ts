import type { TTranslator } from '@/types/i18n.types'
import type {
	INotification,
	TNotificationType,
} from '@/types/notification.type'

const FALLBACK_TYPE: TNotificationType = 'LISTING_COMMENT'

const NOTIFICATION_TYPES: TNotificationType[] = [
	'LISTING_COMMENT',
	'COMMENT_REPLY',
	'LISTING_REPLY',
]

export const getActorName = (
	fullName: string | null,
	t: TTranslator<'Notifications'>,
) => fullName?.trim() || t('defaultUser')

export const getNotificationAction = (
	type: TNotificationType,
	t: TTranslator<'Notifications'>,
) => t(NOTIFICATION_TYPES.includes(type) ? type : FALLBACK_TYPE)

export const getNotificationMessage = (
	notification: INotification,
	t: TTranslator<'Notifications'>,
) =>
	`${getActorName(notification.actor.fullName, t)} ${getNotificationAction(
		notification.type,
		t,
	)}`
