import { create } from 'zustand'

type TLikedStoreState = {
	overrides: Record<string, boolean>
	setLiked: (id: string, liked: boolean) => void
	revert: (id: string) => void
}

export const useLikedStore = create<TLikedStoreState>((set) => ({
	overrides: {},
	setLiked: (id, liked) => {
		set((state) => ({ overrides: { ...state.overrides, [id]: liked } }))
	},
	revert: (id) => {
		set((state) => {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { [id]: _, ...rest } = state.overrides
			return { overrides: rest }
		})
	},
}))
