import { Controller, useFormContext } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { MEMORYDATA, RAMDATA } from '@/data/region.data'
import type { TListingSchmema } from '@/validation/create.validadtion'

import { ColorPicker } from './color.picker.fields'
import { MemoryGroup } from './memory.group'

export function ElectronicFields() {
	const { control } = useFormContext<TListingSchmema>()

	return (
		<div className="mt-8 flex w-full flex-col gap-4">
			<Controller
				name="attributes.brand"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel id="create-listing-brand">Qurilma markasi</FieldLabel>
						<Input
							id="create-listing-brand"
							aria-invalid={fieldState.invalid}
							autoComplete="off"
							placeholder="Masalan: Apple, Sumsung..."
							value={field.value ?? ''}
							onChange={field.onChange}
						/>
					</Field>
				)}
			/>
			<Controller
				name="attributes.model"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel id="create-listing-model">Qurilma modeli</FieldLabel>
						<Input
							id="create-listing-model"
							aria-invalid={fieldState.invalid}
							autoComplete="off"
							placeholder="Masalan: iphone 14pro, 15promax..."
							{...field}
						/>
					</Field>
				)}
			/>
			<MemoryGroup
				memoryData={MEMORYDATA}
				ramData={RAMDATA}
				control={control}
			/>
			<Controller
				name="attributes.battery"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel id="create-listing-battery">
							Batareyka holati
						</FieldLabel>
						<Input
							type="number"
							id="create-listing-battery"
							aria-invalid={fieldState.invalid}
							placeholder="Batareyka foizi"
							value={field.value ?? ''}
							onChange={(e) =>
								field.onChange(
									e.target.value === '' ? undefined : Number(e.target.value),
								)
							}
						/>

						{fieldState.error && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
			<Controller
				name="attributes.status"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel id="create-listing-status">Qurilma holati</FieldLabel>
						<RadioGroup
							onValueChange={field.onChange}
							value={field.value ?? 'new'}
							className="flex w-fit items-center gap-3"
						>
							<div className="flex items-center gap-3">
								<RadioGroupItem value="new" id="create-listing-status-new" />
								<Label htmlFor="create-listing-status-new">Yangi</Label>
							</div>
							<div className="flex items-center gap-3">
								<RadioGroupItem value="used" id="create-listing-status-used" />
								<Label htmlFor="create-listing-status-used">Ishlatilgan</Label>
							</div>
						</RadioGroup>
					</Field>
				)}
			/>
			<ColorPicker control={control} />
		</div>
	)
}
