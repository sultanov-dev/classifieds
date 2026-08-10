'use client'

import { FormProvider } from 'react-hook-form'

import { FieldGroup } from '@/components/ui/field'
import { TListingSchmema } from '@/validation/create.validadtion'

import { CategoryFields } from './category.fields'
import { useListingForm } from './hooks/useListingForm'

export function CreateContent() {
	const { form, selectedCategory } = useListingForm()

	const onSubmit = (data: TListingSchmema) => {
		console.log(JSON.stringify(data, null, 2))
	}

	console.log(selectedCategory)

	return (
		<div className="bg-card mx-auto max-w-2xl rounded-xl p-6 shadow-sm">
			<FormProvider {...form}>
				<form id="create-listing" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup>
						<CategoryFields />
					</FieldGroup>
				</form>
			</FormProvider>
		</div>
	)
}
