import { CornerDownLeftIcon, PencilIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useReplyStore } from '@/store/useReplyStore'

type Props = {
	commentUserId: string
	curruntUserId: string | undefined
	commentId: string
}

export function CommentsHeader({
	commentUserId,
	curruntUserId,
	commentId,
}: Props) {
	const { showReply } = useReplyStore()

	return (
		<div className="ml-auto flex gap-2">
			<Button
				className="w-fit cursor-pointer justify-end font-semibold text-emerald-600 transition-colors hover:bg-emerald-600 hover:text-white"
				size={'xs'}
				variant={'secondary'}
				onClick={() => showReply(commentId)}
			>
				<CornerDownLeftIcon />
				Javob yozish
			</Button>
			{commentUserId === curruntUserId && (
				<Button className="cursor-pointer" variant={'outline'} size={'icon-xs'}>
					<PencilIcon />
				</Button>
			)}
			{commentUserId === curruntUserId && (
				<Button
					className="cursor-pointer"
					variant={'destructive'}
					size={'icon-xs'}
				>
					<Trash2Icon />
				</Button>
			)}
		</div>
	)
}
