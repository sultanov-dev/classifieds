'use client'

import { Button } from '@/components/ui/button'
import { useFilter } from '@/hooks/useFilter'
import RegionSelect from '@/shared/region.select'

import { StatusSort } from './catalog.status'

export function CatalogFilter() {
	const { queryParams, updateQueryParams, resetQueryParams } = useFilter()

	const fromValue = queryParams.minPrice || 0
	const toValue = queryParams.maxPrice || 1000

	return (
		<div className="bg-background sticky top-6 rounded-md p-3 shadow">
			<RegionSelect
				className="mb-5 w-full"
				value={queryParams.region || 'Toskent shahri'}
				onValueChange={(value) => updateQueryParams('region', String(value))}
			/>
			{/* <RangeSlider
				max={200000000}
				fromInitialValue={Number(fromValue)}
				toInitialValue={Number(toValue)}
				onChangeRange={(from, to) => {
					updateQueryParams('minPrice', String(from))
					updateQueryParams('maxPrice', String(to))
				}}
			/> */}
			<StatusSort />
			<Button
				className="mt-5 w-full cursor-pointer"
				variant={'outline'}
				onClick={resetQueryParams}
			>
				Reset
			</Button>
		</div>
	)
}
