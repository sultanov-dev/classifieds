import { useEffect, useState } from 'react'

import { Slider } from '@/components/ui/slider'
import { useDebounce } from '@/hooks/useDebounce'

interface IRangSlider {
	min?: number
	max: number
	fromInitialValue?: number
	toInitialValue?: number
	onChangeFromValue: (value: number) => void
	onChangeToValue: (value: number) => void
}

export function RangeSlider({
	min = 0,
	max,
	onChangeFromValue,
	onChangeToValue,
	fromInitialValue = 0,
	toInitialValue = max,
}: IRangSlider) {
	const [fromValue, setFromValue] = useState(fromInitialValue)
	const [toValue, setToValue] = useState(toInitialValue)

	const debouncedFromValue = useDebounce(fromValue, 500)
	const debouncedToValue = useDebounce(toValue, 500)

	// Обновляем значения с дебаунсом
	useEffect(() => {
		onChangeFromValue(debouncedFromValue)
	}, [debouncedFromValue, onChangeFromValue])

	useEffect(() => {
		onChangeToValue(debouncedToValue)
	}, [debouncedToValue, onChangeToValue])

	return (
		<div className="mt-5">
			<div className="mb-4 flex items-center justify-center gap-6">
				<span className="inline-bloc px-2 py-1 text-sm font-medium tracking-wide">
					dan: ${fromValue}
				</span>
				<span className="inline-block px-2 py-1 text-sm font-medium tracking-wide">
					gacha: ${toValue}
				</span>
			</div>

			<Slider
				step={5}
				min={min}
				max={max}
				defaultValue={[fromInitialValue, toInitialValue]}
				onValueChange={(value) => {
					if (typeof value === 'object') {
						setFromValue(value[0])
						setToValue(value[1])
					}
				}}
			/>
		</div>
	)
}
