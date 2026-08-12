import { useFormContext, useWatch } from 'react-hook-form'

import type { TListingSchmema } from '@/validation/create.validadtion'

export const useColorPicker = () => {
	const { control, setValue, clearErrors } = useFormContext<TListingSchmema>()

	const selectedColor = useWatch({
		control,
		name: 'attributes.color',
	})

	const handleSelectColor = (color: string) => {
		setValue('attributes.color', color, {
			shouldValidate: true,
			shouldDirty: true,
		})

		clearErrors('attributes.color')
	}

	return { selectedColor, handleSelectColor }
}
