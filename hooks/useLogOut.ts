import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { authService } from '@/services/auth/auth.service'

import { useAuth } from './useAuth'

export const useLogOut = () => {
	const router = useRouter()
	const [isPending, startTransition] = useTransition()

	const { logOut } = useAuth()

	const { mutate: logoutMutate, isPending: mutateIsPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			startTransition(() => {
				router.refresh()
				toast.success('Tizimdan chiqdingiz!')
			})

			logOut()
		},
	})

	const isLoading = isPending || mutateIsPending

	return { logoutMutate, isLoading }
}
