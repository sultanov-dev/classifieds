import type { QueryClient } from '@tanstack/react-query'

import type { INotification, INotificationRes } from '@/types/notification.type'

import { commentsKeys } from './querykeys/comments'

export const NOTIFICATIONS_KEY = ['notifications']

export const NOTIFICATIONS_LIMIT = 20

export const prependNotification = (
	queryClient: QueryClient,
	notification: INotification,
) => {
	queryClient.setQueryData<INotificationRes>(NOTIFICATIONS_KEY, (old) => {
		if (!old) return old

		const { notifications, meta } = old.data

		if (notifications.some((item) => item.id === notification.id)) return old

		const limit = meta.limit || NOTIFICATIONS_LIMIT
		const total = meta.total + 1

		return {
			...old,
			data: {
				notifications: [notification, ...notifications].slice(0, limit),
				meta: {
					...meta,
					total,
					totalPages: Math.ceil(total / limit),
					unreadCount: notification.readAt
						? meta.unreadCount
						: meta.unreadCount + 1,
				},
			},
		}
	})
}

export const applyMarkRead = (queryClient: QueryClient, ids?: string[]) => {
	const previous = queryClient.getQueryData<INotificationRes>(NOTIFICATIONS_KEY)

	queryClient.setQueryData<INotificationRes>(NOTIFICATIONS_KEY, (old) => {
		if (!old) return old

		const readAt = new Date().toISOString()
		let marked = 0

		const notifications = old.data.notifications.map((item) => {
			if (item.readAt || (ids && !ids.includes(item.id))) return item

			marked += 1

			return { ...item, readAt }
		})

		return {
			...old,
			data: {
				notifications,
				meta: {
					...old.data.meta,
					unreadCount: ids
						? Math.max(0, old.data.meta.unreadCount - marked)
						: 0,
				},
			},
		}
	})

	return previous
}

export const setUnreadCount = (
	queryClient: QueryClient,
	unreadCount: number,
) => {
	queryClient.setQueryData<INotificationRes>(NOTIFICATIONS_KEY, (old) => {
		if (!old) return old

		return {
			...old,
			data: { ...old.data, meta: { ...old.data.meta, unreadCount } },
		}
	})
}

export const restoreNotifications = (
	queryClient: QueryClient,
	previous?: INotificationRes,
) => {
	if (previous) queryClient.setQueryData(NOTIFICATIONS_KEY, previous)
}

export const invalidateCommentQuerys = (
	queryClient: QueryClient,
	notification: INotification,
) => {
	const { type, listing, comment } = notification

	if (type === 'LISTING_COMMENT') {
		queryClient.invalidateQueries({ queryKey: commentsKeys.list(listing.id) })
		return
	}

	if (comment.parentId) {
		queryClient.invalidateQueries({
			queryKey: commentsKeys.replies(comment.parentId),
		})
	}
}
