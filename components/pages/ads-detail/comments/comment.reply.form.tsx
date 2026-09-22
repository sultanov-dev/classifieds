import { useParams } from 'next/navigation'

import { SendHorizonalIcon, XCircleIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { useComments } from '@/hooks/useComments'
import { useReplyStore } from '@/store/useReplyStore'

type Props = {
	commentUserName: string | null
	replyUserName: string | null | undefined
	commentId: string | null
}

export function CommentReplyForm({
	commentUserName = 'U',
	replyUserName = 'U',
	commentId,
}: Props) {
	const { id } = useParams<{ id: string }>()
	const {
		commentControl,
		commentHandleSubmit,
		commentOnSubmit,
		commentIsPending,
	} = useComments(id, commentId)

	const closeReply = useReplyStore((state) => state.closeReply)

	return (
		<div className="flex flex-col gap-4 rounded-md p-2.5 shadow">
			<div className="flex items-center justify-between">
				<h5 className="text-xs font-semibold tracking-wide">
					<span className="text-violet-500">{replyUserName}</span> tomonidan
					javob yozilmoqda
				</h5>
				<Button
					size={'icon-xs'}
					variant={'outline'}
					onClick={closeReply}
					type="button"
				>
					<XCircleIcon className="size-4.5" />
				</Button>
			</div>
			<form id="reply-form" onSubmit={commentHandleSubmit(commentOnSubmit)}>
				<FieldGroup>
					<Controller
						name="body"
						control={commentControl}
						render={({ field, fieldState }) => (
							<Field id="reply-form-body" data-invalid={fieldState.invalid}>
								<FieldLabel
									id="reply-form-body"
									className="font-normal tracking-wide"
								>
									Fikr va mulohaza
								</FieldLabel>
								<Textarea
									className="h-18 resize-none bg-blue-100 focus-visible:ring-0 focus-visible:outline-none"
									aria-invalid={fieldState.invalid}
									rows={1000}
									id="reply-form-body"
									placeholder={`${commentUserName}ga javob yozing...`}
									disabled={commentIsPending}
									{...field}
								/>
							</Field>
						)}
					/>
				</FieldGroup>
			</form>

			<Button
				className="my-1.5 w-fit cursor-pointer bg-[#1D828E] font-medium tracking-wide transition-colors hover:bg-[#229ba8]"
				size={'lg'}
				form="reply-form"
				type="submit"
				disabled={commentIsPending}
			>
				Yuborish
				<SendHorizonalIcon />
			</Button>
		</div>
	)
}
