import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

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
		currency: '',
		category: '',
		region: '',
	},
}

export const useFilterStore = create<IFilterStoreState>()(
	devtools((set) => ({
		...initileStoreState,
		isFilterUpdated: false,

		updateQueryParam: ({ key, value }) => {
			set((state) => ({
				queryParams: { ...state.queryParams, [key]: value },
				isFilterUpdated: true,
			}))
		},

		reset: () => set(() => ({ ...initileStoreState, isFilterUpdated: true })),
	})),
)
