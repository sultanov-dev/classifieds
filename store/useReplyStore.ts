import { create } from 'zustand'

interface IReplyStore {
	replyCommentId: string | null
	showReply: (commentId: string) => void
	closeReply: () => void
}

export const useReplyStore = create<IReplyStore>((set) => ({
	replyCommentId: null,
	showReply: (commentId: string) => {
		set((state) => ({
			replyCommentId: state.replyCommentId === commentId ? null : commentId,
		}))
	},
	closeReply: () => set({ replyCommentId: null }),
}))
