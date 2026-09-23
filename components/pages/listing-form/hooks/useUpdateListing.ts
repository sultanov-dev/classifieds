import { useRouter } from 'next/navigation'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { toast } from 'sonner'

import { protectPages } from '@/config/pages.config'
import { buildListingUpdateFormData } from '@/lib/listing.mapper'
import { listingService } from '@/services/listing/listing.service'
import type { IListing } from '@/types/listing.types'
import type { TListingEditSchema } from '@/validation/create.validadtion'

import { useEditListingForm } from './useListingForm'

export const useUpdateListing = (
	listing: IListing,
	initialValues: TListingEditSchema,
) => {
	const queryClient = useQueryClient()
	const router = useRouter()

	const { form, selectedCategory } = useEditListingForm(initialValues)

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-listing', listing.id],
		mutationFn: (formData: FormData) =>
			listingService.updateListing(listing.id, formData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['my-listings'] })
			toast.success("E'lon yangilandi")
			router.push(protectPages.ADS)
			router.refresh()
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				const message = error.response?.data?.message

				toast.error(
					Array.isArray(message)
						? message.join(', ')
						: (message ?? 'Saqlashda xatolik yuz berdi'),
				)
			}
		},
	})

	const onSubmit = (values: TListingEditSchema) => {
		const formData = buildListingUpdateFormData(
			values,
			form.formState.dirtyFields,
		)

		if ([...formData.keys()].length === 0) {
			toast.info("Hech narsa o'zgarmadi")
			return
		}

		mutate(formData)
	}

	return {
		form,
		onSubmit,
		selectedCategory,
		isLoading: isPending,
		isDirty: form.formState.isDirty,
	}
}
