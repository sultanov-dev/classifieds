import { Controller, useFormContext } from 'react-hook-form'

import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import type { TListingSchmema } from '@/validation/create.validadtion'

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: CURRENT_YEAR - 1970 + 1 }, (_, i) =>
	(CURRENT_YEAR - i).toString(),
)

export function TransportFields() {
	const { control } = useFormContext<TListingSchmema>()

	return (
		<div className="mt-8 flex w-full flex-col gap-4">
			<Controller
				name="attributes.marka"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel id="create-listing-marka">Transport markasi</FieldLabel>
						<Input
							id="create-listing-marka"
							aria-invalid={fieldState.invalid}
							autoComplete="off"
							placeholder="Masalan: Chevrolet, BYD..."
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				name="attributes.model"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel id="create-listing-marka">Transport modeli</FieldLabel>
						<Input
							id="create-listing-model"
							aria-invalid={fieldState.invalid}
							autoComplete="off"
							placeholder="Masalan: Malibu, M4..."
							{...field}
						/>
					</Field>
				)}
			/>
			<Controller
				name="attributes.year"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel id="create-listing-year">
							Ishab chiqarilgan yili
						</FieldLabel>
						<Select
							value={field.value}
							onValueChange={(value) =>
								field.onChange(value === null ? undefined : Number(value))
							}
						>
							<SelectTrigger>
								<SelectValue placeholder="Yilni tanlang" />
							</SelectTrigger>
							<SelectContent className="max-h-60">
								{YEARS.map((year) => (
									<SelectItem key={year} value={year}>
										{year}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{fieldState.error && <FieldError errors={[fieldState.error]} />}
					</Field>
				)}
			/>
			<Controller
				name="attributes.mileage"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel id="create-listing-mileage">Probeg</FieldLabel>
						<Input
							type="number"
							id="create-listing-mileage"
							aria-invalid={fieldState.invalid}
							autoComplete="off"
							placeholder="Probeg raqamlarda yozing"
							value={field.value}
							onChange={(e) => {
								const value = e.target.value
								field.onChange(value === '' ? undefined : Number(value))
							}}
						/>
					</Field>
				)}
			/>
			<Controller
				name="attributes.transmission"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel id="create-listing-transmission">
							Karobka turi
						</FieldLabel>
						<RadioGroup
							onValueChange={field.onChange}
							value={field.value}
							defaultValue={field.value}
							className="flex w-fit items-center gap-3"
						>
							<div className="flex items-center gap-3">
								<RadioGroupItem
									value="mexanik"
									id="create-listing-transmission-mexanik"
								/>
								<Label htmlFor="create-listing-transmission-mexanik">
									Mexanik
								</Label>
							</div>
							<div className="flex items-center gap-3">
								<RadioGroupItem
									value="avtomat"
									id="create-listing-transmission-avtomat"
								/>
								<Label htmlFor="create-listing-transmission-avtomat">
									Avtomat
								</Label>
							</div>
						</RadioGroup>
					</Field>
				)}
			/>
		</div>
	)
}
