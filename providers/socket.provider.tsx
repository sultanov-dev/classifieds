'use client'

import { useEffect, type ReactNode } from 'react'

import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

import { useAuth } from '@/hooks/useAuth'
import {
	NOTIFICATIONS_KEY,
	prependNotification,
} from '@/lib/notification.cache'
import { getNotificationMessage } from '@/lib/notification.message'
import { createNotificationSocket, getSocketErrorCode } from '@/lib/socket'
import { getAccesToken } from '@/services/auth/auth.helper'
import { authService } from '@/services/auth/auth.service'

export function SocketProvider({ children }: { children: ReactNode }) {
	const queryClient = useQueryClient()
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		if (!isAuthenticated) return

		const token = getAccesToken()

		if (!token) return

		const socket = createNotificationSocket(token)

		let refreshed = false

		const reconnectWithNewToken = async () => {
			try {
				const { accessToken } = await authService.getNewTokens()

				socket.auth = { token: accessToken }
				socket.connect()
			} catch {
				socket.disconnect()
			}
		}

		socket.on('connect', () => {
			refreshed = false

			queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_KEY })
		})

		socket.on('notification', (event) => {
			if (event.v !== 1) return

			prependNotification(queryClient, event.notification)
			toast.info(getNotificationMessage(event.notification))
		})

		socket.on('session_expiring', async () => {
			try {
				const { accessToken } = await authService.getNewTokens()

				socket.emit('reauth', { token: accessToken }, (result) => {
					if (result.ok) return

					socket.disconnect()
					void reconnectWithNewToken()
				})
			} catch {
				// Refresh ishlamasa, server muddati tugagach o'zi uzadi.
			}
		})

		socket.on('session_expired', () => {
			void reconnectWithNewToken()
		})

		socket.on('connect_error', (error) => {
			const code = getSocketErrorCode(error)

			if (code === 'TOKEN_EXPIRED' && !refreshed) {
				refreshed = true
				void reconnectWithNewToken()

				return
			}

			if (code === 'NO_TOKEN' || code === 'INVALID_TOKEN') socket.disconnect()
		})

		socket.connect()

		return () => {
			socket.removeAllListeners()
			socket.disconnect()
		}
	}, [isAuthenticated, queryClient])

	return <>{children}</>
}
