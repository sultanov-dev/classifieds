export enum ETokens {
	ACCESSTOKEN = 'accessToken',
	REFRESHTOKEN = 'refresh_token',
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
	data: {
		user: IUserData
	}
}

export type TUserUpdataRes = Omit<TUserResponse, 'user'> & {
	message: string
	data: {
		user: IUserData
		accessToken: ETokens.ACCESSTOKEN
	}
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
