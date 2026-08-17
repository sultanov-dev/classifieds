import { useQuery } from '@tanstack/react-query'

import { authService } from '@/services/auth/auth.service'

export const useProfile = () => {
	const { isLoading, data } = useQuery({
		queryKey: ['profile'],
		queryFn: () => authService.profile(),
		retry: 1,
		refetchInterval: 1800000, // 30 minutes
	})

	return { isLoading, data }
}
