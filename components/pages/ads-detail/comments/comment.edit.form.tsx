import { useParams } from 'next/navigation'

import { SendHorizonalIcon, XCircleIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { useEditComment } from '@/hooks/useEditComment'
import { useReplyStore } from '@/store/useReplyStore'
import type { IComment } from '@/types/comments.type'

type Props = {
	commentUserName: string | null
	replyUserName: string | null | undefined
	commentId: string | null
	onClose: () => void
	comment: IComment
}

export function CommentEditForm({
	commentUserName = 'U',
	replyUserName = 'U',
	onClose,
	comment,
}: Props) {
	const t = useTranslations('Comments')
	const tCommon = useTranslations('Common')
	const { id } = useParams<{ id: string }>()
	const { handleSubmit, control, editIsPending, editHandle } = useEditComment(
		comment,
		id,
		onClose,
	)

	const closeReply = useReplyStore((state) => state.closeReply)

	return (
		<div className="flex flex-col gap-4 rounded-md p-2.5 shadow">
			<div className="flex items-center justify-between">
				<h5 className="text-xs font-semibold tracking-wide">
					{t.rich('replyingTo', {
						name: replyUserName ?? '',
						highlight: (chunks) => (
							<span className="text-violet-500">{chunks}</span>
						),
					})}
				</h5>
				<Button
					size={'icon-xs'}
					variant={'outline'}
					onClick={() => {
						closeReply()
						onClose()
					}}
					type="button"
				>
					<XCircleIcon className="size-4.5" />
				</Button>
			</div>
			<form id="reply-form" onSubmit={handleSubmit(editHandle)}>
				<FieldGroup>
					<Controller
						name="body"
						control={control}
						render={({ field, fieldState }) => (
							<Field id="reply-form-body" data-invalid={fieldState.invalid}>
								<FieldLabel
									id="reply-form-body"
									className="font-normal tracking-wide"
								>
									{t('label')}
								</FieldLabel>
								<Textarea
									className="h-18 resize-none bg-blue-100 focus-visible:ring-0 focus-visible:outline-none"
									aria-invalid={fieldState.invalid}
									onKeyDown={(e) => e.key === 'Escape' && onClose()}
									rows={1000}
									id="reply-form-body"
									placeholder={t('replyPlaceholder', {
										name: commentUserName ?? '',
									})}
									disabled={editIsPending}
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
				disabled={editIsPending}
			>
				{tCommon('save')}
				<SendHorizonalIcon />
			</Button>
		</div>
	)
}
