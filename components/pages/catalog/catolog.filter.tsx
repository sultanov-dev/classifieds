'use client'

import { useFilter } from '@/hooks/useFilter'
import RegionSelect from '@/shared/region.select'

import { RangeSlider } from './catalog.slider'
import { StatusSort } from './catalog.status'

export function CatalogFilter() {
	const { queryParams } = useFilter()

	return (
		<div className="bg-background rounded-md p-3 shadow">
			<RegionSelect
				className="mb-5 w-full"
				value={queryParams.region || 'Toskent shahri'}
				onValueChange={(value) => console.log(value)}
			/>
			<RangeSlider
				max={2000}
				fromInitialValue={100}
				toInitialValue={500}
				onChangeFromValue={(value) => console.log(value)}
				onChangeToValue={(value) => console.log(value)}
			/>
			<StatusSort />
		</div>
	)
}
