import type { InfiniteData } from '@tanstack/react-query'

import type {
	IGetListingResponse,
	IListing,
	TListingRemoveUser,
} from '@/types/listing.types'
import type { INotification, INotificationRes } from '@/types/notification.type'

/**
 * Test ma'lumotlari uchun factory'lar. Har biri to'liq va to'g'ri obyekt
 * qaytaradi, test esa faqat o'ziga kerakli maydonni `overrides` orqali
 * o'zgartiradi.
 */

export const buildNotification = (
	overrides: Partial<INotification> = {},
): INotification => ({
	id: 'n1',
	type: 'LISTING_COMMENT',
	actor: { id: 'u1', fullName: 'Ali' },
	listing: { id: 'l1', title: 'Iphone', ref: 'ref-1' },
	comment: { id: 'c1', parentId: null, excerpt: 'Salom' },
	readAt: null,
	createdAt: '2026-01-01T00:00:00.000Z',
	...overrides,
})

export const buildNotificationRes = (
	notifications: INotification[] = [],
	meta: Partial<INotificationRes['data']['meta']> = {},
): INotificationRes => ({
	success: true,
	data: {
		notifications,
		meta: {
			page: 1,
			limit: 20,
			total: notifications.length,
			totalPages: 1,
			unreadCount: 0,
			...meta,
		},
	},
})

/** Ro'yxat endpoint'lari qaytaradigan (`user`siz) e'lon */
export const buildListingItem = (
	overrides: Partial<TListingRemoveUser> = {},
): TListingRemoveUser => ({
	id: 'l1',
	title: 'iPhone 15 Pro Max',
	description: 'Yaxshi holatda',
	price: 1000,
	currency: 'USD',
	region: 'TOSHKENT_SHAHRI',
	status: 'active',
	slug: 'iphone-15-pro-max',
	isLiked: false,
	attributes: [],
	viewCount: 0,
	category: 'electronics',
	subCategory: 'phones',
	images: [],
	createdAt: '2026-01-01T00:00:00.000Z',
	updatedAt: '2026-01-01T00:00:00.000Z',
	...overrides,
})

/** Detail endpoint qaytaradigan (`user` bilan) to'liq e'lon */
export const buildListing = (overrides: Partial<IListing> = {}): IListing => ({
	...buildListingItem(overrides),
	user: {
		id: 'u1',
		fullName: 'Ali',
		phoneNumber: '+998901234567',
		region: 'TOSHKENT_SHAHRI',
	},
	...overrides,
})

export const buildListingRes = (
	listings: TListingRemoveUser[] = [],
): IGetListingResponse => ({
	success: true,
	message: 'ok',
	data: {
		listings,
		meta: { page: 1, limit: 10, totalPages: 1 },
	},
})

export const buildInfiniteListingRes = (
	pages: TListingRemoveUser[][],
): InfiniteData<IGetListingResponse> => ({
	pages: pages.map((listings) => buildListingRes(listings)),
	pageParams: pages.map((_, index) => index + 1),
})
