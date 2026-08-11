'use client'

import { Controller, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { CATEGORIES } from '@/data/category.data'
import type { TListingSchmema } from '@/validation/create.validadtion'

import { useListingForm } from './hooks/useListingForm'

export function CategoryFields() {
	const {
		handleChangeCategory,
		selectedCategory,
		selectedSubCategory,
		handleChangeSubCategory,
	} = useListingForm()
	const { control } = useFormContext<TListingSchmema>()

	return (
		<>
			<div className="mt-6 grid grid-cols-2 gap-4">
				<Controller
					name="category"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<Button
								type="button"
								id="create-listing-category"
								aria-invalid={fieldState.invalid}
								variant={
									selectedCategory === 'transport' ? 'default' : 'outline'
								}
								className="h-24 text-lg"
								onClick={() => {
									field.onChange('transport')
									handleChangeCategory('transport')
								}}

								{...field}
							>
								🚗 Transport
							</Button>
						</Field>
					)}
				/>
				<Controller
					name="category"
					control={control}
					render={({ field, fieldState }) => (
						<Field data-invalid={fieldState.invalid}>
							<Button
								type="button"
								id="create-listing-category"
								aria-invalid={fieldState.invalid}
								variant={
									selectedCategory === 'electronics' ? 'default' : 'outline'
								}
								className="h-24 text-lg"
								onClick={() => {
									field.onChange('electronics')
									handleChangeCategory('electronics')
								}}
								{...field}
							>
								📱 Elektronika
							</Button>
						</Field>
					)}
				/>

				{selectedCategory && (
					<div className="mt-6 space-y-3">
						<h3 className="text-md font-medium">Kichik bolimni tanlang:</h3>
						<div className="flex gap-4">
							{CATEGORIES[selectedCategory].subCategory.map((sub) => (
								<Controller
									control={control}
									name="subCategory"
									key={sub.id}
									render={({ field, fieldState }) => (
										<Field data-invalid={fieldState.invalid}>
											<Button
												type="button"
												id="create-listing-subCategory"
												aria-invalid={fieldState.invalid}
												variant={
													selectedSubCategory === sub.id
														? 'default'
														: 'secondary'
												}
												onClick={() => {
													field.onChange(sub.id)
													handleChangeSubCategory(sub.id)
												}}
												{...field}
											>
												{sub.label}
											</Button>
										</Field>
									)}
								/>
							))}
						</div>
					</div>
				)}
			</div>
		</>
	)
}
