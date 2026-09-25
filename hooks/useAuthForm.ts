import { useMemo, useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { publicPages } from '@/config/pages.config'
import { useRouter } from '@/i18n/navigation'
import { authService } from '@/services/auth/auth.service'
import {
	createAuthSchema,
	type TAuthScheme,
} from '@/validation/auth.validation'

import { useAuth } from './useAuth'

export const useAuthForm = (isLogin: boolean) => {
	const tValidation = useTranslations('Validation')

	const schema = useMemo(() => createAuthSchema(tValidation), [tValidation])

	const form = useForm<TAuthScheme>({
		resolver: zodResolver(schema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const [isPending, startTransition] = useTransition()
	const router = useRouter()
	const { setCridentials } = useAuth()

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: TAuthScheme) => authService.main('login', data),
		onSuccess(data) {
			startTransition(() => {
				form.reset()
				toast.success(data.message)
				router.replace(publicPages.HOME)
			})
			setCridentials(data.data.user)
		},
		onError(error) {
			if (isAxiosError(error)) {
				toast.error(error.response?.data.message)
			}
		},
	})

	const { mutate: mutationRegister, isPending: isRegisterPending } =
		useMutation({
			mutationKey: ['login'],
			mutationFn: (data: TAuthScheme) => authService.main('register', data),
			onSuccess(data) {
				startTransition(() => {
					form.reset()
					toast.success(data.message)
					router.replace(publicPages.HOME)
				})
				setCridentials(data.data.user)
			},
			onError(error) {
				if (isAxiosError(error)) {
					toast.error(error.response?.data.message)
				}
			},
		})

	const onSubmit = (data: TAuthScheme) => {
		if (isLogin) {
			mutateLogin(data)
		} else {
			mutationRegister(data)
		}
	}

	const isLoading = isPending || isLoginPending || isRegisterPending

	return { form, isLoading, onSubmit }
}
