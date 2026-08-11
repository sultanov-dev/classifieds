import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { MEMORYDATA, RAMDATA } from '@/data/region.data'
import { listingSchema, TListingSchmema } from '@/validation/create.validadtion'

export const useListingForm = () => {
	const form = useForm<TListingSchmema>({
		resolver: zodResolver(listingSchema),
		defaultValues: {
			category: 'transport',
			title: '',
			region: '',
			subCategory: 'cars',
			description: '',
			price: 0,
			attributes: {
				marka: '',
				model: '',
				year: 2020,
				mileage: 0,
				transmission: 'avtomat',
			},
		},
	})

	const selectedCategory = useWatch({
		control: form.control,
		name: 'category',
	})

	const selectedSubCategory = useWatch({
		control: form.control,
		name: 'subCategory',
	})

	const handleChangeCategory = (value: 'transport' | 'electronics') => {
		form.setValue('category', value, { shouldValidate: true })
		form.setValue('subCategory', '', { shouldValidate: true })

		if (value === 'transport') {
			form.setValue('attributes', {
				marka: '',
				model: '',
				year: 2020,
				mileage: 0,
				transmission: 'avtomat',
			})
		} else {
			form.setValue('attributes', {
				brand: '',
				model: '',
				memory: MEMORYDATA[0].value,
				ramMemory: RAMDATA[0].value,
				color: '',
				status: 'new',
				battery: 0,
			})
		}
	}

	const handleChangeSubCategory = (value: string) => {
		form.setValue('subCategory', value)
		form.clearErrors('subCategory')
	}

	return {
		selectedCategory,
		handleChangeCategory,
		form,
		selectedSubCategory,
		handleChangeSubCategory,
	}
}
