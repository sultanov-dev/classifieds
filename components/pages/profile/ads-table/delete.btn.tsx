'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { deleteListing } from '@/actions/action'
import { listingListPredicate } from '@/lib/querykeys/listing'

export function DeleteBtn({ id }: { id: string }) {
	const t = useTranslations('Profile')
	const tForm = useTranslations('ListingForm')
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['delete-listing', id],
		mutationFn: () => deleteListing(id),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ predicate: listingListPredicate })

			if (data.success) {
				toast.success(tForm(data.messageKey))
			} else {
				toast.error(tForm(data.messageKey))
			}
		},
	})

	return (
		<Button
			type="button"
			disabled={isPending}
			onClick={() => mutate()}
			className="cursor-pointer rounded-md bg-transparent p-2 text-red-600 hover:bg-red-50"
			aria-label={t('adsDelete')}
			size={'icon-sm'}
		>
			<Trash2 size={18} />
		</Button>
	)
}
