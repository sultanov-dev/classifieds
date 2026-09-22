import { useFormContext, useWatch } from 'react-hook-form'

import type { TListingFormValues } from '@/validation/create.validadtion'

import {
	ELECTRONICS_ATTRIBUTES,
	TRANSPORT_ATTRIBUTES,
} from '../listing.defaults'

type TCategory = 'transport' | 'electronics'

export const useCategorySelect = () => {
	const { control, setValue, clearErrors, formState } =
		useFormContext<TListingFormValues>()

	const selectedCategory = useWatch({ control, name: 'category' })
	const selectedSubCategory = useWatch({ control, name: 'subCategory' })

	const handleChangeCategory = (value: TCategory) => {
		if (selectedCategory === value) return

		setValue('category', value, { shouldValidate: true, shouldDirty: true })
		setValue('subCategory', '', { shouldDirty: true })

		setValue(
			'attributes',
			value === 'transport' ? TRANSPORT_ATTRIBUTES : ELECTRONICS_ATTRIBUTES,
			{ shouldDirty: true },
		)

		clearErrors(['subCategory', 'attributes'])
	}

	const handleChangeSubCategory = (value: string) => {
		setValue('subCategory', value, { shouldDirty: true })
		clearErrors('subCategory')
	}

	return {
		selectedCategory,
		selectedSubCategory,
		handleChangeCategory,
		handleChangeSubCategory,
		categoryError: formState.errors.category,
		subCategoryError: formState.errors.subCategory,
	}
}
