import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'

import {
	editListingSchema,
	listingSchema,
	type TListingEditSchema,
	type TListingSchmema,
} from '@/validation/create.validadtion'

import { CREATE_LISTING_DEFAULTS } from '../listing.defaults'

export const useListingForm = () => {
	const form = useForm<TListingSchmema>({
		mode: 'onChange',
		resolver: zodResolver(listingSchema),
		defaultValues: CREATE_LISTING_DEFAULTS,
	})

	const selectedCategory = useWatch({ control: form.control, name: 'category' })

	return { form, selectedCategory }
}

export const useEditListingForm = (initialValues: TListingEditSchema) => {
	const form = useForm<TListingEditSchema>({
		mode: 'onChange',
		resolver: zodResolver(editListingSchema),
		defaultValues: initialValues,
	})

	const selectedCategory = useWatch({ control: form.control, name: 'category' })

	return { form, selectedCategory }
}
