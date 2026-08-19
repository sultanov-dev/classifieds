import { Controller, useFormContext } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import RegionSelect from '@/shared/region.select'

export function CommonFields() {
	const { control } = useFormContext()

	return (
		<>
			<Controller
				name="title"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid} className="gap-1.5">
						<FieldLabel
							className="text-xs font-medium"
							id="create-listing-title"
						>
							Elon sarlavhasi
						</FieldLabel>
						<Input
							id="create-listing-title"
							aria-invalid={fieldState.invalid}
							autoComplete="off"
							placeholder="Sarlavha"
							{...field}
						/>

						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
			<Controller
				name="currency"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel id="create-listing-currency">
							Valyuta turini tanlang
						</FieldLabel>
						<RadioGroup
							onValueChange={field.onChange}
							value={field.value ?? 'UZS'}
							className="flex w-fit items-center gap-3"
						>
							<div className="flex items-center gap-3">
								<RadioGroupItem value="UZS" id="create-listing-currency-UZS" />
								<Label htmlFor="create-listing-currency-UZS">UZS</Label>
							</div>
							<div className="flex items-center gap-3">
								<RadioGroupItem value="USD" id="create-listing-currency-USD" />
								<Label htmlFor="create-listing-currency-USD">USD</Label>
							</div>
						</RadioGroup>
					</Field>
				)}
			/>
			<Controller
				name="price"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid} className="gap-1.5">
						<FieldLabel
							className="text-xs font-medium"
							id="create-listing-price"
						>
							Narxi
						</FieldLabel>
						<Input
							type="number"
							id="create-listing-price"
							aria-invalid={fieldState.invalid}
							placeholder="Narxi"
							value={field.value === 0 ? '' : (field.value ?? '')}
							onChange={(e) => {
								const val = e.target.value
								field.onChange(val === '' ? 0 : Number(val))
							}}
						/>

						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
			<Controller
				name="region"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid} className="gap-1.5">
						<FieldLabel
							className="text-xs font-medium"
							id="create-listing-region"
						>
							Hududni tanlang
						</FieldLabel>
						<RegionSelect value={field.value} onValueChange={field.onChange} />

						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
			<Controller
				name="description"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid} className="gap-1.5">
						<FieldLabel
							className="text-xs font-medium"
							id="create-listing-description"
						>
							Elon haqida
						</FieldLabel>
						<Textarea
							className="resize-none"
							rows={6}
							id="create-listing-description"
							placeholder="E'lon haqida to'liq yozing..."
							{...field}
						/>

						{fieldState.invalid && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
		</>
	)
}
