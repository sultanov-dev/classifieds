import { useEffect, useMemo, useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { useRouter } from '@/i18n/navigation'
import { listingListPredicate } from '@/lib/querykeys/listing'
import { listingService } from '@/services/listing/listing.service'
import type { TImages } from '@/types/listing.types'

export const MAX_LISTING_IMAGES = 6

export const useEditImages = (listingId: string, existing: TImages[]) => {
	const t = useTranslations('ListingForm')
	const queryClient = useQueryClient()
	const router = useRouter()

	const [removedIds, setRemovedIds] = useState<string[]>([])
	const [newFiles, setNewFiles] = useState<File[]>([])

	const keptImages = useMemo(
		() => existing.filter((image) => !removedIds.includes(image.id)),
		[existing, removedIds],
	)

	const newPreviews = useMemo(
		() => newFiles.map((file) => ({ file, url: URL.createObjectURL(file) })),
		[newFiles],
	)

	useEffect(() => {
		return () => {
			newPreviews.forEach((preview) => URL.revokeObjectURL(preview.url))
		}
	}, [newPreviews])

	const totalCount = keptImages.length + newFiles.length
	const availableCount = MAX_LISTING_IMAGES - totalCount
	const hasChanges = removedIds.length > 0 || newFiles.length > 0

	const markRemoved = (id: string) =>
		setRemovedIds((prev) => (prev.includes(id) ? prev : [...prev, id]))

	const undoRemoved = (id: string) =>
		setRemovedIds((prev) => prev.filter((removedId) => removedId !== id))

	const addFiles = (fileList: FileList) => {
		if (availableCount <= 0) return

		setNewFiles((prev) => [
			...prev,
			...Array.from(fileList).slice(0, availableCount),
		])
	}

	const removeNewFile = (index: number) =>
		setNewFiles((prev) => prev.filter((_, i) => i !== index))

	const resetChanges = () => {
		setRemovedIds([])
		setNewFiles([])
	}

	const { mutate, isPending } = useMutation({
		mutationKey: ['update-listing-images', listingId],
		mutationFn: () => {
			const formData = new FormData()

			for (const file of newFiles) {
				formData.append('images', file)
			}

			if (removedIds.length > 0) {
				formData.append('removeImageIds', JSON.stringify(removedIds))
			}

			return listingService.updateListing(listingId, formData)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ predicate: listingListPredicate })
			toast.success(t('imagesSaved'))
			resetChanges()
			router.refresh()
		},
		onError: (error) => {
			if (isAxiosError(error)) {
				const message = error.response?.data?.message

				toast.error(
					Array.isArray(message)
						? message.join(', ')
						: (message ?? t('imagesSaveError')),
				)
			}
		},
	})

	const save = () => {
		if (totalCount === 0) {
			toast.error(t('imagesMinOne'))
			return
		}

		mutate()
	}

	return {
		keptImages,
		removedIds,
		newPreviews,
		totalCount,
		availableCount,
		hasChanges,
		isPending,
		markRemoved,
		undoRemoved,
		addFiles,
		removeNewFile,
		resetChanges,
		save,
	}
}
