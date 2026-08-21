import { create } from 'zustand'

import { ESORT, type TListingParams } from '@/types/listing.types'

interface IFilterStoreState {
	queryParams: TListingParams
	updateQueryParam: (data: { key: keyof TListingParams; value: string }) => void
	reset: () => void
	isFilterUpdated: boolean
}

const initileStoreState: Pick<IFilterStoreState, 'queryParams'> = {
	queryParams: {
		q: '',
		sort: ESORT.ALL,
		page: 1,
		limit: 10,
		currency: 'USD',
	},
}

export const useFilterStore = create<IFilterStoreState>((set) => ({
	...initileStoreState,
	isFilterUpdated: false,

	updateQueryParam: ({ key, value }) => {
		set((state) => ({
			queryParams: { ...state.queryParams, [key]: value },
			isFilterUpdated: true,
		}))
	},

	reset: () => set(() => ({ ...initileStoreState, isFilterUpdated: true })),
}))
