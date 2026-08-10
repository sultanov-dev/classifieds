import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import { listingSchema, TListingSchmema } from '@/validation/create.validadtion'

export const useListingForm = () => {
	const form = useForm<TListingSchmema>({
		resolver: zodResolver(listingSchema),
		defaultValues: {
			category: 'transport',
			title: '',
			region: '',
			subCategory: '',
			description: '',
			price: undefined,
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
				memory: '',
				color: '',
				status: 'new',
				battery: 100,
			})
		}
	}

	return { selectedCategory, handleChangeCategory, form }
}
