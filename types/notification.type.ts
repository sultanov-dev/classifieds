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
	type: string
	actor: {
		id: string
		fullName: string
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
