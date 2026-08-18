import { NextResponse, type NextRequest } from 'next/server'

import { authPages, publicPages } from './config/pages.config'
import { ETokens } from './types/auth.types'

export default async function proxy(request: NextRequest) {
	const { url, cookies } = request

	const refreshToken = cookies.get(ETokens.REFRESHTOKEN)?.value

	const isProfilePage = url.includes('/profile')
	const isCreatePage = url.includes('/create')
	const isAuthPage =
		url.includes(authPages.REGISTER) || url.includes(authPages.LOGIN)

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(new URL(publicPages.HOME, url))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (isProfilePage && !refreshToken) {
		return NextResponse.rewrite(new URL('/404', url))
	}

	if (isCreatePage && !refreshToken) {
		return NextResponse.redirect(new URL(authPages.LOGIN, url))
	}

	return NextResponse.next()
}
export const config = {
	matcher: ['/login', '/register', '/profile/:path*', '/create'],
}
