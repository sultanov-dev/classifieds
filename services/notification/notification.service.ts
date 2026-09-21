import { instance } from '@/api/axios'
import type {
	IMarkReadRes,
	INotificationRes,
	IQueryNotifications,
} from '@/types/notification.type'

class NotificationService {
	private readonly BASE_URL = '/notifications'

	async getNotifications(params?: IQueryNotifications) {
		const response = await instance.get<INotificationRes>(`${this.BASE_URL}`, {
			params,
		})

		return response.data
	}

	async markRead(ids?: string[]) {
		const response = await instance.patch<IMarkReadRes>(
			`${this.BASE_URL}/read`,
			ids?.length ? { ids } : {},
		)

		return response.data
	}
}

export const notificationService = new NotificationService()
