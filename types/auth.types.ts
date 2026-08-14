export enum ETokens {
	ACCESSTOKEN = 'accessToken',
	REFRESHTOKEN = 'refreshToken',
}

export interface ITokens {
	accessToken: ETokens.ACCESSTOKEN
	refreshToken: ETokens.REFRESHTOKEN
}

interface IUserData {
	id: string
	fullName: string | null
	email: string
	region: string | null
	phoneNumber: string | null
	createdAt: string
}

export interface IRegisterResponse {
	success: boolean
	message: string
	user: IUserData
	tokens: ITokens
}
