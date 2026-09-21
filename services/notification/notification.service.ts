import { instance } from '@/api/axios'
import type { INotificationRes } from '@/types/notification.type'

class NotificationService {
	private readonly BASE_URL = '/notifications'

	async getNotifications() {
		const response = await instance.get<INotificationRes>(`${this.BASE_URL}`)

		return response.data
	}
}

export const notificationService = new NotificationService()
