'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { deleteListing } from '@/actions/action'

export function DeleteBtn({ id }: { id: string }) {
	const queryClient = useQueryClient()

	const { mutate, isPending } = useMutation({
		mutationKey: ['delete-listing', id],
		mutationFn: () => deleteListing(id),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['my-listings'] })
			toast.success(data.message)
		},
	})

	return (
		<Button
			type="button"
			disabled={isPending}
			onClick={() => mutate()}
			className="cursor-pointer rounded-md bg-transparent p-2 text-red-600 hover:bg-red-50"
			aria-label="E'lonni o'chirish"
			size={'icon-sm'}
		>
			<Trash2 size={18} />
		</Button>
	)
}
