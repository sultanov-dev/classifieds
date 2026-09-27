import { describe, expect, it } from 'vitest'

import {
	getActorName,
	getNotificationAction,
	getNotificationMessage,
} from '@/lib/notification.message'
import { buildNotification } from '@/test/factories'
import { createFakeT, createUzT } from '@/test/i18n'
import type { TNotificationType } from '@/types/notification.type'

describe('getActorName', () => {
	const t = createFakeT<'Notifications'>()

	it('ismni qaytaradi', () => {
		expect(getActorName('Ali Valiyev', t)).toBe('Ali Valiyev')
	})

	it('ism atrofidagi probellarni olib tashlaydi', () => {
		expect(getActorName('  Ali  ', t)).toBe('Ali')
	})

	it.each([
		{ label: 'null', fullName: null },
		{ label: "bo'sh string", fullName: '' },
		{ label: 'faqat probel', fullName: '   ' },
	])("ism $label bo'lsa defaultUser kalitini qaytaradi", ({ fullName }) => {
		expect(getActorName(fullName, t)).toBe('defaultUser')
	})
})

describe('getNotificationAction', () => {
	const t = createFakeT<'Notifications'>()

	it.each(['LISTING_COMMENT', 'COMMENT_REPLY', 'LISTING_REPLY'] as const)(
		"ma'lum tur '%s' o'z kaliti bilan tarjima qilinadi",
		(type) => {
			expect(getNotificationAction(type, t)).toBe(type)
		},
	)

	it("noma'lum tur (server yangi tur qo'shsa) LISTING_COMMENT ga tushadi", () => {
		const unknownType = 'NEW_TYPE' as TNotificationType

		expect(getNotificationAction(unknownType, t)).toBe('LISTING_COMMENT')
	})
})

describe('getNotificationMessage', () => {
	it("'<ism> <harakat>' ko'rinishida xabar yig'adi", () => {
		const notification = buildNotification({
			type: 'COMMENT_REPLY',
			actor: { id: 'u1', fullName: 'Ali' },
		})

		const message = getNotificationMessage(
			notification,
			createFakeT<'Notifications'>(),
		)

		expect(message).toBe('Ali COMMENT_REPLY')
	})

	it("haqiqiy o'zbekcha tarjima bilan to'liq xabar chiqaradi", () => {
		const notification = buildNotification({
			type: 'LISTING_COMMENT',
			actor: { id: 'u1', fullName: null },
		})

		const message = getNotificationMessage(
			notification,
			createUzT('Notifications'),
		)

		expect(message).toBe('Foydalanuvchi eʼloningizga izoh yozdi')
	})
})
