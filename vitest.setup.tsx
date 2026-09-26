import '@testing-library/jest-dom/vitest'

import type { ReactNode } from 'react'

import { cleanup } from '@testing-library/react'
import { afterAll, afterEach, beforeAll, vi } from 'vitest'

import { server } from './test/msw/server'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => {
	server.resetHandlers()
	cleanup()
	document.cookie.split(';').forEach((c) => {
		document.cookie = `${c.split('=')[0]}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`
	})
})

afterAll(() => server.close())

vi.mock('next/navigation', () => ({
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		refresh: vi.fn(),
		back: vi.fn(),
		prefetch: vi.fn(),
	}),
	usePathname: () => '/',
	useSearchParams: () => new URLSearchParams(),
	useParams: () => ({}),
	redirect: vi.fn(),
	notFound: vi.fn(),
}))

vi.mock('@/i18n/navigation', () => ({
	Link: ({
		href,
		children,
		...props
	}: {
		href: string
		children: ReactNode
	}) => (
		<a href={href} {...props}>
			{children}
		</a>
	),
	useRouter: () => ({
		push: vi.fn(),
		replace: vi.fn(),
		back: vi.fn(),
	}),
	usePathname: () => '/',
	redirect: vi.fn(),
	getPathname: ({ href }: { href: string }) => href,
}))

vi.mock('@/lib/socket', async (importOrigina) => ({
	...(await importOrigina<typeof import('@/lib/socket')>()),
	createNotificatonSocket: vi.fn(() => ({
		on: vi.fn(),
		off: vi.fn(),
		emit: vi.fn(),
		connect: vi.fn(),
		disconnect: vi.fn(),
	})),
}))
