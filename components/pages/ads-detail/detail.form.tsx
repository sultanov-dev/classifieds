import { Controller } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'
import { useComments } from '@/hooks/useComments'

export function DetailForm({ listingId }: { listingId: string }) {
	const {
		commentControl,
		commentHandleSubmit,
		commentOnSubmit,
		commentIsPending,
	} = useComments(listingId, null)

	return (
		<>
			<form id="comment-form" onSubmit={commentHandleSubmit(commentOnSubmit)}>
				<FieldGroup className="w-full">
					<Controller
						name="body"
						control={commentControl}
						render={({ field, fieldState }) => (
							<Field data-invalid={fieldState.invalid} id="comment-form-body">
								<FieldLabel
									id="comment-form-body"
									className="font-normal tracking-wide"
								>
									Fikr va mulohaza
								</FieldLabel>
								<Textarea
									className="h-18 resize-none bg-blue-100 focus-visible:ring-0 focus-visible:outline-none"
									aria-invalid={fieldState.invalid}
									rows={1000}
									id="comment-form-body"
									placeholder="E'lon haqida o'z izohlaringizni yozing..."
									disabled={commentIsPending}
									{...field}
								/>
							</Field>
						)}
					/>
				</FieldGroup>
			</form>
			<Button
				className="mt-5 cursor-pointer bg-[#1D828E] font-medium tracking-wide transition-colors hover:bg-[#229ba8]"
				size={'lg'}
				form="comment-form"
				type="submit"
				disabled={commentIsPending}
			>
				Izoh qoldirish
			</Button>
		</>
	)
}
