import { Controller, type Control } from 'react-hook-form'

import { Field, FieldLabel } from '@/components/ui/field'
import type { TListingSchmema } from '@/validation/create.validadtion'

import { ImageContent } from './image.content'

export function ImageUpload({
	control,
	isLoading,
}: {
	control: Control<TListingSchmema>
	isLoading: boolean
}) {
	return (
		<Controller<TListingSchmema, 'images'>
			name="images"
			control={control}
			render={({ fieldState, field }) => (
				<Field className="mt-8" data-invalid={fieldState.invalid}>
					<div className="flex items-center justify-between">
						<FieldLabel
							className="text-base font-semibold"
							id="create-listing-images"
						>
							Elon rasmlari
						</FieldLabel>
						<span className="text-muted-foreground text-xs">
							Birinchi rasm asosiy boladi
						</span>
					</div>

					<ImageContent
						isLoading={isLoading}
						value={field.value}
						onChange={field.onChange}
					/>
				</Field>
			)}
		/>
	)
}
