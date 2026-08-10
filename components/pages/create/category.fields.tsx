'use client'

import { Controller, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Field } from '@/components/ui/field'
import { CATEGORIES } from '@/data/category.data'
import type { TListingSchmema } from '@/validation/create.validadtion'

import { useListingForm } from './hooks/useListingForm'

export function CategoryFields() {
	const { handleChangeCategory } = useListingForm()
	const { getValues, control } = useFormContext<TListingSchmema>()

	const category = getValues('category')
	const subCategory = getValues('subCategory')

	return (
		<div className="animate-in fade-in zoom-in space-y-6 duration-300">
			<h2 className="text-xl font-medium">1. Kategoriyani tanlang</h2>

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
								variant={category === 'transport' ? 'default' : 'outline'}
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
								variant={category === 'electronics' ? 'default' : 'outline'}
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

				{category && (
					<div className="mt-6 space-y-3 border-t pt-6">
						<h3 className="text-md font-medium">Kichik bolimni tanlang:</h3>
						<div className="flex flex-wrap gap-2">
							{CATEGORIES[category].subCategory.map((sub) => (
								<Button
									key={sub.id}
									variant={subCategory === sub.id ? 'default' : 'secondary'}
									onClick={() => {}}
								>
									{sub.label}
								</Button>
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
