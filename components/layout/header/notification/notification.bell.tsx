'use client'

import { BellIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNotifications } from '@/hooks/useNotifications'

import { NotificationList } from './notification.list'

export default function NotificationBell() {
	const { notifications, unreadCount, isLoading, markRead, isMarking } =
		useNotifications()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button variant={'ghost'} size={'icon'} className="relative" />}
			>
				<BellIcon className="size-5" />
				{unreadCount > 0 && (
					<span className="absolute -top-0.5 -right-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
						{unreadCount > 99 ? '99+' : unreadCount}
					</span>
				)}
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-95 p-0">
				<div className="flex items-center justify-between gap-2 border-b px-3 py-2">
					<span className="text-sm font-medium">Bildirishnomalar</span>
					<Button
						variant={'ghost'}
						size={'xs'}
						className="cursor-pointer font-normal"
						disabled={!unreadCount || isMarking}
						onClick={() => markRead(undefined)}
					>
						Hammasini o&apos;qilgan qilish
					</Button>
				</div>

				<NotificationList
					notifications={notifications}
					isLoading={isLoading}
					onRead={(id) => markRead([id])}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
