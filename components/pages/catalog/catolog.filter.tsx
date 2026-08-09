'use client'

import RegionSelect from '@/shared/region.select'

import { RangeSlider } from './catalog.slider'
import { StatusSort } from './catalog.status'

export function CatalogFilter({ region }: { region: string }) {
	return (
		<div className="bg-background rounded-md p-3 shadow">
			<RegionSelect
				className="mb-5 w-full"
				value={region}
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
