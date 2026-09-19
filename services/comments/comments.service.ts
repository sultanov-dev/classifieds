import { axiosClassic, instance } from '@/api/axios'
import type { ICommentsRes, IRepliesRes } from '@/types/comments.type'

class CommentService {
	private readonly LISTINGS = '/listings'
	private readonly COMMENTS = '/comments'

	async getListingComments(listingId: string) {
		const response = await axiosClassic.get<ICommentsRes>(
			`${this.LISTINGS}/${listingId}${this.COMMENTS}`,
		)

		return response.data
	}

	async getCommentReplies(commentId: string) {
		const response = await axiosClassic.get<IRepliesRes>(
			`${this.COMMENTS}/${commentId}/replies`,
		)

		return response.data
	}

	async createComment(listingId: string, data: { body: string }) {
		const response = await instance.post(
			`${this.LISTINGS}/${listingId}${this.COMMENTS}`,
			data,
		)

		return response.data
	}

	async editComment(commentId: string, data: { body: string }) {
		const response = await instance.patch(`${this.COMMENTS}/${commentId}`, data)

		return response.data
	}

	async deleteComment(commentId: string) {
		const response = await instance.delete(`${this.COMMENTS}/${commentId}`)

		return response.data
	}
}

export const commentsService = new CommentService()
