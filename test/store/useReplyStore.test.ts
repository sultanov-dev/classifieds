import { beforeEach, describe, expect, it } from 'vitest'

import { useReplyStore } from '@/store/useReplyStore'

const replyId = () => useReplyStore.getState().replyCommentId

beforeEach(() => {
	useReplyStore.setState({ replyCommentId: null })
})

describe('useReplyStore', () => {
	it("boshlang'ich holatda hech bir javob formasi ochiq emas", () => {
		expect(replyId()).toBeNull()
	})

	it('showReply berilgan izoh uchun javob formasini ochadi', () => {
		useReplyStore.getState().showReply('c1')

		expect(replyId()).toBe('c1')
	})

	it('showReply shu izoh uchun qayta chaqirilsa formani yopadi (toggle)', () => {
		useReplyStore.getState().showReply('c1')

		useReplyStore.getState().showReply('c1')

		expect(replyId()).toBeNull()
	})

	it("showReply boshqa izoh uchun chaqirilsa formani o'shanga o'tkazadi", () => {
		useReplyStore.getState().showReply('c1')

		useReplyStore.getState().showReply('c2')

		expect(replyId()).toBe('c2')
	})

	it('closeReply formani yopadi', () => {
		useReplyStore.getState().showReply('c1')

		useReplyStore.getState().closeReply()

		expect(replyId()).toBeNull()
	})
})
