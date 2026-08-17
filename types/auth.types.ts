export enum ETokens {
	ACCESSTOKEN = 'accessToken',
	REFRESHTOKEN = 'refreshToken',
}

export interface ITokens {
	accessToken: ETokens.ACCESSTOKEN
	refreshToken: ETokens.REFRESHTOKEN
}

export interface IUserData {
	id: string
	fullName: string | null
	email: string
	region: string | null
	phoneNumber: string | null
	createdAt: string
}

export type TUserResponse = {
	user: IUserData
}

export interface IAuthResponse {
	success: boolean
	message: string
	data: {
		user: IUserData
		accessToken: string
	}
}

export interface IGetNewTokensRes {
	data: {
		accessToken: string
	}
}
