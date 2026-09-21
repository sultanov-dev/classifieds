import { io, type Socket } from 'socket.io-client'

import type { INotificationEvent } from '@/types/notification.type'

export interface IServerToClientEvents {
	notification: (event: INotificationEvent) => void
	session_expiring: (payload: { inSeconds: number }) => void
	session_expired: (payload: { reason: 'token_expired' }) => void
}

export type TReauthResult = { ok: true } | { ok: false; code: string }

export interface IClientToServerEvents {
	reauth: (
		body: { token: string },
		ack: (result: TReauthResult) => void,
	) => void
}

export type TNotificationSocket = Socket<
	IServerToClientEvents,
	IClientToServerEvents
>

const getSocketOrigin = () => {
	if (process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_API_URL)
		return new URL(process.env.NEXT_PUBLIC_API_URL).origin

	return window.location.origin
}

export const createNotificationSocket = (token: string): TNotificationSocket =>
	io(getSocketOrigin(), {
		path: process.env.NEXT_PUBLIC_SOCKET_PATH,
		auth: { token },
		transports: ['websocket'],
		withCredentials: false,
		autoConnect: false,
	})

export const getSocketErrorCode = (error: Error) => {
	const data = (error as Error & { data?: { code?: string } }).data

	return data?.code ?? error.message
}
