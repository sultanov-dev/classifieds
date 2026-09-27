import { beforeEach, describe, expect, it } from 'vitest'

import { useFilterStore } from '@/store/useFilterStore'
import { ESORT } from '@/types/listing.types'

// Store modul yuklanganda yaratiladi: boshlang'ich holatni har testdan oldin tiklaymiz
const INITIAL_QUERY_PARAMS = {
	q: '',
	sort: ESORT.ALL,
	page: 1,
	limit: 10,
	currency: '',
	category: '',
	region: '',
}

const state = () => useFilterStore.getState()

beforeEach(() => {
	useFilterStore.setState({
		queryParams: { ...INITIAL_QUERY_PARAMS },
		isFilterUpdated: false,
	})
})

describe('useFilterStore', () => {
	it("boshlang'ich holatda filter yangilanmagan", () => {
		expect(state().isFilterUpdated).toBe(false)
	})

	it("updateQueryParam faqat berilgan kalitni o'zgartiradi va isFilterUpdated ni true qiladi", () => {
		state().updateQueryParam({ key: 'region', value: 'SAMARQAND' })

		expect(state().queryParams).toEqual({
			...INITIAL_QUERY_PARAMS,
			region: 'SAMARQAND',
		})
		expect(state().isFilterUpdated).toBe(true)
	})

	it("ketma-ket yangilanishlar bir-birini o'chirmaydi", () => {
		state().updateQueryParam({ key: 'region', value: 'SAMARQAND' })
		state().updateQueryParam({ key: 'category', value: 'transport' })

		expect(state().queryParams).toMatchObject({
			region: 'SAMARQAND',
			category: 'transport',
		})
	})

	it('qiymat string sifatida saqlanadi (page ham)', () => {
		state().updateQueryParam({ key: 'page', value: '3' })

		expect(state().queryParams.page).toBe('3')
	})

	it("reset queryParams ni boshlang'ich holatga qaytaradi", () => {
		state().updateQueryParam({ key: 'region', value: 'SAMARQAND' })
		state().updateQueryParam({ key: 'q', value: 'iphone' })

		state().reset()

		expect(state().queryParams).toEqual(INITIAL_QUERY_PARAMS)
	})

	it("reset'dan keyin isFilterUpdated true bo'lib qoladi", () => {
		state().reset()

		expect(state().isFilterUpdated).toBe(true)
	})
})
