import { CheckIcon } from 'lucide-react'
import { Controller, type Control } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { COLORS } from '@/data/region.data'
import { cn } from '@/lib/utils'
import type { TListingSchmema } from '@/validation/create.validadtion'

import { useColorPicker } from './hooks/useColorPicker'

export function ColorPicker({
	control,
}: {
	control: Control<TListingSchmema>
}) {
	const { selectedColor, handleSelectColor } = useColorPicker()

	const activeColorObj = COLORS.find((c) => c.id === selectedColor)

	return (
		<Controller
			name="attributes.color"
			control={control}
			render={({ field, fieldState }) => (
				<Field className="space-y-3" data-invalid={fieldState.invalid}>
					<div className="flex items-center justify-between">
						<FieldLabel id="create-listing-color">Qurilma rangi</FieldLabel>
						{activeColorObj && (
							<span className="text-muted-foreground text-sm font-medium">
								Tanlandi:
								<strong className="text-foreground">
									{activeColorObj.name}
								</strong>
							</span>
						)}
					</div>
					<div className="flex flex-wrap gap-3">
						{COLORS.map((color) => {
							const isSelected = selectedColor === color.id

							return (
								<Button
									id="create-listing-color"
									key={color.id}
									type="button"
									title={color.name}
									onClick={() => {
										field.onChange(color.id)
										handleSelectColor(color.id)
									}}
									className={cn(
										'group relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95',
										color.border
											? 'border border-gray-300 dark:border-gray-700'
											: '',

										isSelected
											? 'ring-primary ring-offset-background scale-105 ring-2 ring-offset-1'
											: 'opacity-80 hover:opacity-100',
									)}
									style={{
										backgroundColor: color.hex,
									}}
								>
									{isSelected && (
										<CheckIcon
											className={cn(
												'h-5 w-5',
												color.id === 'white' ||
													color.id === 'gold' ||
													color.id === 'silver'
													? 'text-black'
													: 'text-white',
											)}
										/>
									)}
								</Button>
							)
						})}
					</div>
				</Field>
			)}
		/>
	)
}
