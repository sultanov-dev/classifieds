import { NextResponse, type NextRequest } from 'next/server'

import createMiddleware from 'next-intl/middleware'

import { authPages, publicPages } from './config/pages.config'
import { routing } from './i18n/routing'
import { ETokens } from './types/auth.types'

const hanldeI18n = createMiddleware(routing)

function stripLocale(pathname: string) {
	const [, first, ...rest] = pathname.split('/')
	const isLocale = (routing.locales as readonly string[]).includes(first)

	return {
		locale: isLocale ? first : routing.defaultLocale,
		path: isLocale ? `/${rest.join('/')}` : pathname,
	}
}

export default async function proxy(request: NextRequest) {
	const { url, cookies } = request
	const { locale, path } = stripLocale(request.nextUrl.pathname)
	const refreshToken = cookies.get(ETokens.REFRESHTOKEN)?.value

	const withLocale = (p: string) => {
		return new URL(`/${locale}${p === '/' ? '' : p}`, url)
	}

	const isProfilePage = path.startsWith('/profile')
	const isCreatePage = path === '/create'
	const isAuthPage = path === authPages.REGISTER || path === authPages.LOGIN

	if (isAuthPage && refreshToken) {
		return NextResponse.redirect(withLocale(publicPages.HOME))
	}

	if (isAuthPage) {
		return NextResponse.next()
	}

	if (isProfilePage && !refreshToken) {
		return NextResponse.rewrite(withLocale('/404'))
	}

	if (isCreatePage && !refreshToken) {
		return NextResponse.redirect(withLocale(authPages.LOGIN))
	}

	return hanldeI18n(request)
}
export const config = {
	matcher: '/((?!api|_next|_vercel|.*\\..*).*)',
}
