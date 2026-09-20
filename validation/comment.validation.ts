import * as z from 'zod'

export const commentSchema = z.object({
	body: z.string(),
})

export const replySchema = z.object({
	body: z.string(),
})

export type TCommentSchema = z.infer<typeof commentSchema>
export type TReplySchema = z.infer<typeof replySchema>
