import { QueryClient } from '@tanstack/react-query'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
	applyMarkRead,
	invalidateCommentQuerys,
	NOTIFICATIONS_KEY,
	NOTIFICATIONS_LIMIT,
	prependNotification,
	restoreNotifications,
	setUnreadCount,
} from '@/lib/notification.cache'
import { commentsKeys } from '@/lib/querykeys/comments'
import { buildNotification, buildNotificationRes } from '@/test/factories'
import type { INotificationRes } from '@/types/notification.type'

// Real ilovada notification query'lari ['notifications', { page }] ko'rinishida
const KEY = [...NOTIFICATIONS_KEY, { page: 1 }]

let queryClient: QueryClient

const getData = (key = KEY) => queryClient.getQueryData<INotificationRes>(key)

beforeEach(() => {
	queryClient = new QueryClient()
})

describe('prependNotification', () => {
	it("yangi notificationni ro'yxat boshiga qo'shadi", () => {
		queryClient.setQueryData(
			KEY,
			buildNotificationRes([buildNotification({ id: 'old' })]),
		)

		prependNotification(queryClient, buildNotification({ id: 'new' }))

		expect(getData()?.data.notifications.map((n) => n.id)).toEqual([
			'new',
			'old',
		])
	})

	it("o'qilmagan notification total va unreadCount ni 1 ga oshiradi", () => {
		queryClient.setQueryData(
			KEY,
			buildNotificationRes([], { total: 5, unreadCount: 2 }),
		)

		prependNotification(queryClient, buildNotification({ readAt: null }))

		expect(getData()?.data.meta).toMatchObject({ total: 6, unreadCount: 3 })
	})

	it("o'qilgan notification faqat total ni oshiradi, unreadCount o'zgarmaydi", () => {
		queryClient.setQueryData(
			KEY,
			buildNotificationRes([], { total: 5, unreadCount: 2 }),
		)

		prependNotification(
			queryClient,
			buildNotification({ readAt: '2026-01-02T00:00:00.000Z' }),
		)

		expect(getData()?.data.meta).toMatchObject({ total: 6, unreadCount: 2 })
	})

	it("shu id allaqachon bo'lsa cache'dagi obyekt umuman o'zgarmaydi", () => {
		const res = buildNotificationRes([buildNotification({ id: 'n1' })], {
			unreadCount: 1,
		})
		queryClient.setQueryData(KEY, res)

		prependNotification(queryClient, buildNotification({ id: 'n1' }))

		expect(getData()).toBe(res)
	})

	it("ro'yxatni meta.limit bo'yicha kesadi va totalPages ni qayta hisoblaydi", () => {
		const items = ['n1', 'n2', 'n3'].map((id) => buildNotification({ id }))
		queryClient.setQueryData(
			KEY,
			buildNotificationRes(items, { limit: 3, total: 3 }),
		)

		prependNotification(queryClient, buildNotification({ id: 'new' }))

		const data = getData()?.data
		expect(data?.notifications.map((n) => n.id)).toEqual(['new', 'n1', 'n2'])
		expect(data?.meta).toMatchObject({ total: 4, totalPages: 2 })
	})

	it("meta.limit 0 bo'lsa NOTIFICATIONS_LIMIT ishlatiladi", () => {
		queryClient.setQueryData(
			KEY,
			buildNotificationRes([], { limit: 0, total: NOTIFICATIONS_LIMIT }),
		)

		prependNotification(queryClient, buildNotification())

		// (20 + 1) / 20 → 2 sahifa
		expect(getData()?.data.meta.totalPages).toBe(2)
	})

	it('javobdagi boshqa maydonlarni (success, meta.page) saqlab qoladi', () => {
		queryClient.setQueryData(KEY, buildNotificationRes([], { page: 3 }))

		prependNotification(queryClient, buildNotification())

		expect(getData()?.success).toBe(true)
		expect(getData()?.data.meta.page).toBe(3)
	})

	it("['notifications'] bilan boshlanadigan barcha query'larni yangilaydi", () => {
		const page2 = [...NOTIFICATIONS_KEY, { page: 2 }]
		queryClient.setQueryData(KEY, buildNotificationRes())
		queryClient.setQueryData(page2, buildNotificationRes())

		prependNotification(queryClient, buildNotification())

		expect(getData()?.data.notifications).toHaveLength(1)
		expect(getData(page2)?.data.notifications).toHaveLength(1)
	})

	it("cache bo'sh bo'lsa yangi ma'lumot yaratmaydi", () => {
		prependNotification(queryClient, buildNotification())

		expect(getData()).toBeUndefined()
	})

	it("boshqa kalitdagi query'larga tegmaydi", () => {
		const res = buildNotificationRes()
		queryClient.setQueryData(['comments'], res)

		prependNotification(queryClient, buildNotification())

		expect(queryClient.getQueryData(['comments'])).toBe(res)
	})
})

describe('applyMarkRead', () => {
	const NOW = new Date('2026-09-27T12:00:00.000Z')

	beforeEach(() => {
		vi.useFakeTimers()
		vi.setSystemTime(NOW)
	})

	afterEach(() => {
		vi.useRealTimers()
	})

	const seed = () =>
		queryClient.setQueryData(
			KEY,
			buildNotificationRes(
				[
					buildNotification({ id: 'a', readAt: null }),
					buildNotification({ id: 'b', readAt: null }),
					buildNotification({ id: 'c', readAt: '2026-01-01T00:00:00.000Z' }),
				],
				{ unreadCount: 2 },
			),
		)

	const readAtById = () =>
		Object.fromEntries(
			getData()!.data.notifications.map((n) => [n.id, n.readAt]),
		)

	it("ids berilmasa barcha o'qilmaganlarni hozirgi vaqt bilan belgilaydi va unreadCount 0 bo'ladi", () => {
		seed()

		applyMarkRead(queryClient)

		expect(readAtById()).toEqual({
			a: NOW.toISOString(),
			b: NOW.toISOString(),
			c: '2026-01-01T00:00:00.000Z',
		})
		expect(getData()?.data.meta.unreadCount).toBe(0)
	})

	it("ids berilsa faqat o'shalarni belgilaydi va unreadCount ni shuncha kamaytiradi", () => {
		seed()

		applyMarkRead(queryClient, ['a'])

		expect(readAtById()).toMatchObject({ a: NOW.toISOString(), b: null })
		expect(getData()?.data.meta.unreadCount).toBe(1)
	})

	it("allaqachon o'qilgan notification qayta belgilanmaydi va hisobga olinmaydi", () => {
		seed()

		applyMarkRead(queryClient, ['c'])

		expect(readAtById().c).toBe('2026-01-01T00:00:00.000Z')
		expect(getData()?.data.meta.unreadCount).toBe(2)
	})

	it('unreadCount 0 dan pastga tushmaydi', () => {
		queryClient.setQueryData(
			KEY,
			buildNotificationRes([buildNotification({ id: 'a' })], {
				unreadCount: 0,
			}),
		)

		applyMarkRead(queryClient, ['a'])

		expect(getData()?.data.meta.unreadCount).toBe(0)
	})

	it("o'zgarishdan oldingi holatni (snapshot) qaytaradi", () => {
		seed()
		const before = getData()

		const snapshot = applyMarkRead(queryClient)

		expect(snapshot).toEqual([[KEY, before]])
		expect(getData()).not.toBe(before)
	})
})

describe('setUnreadCount', () => {
	it('faqat meta.unreadCount ni almashtiradi', () => {
		const res = buildNotificationRes([buildNotification()], {
			total: 7,
			unreadCount: 3,
		})
		queryClient.setQueryData(KEY, res)

		setUnreadCount(queryClient, 10)

		expect(getData()?.data.meta).toEqual({ ...res.data.meta, unreadCount: 10 })
		expect(getData()?.data.notifications).toBe(res.data.notifications)
	})
})

describe('restoreNotifications', () => {
	it('applyMarkRead snapshotidan cache ni aynan oldingi holatga qaytaradi', () => {
		const original = buildNotificationRes([buildNotification()], {
			unreadCount: 1,
		})
		queryClient.setQueryData(KEY, original)
		const snapshot = applyMarkRead(queryClient)

		restoreNotifications(queryClient, snapshot)

		expect(getData()).toEqual(original)
	})

	it("snapshot undefined bo'lsa xato bermaydi va hech narsa o'zgarmaydi", () => {
		const res = buildNotificationRes()
		queryClient.setQueryData(KEY, res)

		restoreNotifications(queryClient, undefined)

		expect(getData()).toBe(res)
	})
})

describe('invalidateCommentQuerys', () => {
	it("LISTING_COMMENT bo'lsa e'lonning izohlar ro'yxatini yangilaydi", () => {
		const spy = vi.spyOn(queryClient, 'invalidateQueries')

		invalidateCommentQuerys(
			queryClient,
			buildNotification({
				type: 'LISTING_COMMENT',
				listing: { id: 'l7', title: 't', ref: 'r' },
			}),
		)

		expect(spy).toHaveBeenCalledTimes(1)
		expect(spy).toHaveBeenCalledWith({ queryKey: commentsKeys.list('l7') })
	})

	it.each(['COMMENT_REPLY', 'LISTING_REPLY'] as const)(
		"%s va comment.parentId bor bo'lsa ota izohning javoblarini yangilaydi",
		(type) => {
			const spy = vi.spyOn(queryClient, 'invalidateQueries')

			invalidateCommentQuerys(
				queryClient,
				buildNotification({
					type,
					comment: { id: 'c2', parentId: 'c1', excerpt: '' },
				}),
			)

			expect(spy).toHaveBeenCalledTimes(1)
			expect(spy).toHaveBeenCalledWith({
				queryKey: commentsKeys.replies('c1'),
			})
		},
	)

	it("javob turida parentId bo'lmasa hech narsani yangilamaydi", () => {
		const spy = vi.spyOn(queryClient, 'invalidateQueries')

		invalidateCommentQuerys(
			queryClient,
			buildNotification({
				type: 'COMMENT_REPLY',
				comment: { id: 'c2', parentId: null, excerpt: '' },
			}),
		)

		expect(spy).not.toHaveBeenCalled()
	})
})
