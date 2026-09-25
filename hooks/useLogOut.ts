import { useTransition } from 'react'

import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { useRouter } from '@/i18n/navigation'
import { authService } from '@/services/auth/auth.service'

import { useAuth } from './useAuth'

export const useLogOut = () => {
	const t = useTranslations('Auth')
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const { logOut } = useAuth()

	const { mutate: logoutMutate, isPending: mutateIsPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			startTransition(() => {
				router.refresh()
				toast.success(t('logoutSuccess'))
			})

			logOut()
		},
	})

	const isLoading = isPending || mutateIsPending

	return { logoutMutate, isLoading }
}
