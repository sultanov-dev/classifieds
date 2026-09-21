export type TNotificationType =
	'LISTING_COMMENT' | 'COMMENT_REPLY' | 'LISTING_REPLY'

export interface INotificationRes {
	success: boolean
	data: {
		notifications: INotification[]
		meta: {
			page: number
			limit: number
			total: number
			totalPages: number
			unreadCount: number
		}
	}
}

export interface INotification {
	id: string
	type: TNotificationType
	actor: {
		id: string
		fullName: string | null
	}
	listing: {
		id: string
		title: string
		ref: string
	}
	comment: {
		id: string
		parentId: string | null
		excerpt: string
	}
	readAt: string | null
	createdAt: string
}

export interface IQueryNotifications {
	page?: number
	limit?: number
	unread?: boolean
}

export interface IMarkReadRes {
	success: boolean
	message: string
	data: {
		updated: number
		unreadCount: number
	}
}

export interface INotificationEvent {
	v: 1
	recipientId: string
	notification: INotification
}
