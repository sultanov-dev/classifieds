import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useLocale, useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { useAuth } from '@/hooks/useAuth'
import {
	applyMarkRead,
	NOTIFICATIONS_KEY,
	NOTIFICATIONS_LIMIT,
	restoreNotifications,
	setUnreadCount,
} from '@/lib/notification.cache'
import { notificationService } from '@/services/notification/notification.service'

export const useNotifications = () => {
	const t = useTranslations('Common')
	const locale = useLocale()
	const queryClient = useQueryClient()
	const { isAuthenticated } = useAuth()

	const { data, isLoading, isFetching } = useQuery({
		queryKey: [...NOTIFICATIONS_KEY, locale],
		queryFn: () =>
			notificationService.getNotifications({ limit: NOTIFICATIONS_LIMIT }),
		select: (data) => data.data,
		enabled: isAuthenticated,
	})

	const { mutate: markRead, isPending: isMarking } = useMutation({
		mutationKey: ['notifications-read'],
		mutationFn: (ids?: string[]) => notificationService.markRead(ids),
		onMutate: async (ids) => {
			await queryClient.cancelQueries({ queryKey: NOTIFICATIONS_KEY })

			return { previous: applyMarkRead(queryClient, ids) }
		},
		onError: (_error, _ids, context) => {
			restoreNotifications(queryClient, context?.previous)
			toast.error(t('error'))
		},
		onSuccess: (response) => {
			setUnreadCount(queryClient, response.data.unreadCount)
		},
	})

	return {
		notifications: data?.notifications ?? [],
		unreadCount: data?.meta.unreadCount ?? 0,
		isLoading: isLoading || isFetching,
		markRead,
		isMarking,
	}
}
