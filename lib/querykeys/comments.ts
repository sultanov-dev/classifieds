export const commentsKeys = {
	all: ['comments'] as const,
	list: (listingId: string) =>
		[...commentsKeys.all, 'list', listingId] as const,
	replies: (commentId: string) =>
		[...commentsKeys.all, 'replies', commentId] as const,
	commentCreate: ['comment-create'],
	replyCreate: ['reply-create'],
}
