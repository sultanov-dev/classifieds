import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { protectPages } from '@/config/pages.config'
import { useRouter } from '@/i18n/navigation'
import { buildListingUpdateFormData } from '@/lib/listing.mapper'
import { listingListPredicate } from '@/lib/querykeys/listing'
import { listingService } from '@/services/listing/listing.service'
import type { IListing } from '@/types/listing.types'
import type { TListingEditSchema } from '@/validation/create.validadtion'

import { useEditListingForm } from './useListingForm'

export const useUpdateListing = (
	listing: IListing,
	initialValues: TListingEditSchema,
) => {
	const t = useTranslations('ListingForm')
	const queryClient = useQueryClient()
	const router = useRouter()

	const { form, selectedCategory } = useEditListingForm(initialValues)

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-listing', listing.id],
		mutationFn: (formData: FormData) =>
			listingService.updateListing(listing.id, formData),
		onSuccess: () => {
			queryClient.invalidateQueries({ predicate: listingListPredicate })
			toast.success(t('updated'))
			router.push(protectPages.ADS)
			router.refresh()
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				const message = error.response?.data?.message

				toast.error(
					Array.isArray(message)
						? message.join(', ')
						: (message ?? t('saveError')),
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
			toast.info(t('nothingChanged'))
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
