import type { ReactElement, ReactNode } from 'react'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
	render,
	renderHook,
	type RenderHookOptions,
	type RenderOptions,
} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NextIntlClientProvider } from 'next-intl'

import messages from '@/messages/uz.json'

export const createTestQueryClient = () => {
	return new QueryClient({
		defaultOptions: {
			queries: { retry: false, gcTime: Infinity },
			mutations: { retry: false },
		},
	})
}

export const createWrapper = (queryClient: QueryClient) => {
	return function Wrapper({ children }: { children: ReactNode }) {
		return (
			<QueryClientProvider client={queryClient}>
				<NextIntlClientProvider
					locale="uz"
					messages={messages}
					timeZone="Asia/Tashkent"
				>
					{children}
				</NextIntlClientProvider>
			</QueryClientProvider>
		)
	}
}

type TOptions = { queryClient?: QueryClient }

export const renderWithProviders = (
	ui: ReactElement,
	{
		queryClient = createTestQueryClient(),
		...options
	}: TOptions & Omit<RenderOptions, 'wrapper'> = {},
) => ({
	queryClient,
	user: userEvent.setup(),
	...render(ui, { wrapper: createWrapper(queryClient), ...options }),
})

export const renderHookWithProviders = <TResult, TProps>(
	hook: (props: TProps) => TResult,
	{
		queryClient = createTestQueryClient(),
		...options
	}: TOptions & Omit<RenderHookOptions<TProps>, 'wrapper'> = {},
) => ({
	queryClient,
	...renderHook(hook, { wrapper: createWrapper(queryClient), ...options }),
})
