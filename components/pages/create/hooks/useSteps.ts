import { useState } from 'react'

import type { UseFormReturn } from 'react-hook-form'

import {
	baseSchema,
	electronicsSchema,
	transportSchema,
	type TListingSchmema,
} from '@/validation/create.validadtion'

const STEPS = [
	{ id: 1, title: 'Asosiy' },
	{ id: 2, title: 'Xususiyatlar' },
	{ id: 3, title: 'Tavsif' },
]

export const useSteps = (
	form: UseFormReturn<TListingSchmema>,
	selectedCategory: string,
) => {
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
				selectedCategory === 'transport' ? transportSchema : electronicsSchema
			const result = attrSchema.safeParse(formValues.attributes)

			if (!result.success) {
				result.error.issues.forEach((is) => {
					form.setError(
						`attributes.${String(is.path[0])}` as keyof TListingSchmema,
						{
							type: 'manual',
							message: is.message,
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
