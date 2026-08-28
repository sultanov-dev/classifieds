import { useEffect, useRef, useState } from 'react'

import { Slider } from '@/components/ui/slider'
import { useDebounce } from '@/hooks/useDebounce'

interface IRangSlider {
	min?: number
	max: number
	fromInitialValue?: number
	toInitialValue?: number
	onChangeRange: (from: number, to: number) => void
}

export function RangeSlider({
	min = 0,
	max,
	onChangeRange,
	fromInitialValue = 0,
	toInitialValue = max,
}: IRangSlider) {
	const [range, setRange] = useState<[number, number]>([
		fromInitialValue,
		toInitialValue,
	])
	const isFirstRender = useRef(true)

	const debouncedRange = useDebounce(range, 500)

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false
			return
		}

		onChangeRange(debouncedRange[0], debouncedRange[1])
	}, [debouncedRange, onChangeRange])

	return (
		<div className="mt-5">
			<div className="mb-4 flex items-center justify-center gap-6">
				<span className="inline-bloc px-2 py-1 text-sm font-medium tracking-wide">
					dan: ${range[0]}
				</span>
				<span className="inline-block px-2 py-1 text-sm font-medium tracking-wide">
					gacha: ${range[1]}
				</span>
			</div>

			<Slider
				step={5}
				min={min}
				max={max}
				defaultValue={[fromInitialValue, toInitialValue]}
				onValueChange={(value) => setRange(value as [number, number])}
			/>
		</div>
	)
}
