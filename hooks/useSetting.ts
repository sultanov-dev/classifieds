import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { userService } from '@/services/user/user.service'
import type { IUserData } from '@/types/auth.types'
import {
	settingsSchema,
	type TSettingsSchema,
} from '@/validation/settings.validation'

export const useSettings = (initialData: IUserData | undefined) => {
	const form = useForm<TSettingsSchema>({
		resolver: zodResolver(settingsSchema),
		defaultValues: {
			fullName: initialData?.fullName || 'null',
			email: initialData?.email || '',
			phoneNumber: initialData?.phoneNumber || '',
			region: initialData?.region || 'Toshkent shahri',
			currentPassword: '',
			newPassword: '',
		},
	})

	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-settings'],
		mutationFn: (data: TSettingsSchema) => userService.updateProfile(data),
		onSuccess: () => {
			toast.success('Profil yangilandi')

			queryClient.invalidateQueries({ queryKey: ['get-profile'] })
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error.response?.data.message)
			}
		},
	})

	const handleSubmit = (data: TSettingsSchema) => {
		mutate(data)
	}

	return { form, isPending, handleSubmit }
}
