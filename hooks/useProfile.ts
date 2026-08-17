import { useQuery } from '@tanstack/react-query'

import { authService } from '@/services/auth/auth.service'

export const useProfile = () => {
	const { isLoading, data } = useQuery({
		queryKey: ['profile'],
		queryFn: () => authService.profile(),
	})

	return { isLoading, data }
}
