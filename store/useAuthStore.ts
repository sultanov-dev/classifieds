import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

import { IUserData } from '@/types/auth.types'

interface IAuthState {
	user: IUserData | null
	isAuthenticated: boolean
	setCridentials: (user: IUserData) => void
	logOut: () => void
}

export const useAuthStore = create<IAuthState>()(
	persist(
		devtools((set) => ({
			user: null,
			isAuthenticated: false,

			setCridentials: (user) => {
				set({ user, isAuthenticated: true })
			},
			logOut: () => {
				set({ user: null, isAuthenticated: false })
			},
		})),
		{
			name: 'auth',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({
				user: state.user,
				isAuthenticated: state.isAuthenticated,
			}),
		},
	),
)
