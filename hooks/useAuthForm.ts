import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { publicPages } from '@/config/pages.config'
import { authService } from '@/services/auth/auth.service'
import { authSchema, type TAuthScheme } from '@/validation/auth.validation'

export const useAuthForm = (isLogin: boolean) => {
	const form = useForm<TAuthScheme>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const { mutate: mutateLogin, isPending: isLoginPending } = useMutation({
		mutationKey: ['login'],
		mutationFn: (data: TAuthScheme) => authService.main('login', data),
		onSuccess() {
			startTransition(() => {
				form.reset()
				router.push(publicPages.HOME)
			})
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
			onSuccess() {
				startTransition(() => {
					form.reset()
					router.push(publicPages.HOME)
				})
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

	return {form, isLoading, onSubmit}
}
