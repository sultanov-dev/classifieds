export interface ICommentsRes {
	success: boolean
	data: {
		comments: Comment[]
		meta: Meta
	}
}

export interface Comment {
	id: string
	body: string
	editedAt: string
	parentId: string
	user: User
	isSeller: boolean
	createdAt: string
	replyCount: number
	replies: IReply[]
}

export interface User {
	id: string
	fullName: string
}

export interface IReply {
	id: string
	body: string
	editedAt: string
	parentId: string
	user: User2
	isSeller: boolean
	createdAt: string
}

export interface User2 {
	id: string
	fullName: string
}

export interface Meta {
	page: number
	limit: number
	total: number
	totalPages: number
}

export interface IRepliesRes {
	success: boolean
	data: {
		replies: IReply[]
		meta: Meta
	}
}
