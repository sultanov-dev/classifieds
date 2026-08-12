import { Controller, type Control } from 'react-hook-form'

import { Field, FieldLabel } from '@/components/ui/field'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import type { TMemory } from '@/data/region.data'
import { cn } from '@/lib/utils'
import type { TListingSchmema } from '@/validation/create.validadtion'

export function MemoryGroup({
	memoryData,
	control,
	ramData,
}: {
	memoryData: TMemory[]
	ramData: TMemory[]
	control: Control<TListingSchmema>
}) {
	return (
		<>
			<Controller
				name="attributes.memory"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid} className="gap-2.5">
						<FieldLabel id="create-listing-memory">Asosiy xotirasi</FieldLabel>
						<RadioGroup
							onValueChange={field.onChange}
							value={field.value ?? '128bg'}
							className="flex flex-wrap gap-4"
						>
							{memoryData.map((item) => (
								<div key={item.value}>
									<RadioGroupItem
										className="sr-only hidden"
										value={item.value}
										id={`create-listing-memory-${item.value}`}
									/>
									<Label
										htmlFor={`create-listing-memory-${item.value}`}
										className={cn(
											'border-input bg-background flex cursor-pointer items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-all',
											field.value === item.value &&
												'border-primary bg-primary text-primary-foreground',
										)}
									>
										{item.label}
									</Label>
								</div>
							))}
						</RadioGroup>
					</Field>
				)}
			/>
			<Controller
				name="attributes.ramMemory"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid} className="gap-2.5">
						<FieldLabel id="create-listing-ramMemory">RAM xotirasi</FieldLabel>
						<RadioGroup
							onValueChange={field.onChange}
							value={field.value ?? '64gb'}
							className="flex flex-wrap gap-4"
						>
							{ramData.map((item) => (
								<div key={item.value}>
									<RadioGroupItem
										className="sr-only hidden"
										value={item.value}
										id={`create-listing-ramMemory-${item.value}`}
									/>
									<Label
										htmlFor={`create-listing-ramMemory-${item.value}`}
										className={cn(
											'border-input bg-background flex cursor-pointer items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-all',
											field.value === item.value &&
												'border-primary bg-primary text-primary-foreground',
										)}
									>
										{item.label}
									</Label>
								</div>
							))}
						</RadioGroup>
					</Field>
				)}
			/>
		</>
	)
}
