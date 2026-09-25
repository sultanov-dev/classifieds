import { useTranslations } from 'next-intl'
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
import type { TListingFormValues } from '@/validation/create.validadtion'

const CURRENT_YEAR = new Date().getFullYear()
const YEARS = Array.from({ length: CURRENT_YEAR - 1970 + 1 }, (_, i) =>
	(CURRENT_YEAR - i).toString(),
)

export function TransportFields() {
	const t = useTranslations('ListingForm')
	const { control } = useFormContext<TListingFormValues>()

	return (
		<div className="mt-8 flex w-full flex-col gap-4">
			<Controller
				name="attributes.marka"
				control={control}
				render={({ field, fieldState }) => (
					<Field data-invalid={fieldState.invalid}>
						<FieldLabel id="create-listing-marka">{t('marka')}</FieldLabel>
						<Input
							id="create-listing-marka"
							aria-invalid={fieldState.invalid}
							autoComplete="off"
							placeholder={t('markaPlaceholder')}
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
						<FieldLabel id="create-listing-marka">
							{t('transportModel')}
						</FieldLabel>
						<Input
							id="create-listing-model"
							aria-invalid={fieldState.invalid}
							autoComplete="off"
							placeholder={t('transportModelPlaceholder')}
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
						<FieldLabel id="create-listing-year">{t('year')}</FieldLabel>
						<Select
							value={field.value}
							onValueChange={(value) =>
								field.onChange(value === null ? undefined : Number(value))
							}
						>
							<SelectTrigger>
								<SelectValue placeholder={t('yearPlaceholder')} />
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
						<FieldLabel id="create-listing-mileage">{t('mileage')}</FieldLabel>
						<Input
							type="number"
							id="create-listing-mileage"
							aria-invalid={fieldState.invalid}
							autoComplete="off"
							placeholder={t('mileagePlaceholder')}
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
							{t('transmission')}
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
									{t('transmissionManual')}
								</Label>
							</div>
							<div className="flex items-center gap-3">
								<RadioGroupItem
									value="avtomat"
									id="create-listing-transmission-avtomat"
								/>
								<Label htmlFor="create-listing-transmission-avtomat">
									{t('transmissionAuto')}
								</Label>
							</div>
						</RadioGroup>
					</Field>
				)}
			/>
		</div>
	)
}
