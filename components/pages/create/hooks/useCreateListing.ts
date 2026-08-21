import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { listingService } from '@/services/listing.service'
import type { TListingSchmema } from '@/validation/create.validadtion'

import { useListingForm } from './useListingForm'
import { useSteps } from './useSteps'

export const useCreateListing = () => {
	const queryClient = useQueryClient()

	const { form, selectedCategory } = useListingForm()
	const {
		step: currentStep,
		STEPS,
		prevStep,
		nextStep,
	} = useSteps(form, selectedCategory)

	const [isPending, startTransition] = useTransition()
	const router = useRouter()

	const { mutate: createListing, isPending: createLoading } = useMutation({
		mutationKey: ['create-listings'],
		mutationFn: (data: FormData) => listingService.createListing(data),
		onSuccess: () => {
			startTransition(() => {
				router.replace('/')
				toast.success("E'lon joylandi")
			})
			queryClient.invalidateQueries({ queryKey: ['listings'] })
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				toast.error(error.response?.data.message)
			}
		},
	})

	const onSubmit = (data: TListingSchmema) => {
		const formData = new FormData()

		formData.append('title', data.title)
		formData.append('description', data.description)
		formData.append('price', String(data.price))
		formData.append('region', data.region)
		formData.append('category', data.category)
		formData.append('subCategory', data.subCategory)
		formData.append('currency', data.currency)
		formData.append('attributes', JSON.stringify(data.attributes))

		for (const file of data.images) {
			formData.append('images', file)
		}

		createListing(formData)
	}

	const isLoading = isPending || createLoading

	return {
		isLoading,
		onSubmit,
		currentStep,
		STEPS,
		prevStep,
		nextStep,
		form,
		selectedCategory,
	}
}
