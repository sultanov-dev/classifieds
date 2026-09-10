import { useQuery } from '@tanstack/react-query'

import { userService } from '@/services/user/user.service'

const PROFILE_CACHE_TIME = 30 * 60 * 1000 // 30 min

export const useProfile = () => {
	const { isLoading, data } = useQuery({
		queryKey: ['get-profile'],
		queryFn: () => userService.getProfile(),
		select: (data) => data.data,
		retry: 1,
		refetchInterval: PROFILE_CACHE_TIME,
		staleTime: PROFILE_CACHE_TIME,
		gcTime: PROFILE_CACHE_TIME,
	})

	return { isLoading, data }
}
