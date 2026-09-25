import { useMemo, useState } from 'react'

import { useTranslations } from 'next-intl'
import type { UseFormReturn } from 'react-hook-form'

import {
	createListingSchemas,
	type TListingSchmema,
} from '@/validation/create.validadtion'

export const useSteps = (
	form: UseFormReturn<TListingSchmema>,
	selectedCategory: string,
) => {
	const t = useTranslations('ListingForm')
	const tValidation = useTranslations('Validation')

	const STEPS = useMemo(
		() => [
			{ id: 1, title: t('stepBasic') },
			{ id: 2, title: t('stepAttributes') },
			{ id: 3, title: t('stepImages') },
		],
		[t],
	)

	const { baseSchema, transportSchema, electronicsSchema } = useMemo(
		() => createListingSchemas(tValidation),
		[tValidation],
	)

	const [step, setStep] = useState<number>(1)

	const nextStep = () => {
		const formValues = form.getValues()

		if (step === 1) {
			const reslut = baseSchema.safeParse(formValues)

			if (!reslut.success) {
				reslut.error.issues.forEach((is) => {
					form.setError(is.path[0] as keyof TListingSchmema, {
						type: 'manual',
						message: is.message,
					})
				})
				return
			}
		}

		if (step === 2) {
			const attrSchema =
				selectedCategory === 'transport'
					? transportSchema.shape.attributes
					: electronicsSchema.shape.attributes

			const result = attrSchema.safeParse(formValues.attributes)
			if (!result.success) {
				result.error.issues.forEach((issue) => {
					form.setError(
						`attributes.${String(issue.path[0])}` as keyof TListingSchmema,
						{
							type: 'manual',
							message: issue.message,
						},
					)
				})
				return
			}
		}

		if (step < STEPS.length) setStep((prev) => prev + 1)
	}

	const prevStep = () => {
		if (step > 1) setStep((prev) => prev - 1)
	}

	return { step, STEPS, nextStep, prevStep }
}
