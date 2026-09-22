export const commentsKeys = {
	all: ['comments'] as const,
	list: (listingId: string) =>
		[...commentsKeys.all, 'list', listingId] as const,
	replies: (commentId: string) =>
		[...commentsKeys.all, 'replies', commentId] as const,
	commentCreate: ['comment-create'],
	replyCreate: ['reply-create'],
	commentDelete: (commentId: string) =>
		[...commentsKeys.all, 'delete', commentId] as const,
	commentEdit: (commentId: string) =>
		[...commentsKeys.all, 'edit', commentId] as const,
}
